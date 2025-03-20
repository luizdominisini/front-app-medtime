const API_URL = "http://192.168.13.73:3000";

const api = {
  cadastrarUsuario: async (usuario) => {
    try {
      const response = await fetch(`${API_URL}/auth/cadastrar`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(usuario),
      });

      return response.json();
    } catch (error) {
      console.error("Erro ao cadastrar usuário: ", error);
      throw error;
    }
  },

  login: async (credenciais) => {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credenciais),
      });

      return response.json();
    } catch (error) {
      console.error("Erro ao fazer login: ", error);
      throw error;
    }
  },

  listarUsuarios: async () => {
    try {
      const response = await fetch(`${API_URL}/auth/listar`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.obterToken()}`,
        },
      });

      return response.json();
    } catch (error) {
      console.error("Erro ao listar usuários: ", error);
      throw error;
    }
  },

  validarToken: async () => {
    const response = await fetch(`${API_URL}/auth/verify-token`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.obterToken()}`,
      },
    });
    
    return response.json();
  },
};
