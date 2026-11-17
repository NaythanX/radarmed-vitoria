/* RadarMed — favoritos sincronizados (opcional, ativado apenas com config segura). */
(async () => {
  "use strict";
  const button = document.getElementById("radarmed-auth");
  const info = document.getElementById("radarmed-account-status");
  if (!button || !info) return;

  let config;
  try {
    const response = await fetch("./auth-config.json", { cache: "no-store" });
    if (response.ok) config = await response.json();
  } catch (_) {}
  if (!config?.enabled || !config?.url || !config?.publishableKey) {
    button.disabled = true;
    button.textContent = "☁ Conta em preparação";
    info.textContent = "Seus salvos continuam neste navegador. A conta Google e a sincronização entre dispositivos ainda estão sendo configuradas.";
    return;
  }
  let client;
  try {
    const { createClient } = await import("https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.95.0/+esm");
    client = createClient(config.url, config.publishableKey, {
      auth: { flowType: "pkce", detectSessionInUrl: true, persistSession: true }
    });
  } catch (err) {
    console.error("Não foi possível carregar autenticação:", err);
    button.disabled = true;
    button.textContent = "Conta indisponível";
    info.textContent = "Não foi possível iniciar a conta. Seus favoritos locais estão preservados.";
    return;
  }

  let user = null;
  let busy = false;
  let queue = Promise.resolve();
  const bridge = () => window.RadarMedBridge;
  const feedback = msg => { info.textContent = msg; };
  const render = () => {
    button.disabled = false;
    if (user) {
      button.textContent = "Sair da conta";
      button.title = "Conectada: " + (user.email || "conta Google");
    } else {
      button.textContent = "Entrar com Google";
      button.title = "Sincronizar seus concursos salvos";
    }
  };
  function handleError(err, action) {
    console.error("RadarMed " + action + ":", err);
    feedback("Falha ao sincronizar. Seus favoritos continuam salvos neste navegador.");
  }
  async function initializeAccount() {
    if (!user || !bridge() || busy) return;
    busy = true;
    feedback("Sincronizando favoritos…");
    try {
      const { data, error } = await client.from("user_favorites")
        .select("vacancy_id").eq("user_id", user.id);
      if (error) throw error;
      const remote = new Set((data || []).map(row => row.vacancy_id));
      const importKey = "radarmed_imported_" + user.id;
      if (localStorage.getItem(importKey) !== "1") {
        const fromLocal = bridge().getFavorites().filter(x => !remote.has(x));
        if (fromLocal.length) {
          const payload = fromLocal.map(vacancy_id => ({ user_id: user.id, vacancy_id }));
          const { error: insertError } = await client.from("user_favorites")
            .upsert(payload, { onConflict: "user_id,vacancy_id" });
          if (insertError) throw insertError;
          fromLocal.forEach(id => remote.add(id));
        }
        localStorage.setItem(importKey, "1");
      }
      bridge().replaceFavorites([...remote]);
      feedback("Favoritos sincronizados na conta " + (user.email || "Google") + ".");
    } catch (err) { handleError(err, "consulta"); }
    finally { busy = false; }
  }
  function onFavoriteChanged(event) {
    if (!user || busy || !event.detail?.id) return;
    const { id, saved } = event.detail;
    const currentUid = user.id;
    queue = queue.then(async () => {
      if (!user || user.id !== currentUid) return;
      const op = saved
        ? client.from("user_favorites").upsert(
            { user_id: currentUid, vacancy_id: id }, { onConflict: "user_id,vacancy_id" })
        : client.from("user_favorites").delete()
            .eq("user_id", currentUid).eq("vacancy_id", id);
      const { error } = await op;
      if (error) throw error;
      feedback("Favoritos sincronizados na sua conta.");
    }).catch(err => handleError(err, "gravação"));
  }
  window.addEventListener("radarmed:favorite", onFavoriteChanged);
  window.addEventListener("radarmed:ready", () => { if (user) void initializeAccount(); });
  button.addEventListener("click", async () => {
    button.disabled = true;
    try {
      if (user) {
        const { error } = await client.auth.signOut();
        if (error) throw error;
        user = null;
        feedback("Sessão encerrada. Os favoritos já sincronizados continuam na sua conta.");
      } else {
        const { error } = await client.auth.signInWithOAuth({
          provider: "google",
          options: { redirectTo: location.origin + location.pathname }
        });
        if (error) throw error;
      }
    } catch (err) { handleError(err, "login"); } finally { render(); }
  });
  client.auth.onAuthStateChange((_event, session) => {
    const nextUser = session?.user || null;
    const changed = nextUser?.id !== user?.id;
    user = nextUser;
    render();
    if (user && changed) Promise.resolve().then(() => initializeAccount());
    if (!user) feedback("Entre com o Google para sincronizar favoritos entre dispositivos.");
  });
  const { data: sessionData, error: sessionError } = await client.auth.getSession();
  if (sessionError) handleError(sessionError, "sessão");
  user = sessionData?.session?.user || null;
  render();
  if (user && bridge()) await initializeAccount();
})();
