// Animações on scroll e parallax
document.addEventListener("DOMContentLoaded", () => {
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add("show");
      });
    },
    { threshold: 0.2 }
  );

  document.querySelectorAll(".animate-fade, .animate-up, .animate-slide").forEach(el => observer.observe(el));

  // Parallax no hero
  const heroBg = document.querySelector(".hero-bg");
  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY * 0.3;
    heroBg.style.transform = `translateY(${scrollY}px)`;
  });

  // Login via Discord
  const discordLoginBtn = document.getElementById("discordLogin");

  discordLoginBtn.addEventListener("click", () => {
    // Redireciona para o endpoint de autenticação do Discord no servidor
    window.location.href = "/auth/discord";
  });

  // Verifica se o usuário está logado (requisição para o backend)
  const userSection = document.getElementById("userSection");
  if (userSection) {
    fetch("/api/me")
      .then(res => {
        if (!res.ok) throw new Error("Usuário não logado");
        return res.json();
      })
      .then(user => {
        userSection.innerHTML = `
          <img src="https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png" class="avatar">
          <span>${user.username}</span>
          <a href="/logout" class="btn btn-outline">Sair</a>
        `;
      })
      .catch(err => console.log(err.message));
  }

  // Formulário de contato
  document.getElementById("contactForm").addEventListener("submit", e => {
    e.preventDefault();
    alert("Mensagem enviada com sucesso!");
    e.target.reset();
  });
});
