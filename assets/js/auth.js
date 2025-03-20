const auth = {
  salvarToken: (token) => {
    localStorage.setItem("token", token);
  },

  obterToken: () => {
    return localStorage.getItem("token");
  },

  obterPayload: () => {
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

  estaAutenticado: async () => {
    const temToken = localStorage.getItem("token");
    if (!temToken) {
      return false;
    }

    const validaToken = await api.validarToken();

    if (!validaToken.auth) {
      return false;
    }

    return true;
  },

  logout: () => {
    localStorage.removeItem("token");
    window.location.href = "index.html";
  },

  verificarAutenticacao: async () => {
    const paginaAtual = window.location.pathname.split("/").pop();
    const autenticado = await auth.estaAutenticado();

    if (paginaAtual == "dashboard.html" && !autenticado) {
      auth.logout();
      window.location.href = "index.html";
      return false;
    } else if (
      (paginaAtual == "index.html" || paginaAtual == "") &&
      autenticado
    ) {
      window.location.href = "dashboard.html";
      return true;
    }

    return true;
  },
};

document.addEventListener("DOMContentLoaded", auth.verificarAutenticacao);
