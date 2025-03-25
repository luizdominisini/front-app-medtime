document.addEventListener("DOMContentLoaded", () => {
  const formLogin = document.getElementById("formLogin");
  const mensagemDiv = document.getElementById("mensagem");

  const exibirMensagem = (mensagem, tipo = "info") => {
    mensagemDiv.className = `mensagem ${tipo}`;
    mensagemDiv.textContent = mensagem;
  };

  const redirecionarParaDashboard = () => {
    setTimeout(() => {
      window.location.href = "dashboard.html";
    }, 3000);
  };

  formLogin.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value;

    exibirMensagem("Processando...");

    try {
      const response = await authService.login({ email, senha });
      
      if (response.token) {
        auth.salvarToken(response.token);
        exibirMensagem(
          "Login realizado com sucesso! Redirecionando...",
          "sucesso"
        );
        redirecionarParaDashboard();
      } else {
        exibirMensagem(
          response.mensagem ||
            "Erro ao fazer login. Verifique suas credenciais.",
          "error"
        );
      }
    } catch (error) {
      console.error("Erro no login:", error);
      exibirMensagem(
        "Erro ao fazer login. Tente novamente mais tarde.",
        "error"
      );
    }
  });
});
