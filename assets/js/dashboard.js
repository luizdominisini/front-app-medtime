document.addEventListener("DOMContentLoaded", async () => {
  const userNameElement = document.getElementById("userName");
  const usersListElement = document.getElementById("usersList");
  const logout = document.getElementById("logout");
  const data = new Date();

  const autenticado = await auth.estaAutenticado();

  if (!autenticado) {
    window.location.href = "index.html";
    return;
  }

  logout.addEventListener("click", () => {
    auth.logout();
  });

  const usuarioPayload = auth.obterPayload();
  if (usuarioPayload && usuarioPayload.nome) {
    userNameElement.textContent = `Olá, ${usuarioPayload.nome}`;
  }

  try {
    const { users } = await api.listarUsuarios();

    if (Array.isArray(users)) {
      usersListElement.innerHTML = "";

      users.forEach((usuario) => {
        const tr = document.createElement("tr");

        //coluna id
        const tdId = document.createElement("td");
        tdId.textContent = usuario.id;
        tr.appendChild(tdId);

        //coluna email
        const tdEmail = document.createElement("td");
        tdEmail.textContent = usuario.email;
        tr.appendChild(tdEmail);

        //coluna nome
        const tdNome = document.createElement("td");
        tdNome.textContent = usuario.nome;
        tr.appendChild(tdNome);

        //coluna data de nascimento
        const tdDataNascimento = document.createElement("td");
        tdDataNascimento.textContent = data.toLocaleDateString("pt-BR", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        });
        tr.appendChild(tdDataNascimento);

        const tdDeletar = document.createElement("td");
        const btnDeletar = document.createElement("button");
        btnDeletar.className = "btnDeletar";
        btnDeletar.textContent = "Deletar";

        btnDeletar.addEventListener("click", async () => {
          const response = await api.deletarUsuario(usuario.id);
          if (response.sucess) {
            tr.remove();
          }
        });

        tdDeletar.appendChild(btnDeletar);
        tr.appendChild(tdDeletar);

        usersListElement.appendChild(tr);
      });
    } else {
      usersListElement.innerHTML =
        '<tr><td colspan="4">Nenhum usuário encontrado</td></tr>';
    }
  } catch (error) {
    console.error("Erro ao carregar usuários:", error);
    usersListElement.innerHTML =
      '<tr><td colspan="4">Erro ao carregar usuários</td></tr>';
  }
});
