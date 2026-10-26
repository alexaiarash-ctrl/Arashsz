const root = document.documentElement;
const body = document.body;
const themeBtn = document.getElementById("themeBtn");
const langBtn = document.getElementById("langBtn");
const metaTheme = document.querySelector('meta[name="theme-color"]');

function systemTheme(){
  return matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}
function setTheme(theme, save=true){
  root.dataset.theme = theme;
  metaTheme.setAttribute("content", theme === "light" ? "#eef1f4" : "#06101d");
  if(save) localStorage.setItem("arash-theme", theme);
}
const savedTheme = localStorage.getItem("arash-theme");
setTheme(savedTheme || systemTheme(), false);

matchMedia("(prefers-color-scheme: light)").addEventListener("change", e => {
  if(!localStorage.getItem("arash-theme")) setTheme(e.matches ? "light" : "dark", false);
});
themeBtn.addEventListener("click", () => setTheme(root.dataset.theme === "light" ? "dark" : "light"));

let lang = localStorage.getItem("arash-lang") || "fa";
function setLang(next){
  lang = next;
  const fa = lang === "fa";
  document.documentElement.lang = lang;
  document.documentElement.dir = fa ? "rtl" : "ltr";
  body.classList.toggle("en", !fa);
  langBtn.textContent = fa ? "EN" : "FA";
  document.querySelectorAll("[data-fa][data-en]").forEach(el => {
    el.textContent = el.dataset[lang];
  });
  localStorage.setItem("arash-lang", lang);
  updateClock();
}
setLang(lang);
langBtn.addEventListener("click", () => setLang(lang === "fa" ? "en" : "fa"));

function updateClock(){
  const now = new Date();
  document.getElementById("time").textContent = new Intl.DateTimeFormat(lang === "fa" ? "fa-IR" : "en-GB", {
    hour:"2-digit", minute:"2-digit", second:"2-digit"
  }).format(now);
  document.getElementById("date").textContent = new Intl.DateTimeFormat(lang === "fa" ? "fa-IR" : "en-US", {
    weekday:"long", year:"numeric", month:"long", day:"numeric"
  }).format(now);
}
updateClock();
setInterval(updateClock, 1000);

document.getElementById("saveContact").addEventListener("click", () => {
  const vcard = `BEGIN:VCARD
VERSION:3.0
N:Souzani;Arash;;;
FN:Arash Souzani
TEL;TYPE=CELL:+989033057473
TEL;TYPE=CELL:+989103805351
URL:https://t.me/Alexjoni
URL:https://www.instagram.com/arash_srzzz/
URL:https://www.instagram.com/alexjonpvv/
END:VCARD`;
  const blob = new Blob([vcard], {type:"text/vcard;charset=utf-8"});
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = "Arash-Souzani.vcf";
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  const toast = document.getElementById("toast");
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 1800);
});

// Subtle desktop tilt; disabled on touch devices.
const hero = document.querySelector(".hero");
if(matchMedia("(hover:hover)").matches){
  hero.addEventListener("mousemove", e => {
    const r = hero.getBoundingClientRect();
    const x = (e.clientX-r.left)/r.width-.5, y=(e.clientY-r.top)/r.height-.5;
    hero.style.transform = `perspective(900px) rotateX(${-y*1.5}deg) rotateY(${x*1.5}deg)`;
  });
  hero.addEventListener("mouseleave", () => hero.style.transform = "");
}
