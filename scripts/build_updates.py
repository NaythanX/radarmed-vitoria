#!/usr/bin/env python3
"""Compare two RadarMed data snapshots to build novidades.json.
No scraping: only verified records that were already published in dados.json.
"""
import argparse
import datetime as dt
import json
from pathlib import Path

FIELDS = ("orgao", "cargo", "cidade", "uf", "tipo_vinculo", "imediatas",
          "cadastro_reserva", "salario_texto", "inscricoes_ate", "prova", "requisitos", "url")

def load(path):
    obj = json.loads(Path(path).read_text(encoding="utf-8"))
    if not isinstance(obj, dict) or not isinstance(obj.get("vagas"), list):
        raise ValueError("Base inválida: esperado objeto com a lista vagas")
    ids = set()
    for v in obj["vagas"]:
        if not isinstance(v, dict) or not all(v.get(k) for k in ("id", "orgao", "cargo", "cidade", "uf", "url")):
            raise ValueError("Registro incompleto: id, órgão, cargo, local e URL obrigatórios")
        if v["id"] in ids:
            raise ValueError("ID duplicado: " + v["id"])
        if not str(v["url"]).startswith("https://"):
            raise ValueError("URL oficial deve começar com https: " + v["id"])
        if v["uf"] not in ("PR", "SC", "SP"):
            raise ValueError("Estado não permitido: " + v["id"])
        if not isinstance(v.get("imediatas"), int) or v["imediatas"] < 0:
            raise ValueError("Vagas imediatas inválidas: " + v["id"])
        for fld in ("inscricoes_ate", "prova"):
            if v.get(fld):
                dt.date.fromisoformat(v[fld])
        ids.add(v["id"])
    return obj

def diff(old, new):
    a = {v["id"]: v for v in old.get("vagas", [])}
    b = {v["id"]: v for v in new["vagas"]}
    added = sorted(set(b) - set(a))
    modified = sorted(k for k in set(a) & set(b) if any(a[k].get(f) != b[k].get(f) for f in FIELDS))
    removed = sorted(set(a) - set(b))
    return {"atualizado_em": new.get("atualizado_em", ""),
            "comparado_com": old.get("atualizado_em", ""),
            "novos": added,
            "retificados": modified,
            "retirados": removed,
            "total_publicado": len(new["vagas"]),
            "resumo": {"novos": len(added), "retificados": len(modified), "retirados": len(removed)}}

def main():
    p = argparse.ArgumentParser()
    p.add_argument("--atual", default="dados.json")
    p.add_argument("--anterior", required=True)
    p.add_argument("--saida", default="novidades.json")
    args = p.parse_args()
    previous = load(args.anterior)
    current = load(args.atual)
    if current.get("atualizado_em") and previous.get("atualizado_em"):
        if current["atualizado_em"] < previous["atualizado_em"]:
            raise ValueError("atualizado_em não pode retroceder")
    Path(args.saida).write_text(json.dumps(diff(previous, current), indent=2, ensure_ascii=False)+"\n", encoding="utf-8")

if __name__ == "__main__":
    main()
