import importlib.util
import json
import tempfile
import unittest
from pathlib import Path

SRC = Path(__file__).resolve().parents[1] / "scripts" / "build_updates.py"
spec = importlib.util.spec_from_file_location("build_updates", SRC)
mod = importlib.util.module_from_spec(spec)
spec.loader.exec_module(mod)

def record(ident, salario="R$ 100", prazo="2026-11-30"):
    return {
        "id": ident,
        "orgao": "Prefeitura teste",
        "cargo": "Médico",
        "cidade": "Curitiba",
        "uf": "PR",
        "imediatas": 1,
        "url": "https://example.org/edital",
        "salario_texto": salario,
        "inscricoes_ate": prazo,
    }

class ChangeTests(unittest.TestCase):
    def test_novo_retificado_retirado(self):
        before = {"atualizado_em": "2026-11-16", "vagas": [record("a"), record("b")]}
        after = {"atualizado_em": "2026-11-17",
                 "vagas": [record("a", salario="R$ 200"), record("c")]}
        result = mod.diff(before, after)
        self.assertEqual(result["novos"], ["c"])
        self.assertEqual(result["retificados"], ["a"])
        self.assertEqual(result["retirados"], ["b"])

    def test_rejeita_duplicatas(self):
        with tempfile.TemporaryDirectory() as folder:
            file = Path(folder) / "dados.json"
            file.write_text(json.dumps({"vagas":[record("a"),record("a")]}),encoding="utf-8")
            with self.assertRaisesRegex(ValueError, "duplicado"):
                mod.load(file)

    def test_rejeita_link_nao_seguro(self):
        with tempfile.TemporaryDirectory() as folder:
            file = Path(folder) / "dados.json"
            bad=record("a");bad["url"]="http://example.org"
            file.write_text(json.dumps({"vagas":[bad]}),encoding="utf-8")
            with self.assertRaisesRegex(ValueError, "https"):
                mod.load(file)

if __name__ == "__main__":
    unittest.main()
