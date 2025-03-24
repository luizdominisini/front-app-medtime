document.addEventListener("DOMContentLoaded", () => {
  const formCadastro = document.getElementById("formCadastro");
  const mensagemDiv = document.getElementById("mensagem");

  formCadastro.addEventListener("submit", async (event) => {
    event.preventDefault();

    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const dataNascimento = document.getElementById("dataNascimento").value;
    const senha = document.getElementById("senha").value;

    mensagemDiv.className = "mensagem";
    mensagemDiv.textContent = "Processando...";

    try {
      const response = await api.cadastrarUsuario({
        nome,
        email,
        dataNascimento,
        senha,
      });

      if (response.sucesso == true) {
        mensagemDiv.className = "mensagem sucesso";
        mensagemDiv.textContent =
          "Usuário cadastrado com sucesso! Redirecionando...";

        formCadastro.reset();

        setTimeout(() => {
          window.location.href = "index.html";
        }, 3000);
      } else {
        mensagemDiv.className = "mensagem error";
        mensagemDiv.textContent = `${response.message}`;
      }
    } catch (error) {
      mensagemDiv.className = "message error";
      mensagemDiv.textContent =
        "Erro ao cadastrar usuário. Tente novamente mais tarde.";
      console.error("Erro no cadastro:", error);
    }
  });
});
