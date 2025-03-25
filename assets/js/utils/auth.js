const auth = {
  salvarToken(token) {
    localStorage.setItem("token", token);
  },

  obterToken() {
    return localStorage.getItem("token");
  },

  obterPayload() {
    const token = auth.obterToken();

    if (!token) return null;

    try {
      const base64Payload = token.split(".")[1];
      const payloadDecoded = atob(base64Payload);
      return JSON.parse(payloadDecoded);
    } catch (error) {
      console.error("Erro ao decodificar token:", error);
      return null;
    }
  },

  async estaAutenticado() {
    const token = auth.obterToken();
    if (!token) return false;

    try {
      const validacao = await authService.validarToken();
      return validacao?.auth;
    } catch (err) {
      return false;
    }
  },

  logout() {
    localStorage.removeItem("token");
  },

  async verificarAutenticacao() {
    const pagina = window.location.pathname.split("/").pop();
    const autenticado = await auth.estaAutenticado();

    if (pagina === "dashboard.html" && !autenticado) {
      auth.logout();
      window.location.href = "index.html";
    }

    if ((pagina === "index.html" || pagina === "") && autenticado) {
      window.location.href = "dashboard.html";
    }
  },
};

document.addEventListener("DOMContentLoaded", auth.verificarAutenticacao);
