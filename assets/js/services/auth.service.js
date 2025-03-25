
const authService = {
  cadastrarUsuario: async (usuario) => {
    const response = await fetch(`${API_URL}/auth/cadastrar`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(usuario),
    });

    return response.json();
  },

  login: async (credenciais) => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credenciais),
    });

    return response.json();
  },

  listarUsuarios: async () => {
    const response = await fetch(`${API_URL}/auth/listar`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.obterToken()}`,
      },
    });

    return response.json();
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

  deletarUsuario: async (user_id) => {
    const response = await fetch(`${API_URL}/auth/deletar`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.obterToken()}`,
      },
      body: JSON.stringify({ user_id }),
    });

    return response.json();
  },
};
