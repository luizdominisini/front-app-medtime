document.addEventListener("DOMContentLoaded", () => {
  const formCadastro = document.getElementById("formCadastro");
  const mensagemDiv = document.getElementById("mensagem");

  const exibirMensagem = (mensagem, tipo = "info") => {
    mensagemDiv.className = `mensagem ${tipo}`;
    mensagemDiv.textContent = mensagem;
  };

  const obterDadosDoFormulario = () => ({
    nome: document.getElementById("nome").value.trim(),
    email: document.getElementById("email").value.trim(),
    dataNascimento: document.getElementById("dataNascimento").value,
    senha: document.getElementById("senha").value,
  });

  const redirecionarParaLogin = () => {
    setTimeout(() => {
      window.location.href = "index.html";
    }, 3000);
  };

  formCadastro.addEventListener("submit", async (event) => {
    event.preventDefault();
    exibirMensagem("Processando...", "info");

    const dadosUsuario = obterDadosDoFormulario();

    try {
      const response = await authService.cadastrarUsuario(dadosUsuario);

      if (response.sucesso) {
        exibirMensagem(
          "Usuário cadastrado com sucesso! Redirecionando...",
          "sucesso"
        );
        formCadastro.reset();
        redirecionarParaLogin();
      } else {
        exibirMensagem(response.message || "Erro no cadastro.", "error");
      }
    } catch (error) {
      console.error("Erro no cadastro:", error);
      exibirMensagem(
        "Erro ao cadastrar usuário. Tente novamente mais tarde.",
        "error"
      );
    }
  });
});
