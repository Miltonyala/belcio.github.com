/*
 BELCIO — CONFIGURAÇÃO DO SITE
 Atualiza os contactos abaixo e substitui os cartões de demonstração pelos teus projetos.
*/
const CONFIG = {
  whatsapp: "", // Número com indicativo, apenas dígitos. Ex.: "2449XXXXXXXX"
  instagram: "", // URL do perfil Instagram
  email: "" // E-mail profissional
};

const projects = [
  {title:"Identidade de marca",category:"design",label:"DESIGN",description:"Identidade visual · exemplo de demonstração",art:"BRAND<br>IDENTITY",bg:"#18233b",color:"#8eb8ff"},
  {title:"Vídeo promocional",category:"video",label:"VÍDEO",description:"Produção audiovisual · exemplo de demonstração",art:"MOTION<br>STORY",bg:"#172d47",color:"#9dc9ff"},
  {title:"Campanha gráfica",category:"design",label:"DESIGN",description:"Design publicitário · exemplo de demonstração",art:"MAKE<br>NOISE",bg:"#25233d",color:"#c2b7ff"},
  {title:"Conteúdo para redes",category:"edicao",label:"EDIÇÃO",description:"Edição de vídeo · exemplo de demonstração",art:"CUT<br>TO THE<br>POINT",bg:"#1c3440",color:"#8ee3f2"},
  {title:"Cartaz criativo",category:"design",label:"DESIGN",description:"Cartaz promocional · exemplo de demonstração",art:"VISUAL<br>IMPACT",bg:"#30253d",color:"#e0b4ff"},
  {title:"Reel de marca",category:"video",label:"VÍDEO",description:"Vídeo curto · exemplo de demonstração",art:"FRAME<br>BY FRAME",bg:"#182b42",color:"#a9c9ff"}
];

const grid = document.querySelector("#projectGrid");
const count = document.querySelector("#projectCount");
const filters = [...document.querySelectorAll(".filter")];

function renderProjects(filter = "todos") {
  const visible = projects.filter(project => filter === "todos" || project.category === filter);
  count.textContent = String(visible.length).padStart(2, "0");
  grid.innerHTML = visible.map((p, i) => `
    <article class="project-card">
      <div class="project-art" style="--art-bg:${p.bg};--art-color:${p.color}">
        <span class="art-label">${p.label}</span><span class="art-word">${p.art}</span>
        <span class="art-number">${String(i+1).padStart(2,"0")} / ${String(visible.length).padStart(2,"0")}</span>
      </div>
      <div class="project-meta"><div><h3>${p.title}</h3><p>${p.description}</p></div><span class="project-arrow">↗</span></div>
    </article>`).join("");
}
renderProjects();

filters.forEach(btn => btn.addEventListener("click", () => {
  filters.forEach(other => other.classList.toggle("active", other === btn));
  renderProjects(btn.dataset.filter);
}));

const menuToggle = document.querySelector("#menuToggle");
const nav = document.querySelector("#nav");
menuToggle.addEventListener("click", () => {
  const opened = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(opened));
  menuToggle.setAttribute("aria-label", opened ? "Fechar menu" : "Abrir menu");
  menuToggle.textContent = opened ? "×" : "☰";
});
nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  nav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.textContent = "☰";
}));

const status = document.querySelector("#formStatus");
const whatsapp = document.querySelector("#whatsappLink");
const instagram = document.querySelector("#instagramLink");
const email = document.querySelector("#emailLink");

if (CONFIG.whatsapp.trim()) whatsapp.href = `https://wa.me/${CONFIG.whatsapp.replace(/\\D/g, "")}`;
else whatsapp.addEventListener("click", e => { e.preventDefault(); status.textContent = "Configura o número de WhatsApp em script.js."; });
if (CONFIG.instagram.trim()) { instagram.href = CONFIG.instagram; instagram.target = "_blank"; instagram.rel = "noopener"; }
else instagram.addEventListener("click", e => { e.preventDefault(); status.textContent = "Configura o link do Instagram em script.js."; });
if (CONFIG.email.trim()) email.href = `mailto:${CONFIG.email}`;
else email.addEventListener("click", e => { e.preventDefault(); status.textContent = "Configura o e-mail em script.js."; });

document.querySelector("#year").textContent = new Date().getFullYear();
document.querySelector("#contactForm").addEventListener("submit", e => {
  e.preventDefault();
  const data = new FormData(e.currentTarget);
  const name = String(data.get("name") || "").trim();
  const reply = String(data.get("reply") || "").trim();
  const service = String(data.get("service") || "");
  const message = String(data.get("message") || "").trim();
  const subject = encodeURIComponent(`Pedido de contacto — ${service}`);
  const body = encodeURIComponent(`Olá, Belcio!\\n\\nNome: ${name}\\nContacto para resposta: ${reply}\\nServiço: ${service}\\n\\nSobre o projeto:\\n${message}`);
  if (CONFIG.email.trim()) {
    window.location.href = `mailto:${CONFIG.email}?subject=${subject}&body=${body}`;
    status.textContent = "A abrir o teu programa de e-mail para enviar a mensagem.";
  } else {
    const preview = document.querySelector("#messagePreview");
    preview.hidden = false;
    preview.value = `Olá, Belcio!\\n\\nNome: ${name}\\nContacto para resposta: ${reply}\\nServiço: ${service}\\n\\nSobre o projeto:\\n${message}`;
    status.textContent = "Mensagem preparada. Copia o texto abaixo; configura o e-mail em script.js para automatizar este passo.";
    preview.focus();
  }
});
