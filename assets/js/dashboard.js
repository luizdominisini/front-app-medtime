document.addEventListener("DOMContentLoaded", async () => {
  const userNameElement = document.getElementById("userName");
  const usersListElement = document.getElementById("usersList");
  const logoutBtn = document.getElementById("logout");

  const autenticado = await auth.estaAutenticado();
  if (!autenticado) {
    window.location.href = "index.html";
    return;
  }

  logoutBtn.addEventListener("click", () => {
    auth.logout();
    window.location.href = "index.html";
  });

  const usuarioPayload = auth.obterPayload();
  if (usuarioPayload?.nome) {
    userNameElement.textContent = `Olá, ${usuarioPayload.nome}`;
  }

  const criarTd = (texto) => {
    const td = document.createElement("td");
    td.textContent = texto;
    return td;
  };

  const renderizarUsuarios = (usuarios) => {
    usersListElement.innerHTML = "";

    if (!Array.isArray(usuarios) || usuarios.length === 0) {
      usersListElement.innerHTML =
        '<tr><td colspan="5">Nenhum usuário encontrado</td></tr>';
      return;
    }

    usuarios.forEach((usuario) => {
      const tr = document.createElement("tr");

      tr.appendChild(criarTd(usuario.id));
      tr.appendChild(criarTd(usuario.nome));
      tr.appendChild(criarTd(usuario.email));
      tr.appendChild(criarTd(formatarData(usuario.dataNascimento)));

      const tdDeletar = document.createElement("td");
      const btnDeletar = document.createElement("button");
      btnDeletar.className = "btnDeletar";
      btnDeletar.textContent = "Deletar";

      btnDeletar.addEventListener("click", async () => {
        const response = await authService.deletarUsuario(usuario.id);
        if (response.sucess) {
          tr.remove();
        }
      });

      tdDeletar.appendChild(btnDeletar);
      tr.appendChild(tdDeletar);

      usersListElement.appendChild(tr);
    });
  };

  const formatarData = (dataIso) => {
    const data = new Date(dataIso);
    return data.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  try {
    const { users } = await authService.listarUsuarios();
    renderizarUsuarios(users);
  } catch (error) {
    console.error("Erro ao carregar usuários:", error);
    usersListElement.innerHTML =
      '<tr><td colspan="5">Erro ao carregar usuários</td></tr>';
  }
});
