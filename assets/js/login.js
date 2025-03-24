document.addEventListener("DOMContentLoaded", async () => {
  const formLogin = document.getElementById("formLogin");
  const mensagemDiv = document.getElementById("mensagem");

  formLogin.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    mensagemDiv.className = "mensagem";
    mensagemDiv.textContent = "Processando...";

    try {
      const response = await api.login({ email: email, senha: senha });

      if (response.token) {
        auth.salvarToken(response.token);

        mensagemDiv.className = "mensagem sucesso";
        mensagemDiv.textContent =
          "Login realizado com sucesso! redirecionando...";

        setTimeout(() => {
          window.location.href = "dashboard.html";
        }, 3000);
      } else {
        mensagemDiv.className = "mensagem error";
        mensagemDiv.textContent =
          response.mensagem ||
          "Erro ao fazer login. Verifique suas credenciais.";
      }
    } catch (error) {
      mensagemDiv.className = "mensagem error";
      mensagemDiv.textContent =
        "Erro ao fazer login. Tente novamente mais tarde.";
      console.error("Erro no login:", error);
    }
  });
});
