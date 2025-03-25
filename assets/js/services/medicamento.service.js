
const medicamentoService = {
  cadastrarMedicamento: async (dados) => {
    const response = await fetch(`${API_URL}/med/cadastrar`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.obterToken()}`,
      },
      body: JSON.stringify(dados),
    });

    return response.json();
  },

  listarMedicamentos: async () => {
    const response = await fetch(`${API_URL}/med/listar`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.obterToken()}`,
      },
    });

    return response.json();
  },

  deletarMedicamento: async (id) => {
    const response = await fetch(`${API_URL}/med/delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.obterToken()}`,
      },
      body: JSON.stringify({ id }),
    });

    return response.json();
  },
};
