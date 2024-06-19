// @ts-nocheck
/* Variables */
const gallery = document.querySelector(".gallery");
const body = document.querySelector("body");
const containerFiltres = document.querySelector(".container-filtres");
// Variables pour la partie conexion
const token = window.sessionStorage.getItem("token");
const user = window.sessionStorage.getItem("userId");
const logOut = document.getElementById("login-link");
const sectionPortfolio = document.querySelector("#portfolio");
const sectionPortfolioH2 = document.querySelector("#portfolio h2");
const adminText = "Mode édition";
const adminLogo = `<i class="fa-regular fa-pen-to-square"></i>`;
const adminConexionUP = `<div class="admin-edit">
<p>${adminLogo}${adminText}</p>
</div>`;
const divEdit = document.createElement("div");
const spanEdit = document.createElement("span");
const adminConexionDown = `${adminLogo}  ${adminText} `;

/* Chercher le tableau de works avec une requête à l'API */
async function getWorks() {
  const requete = await fetch("http://localhost:5678/api/works");
  return requete.json();
}
async function getCategory() {
  const requete = await fetch("http://localhost:5678/api/categories");
  return requete.json();
}

async function main() {
  displayWorksGallery();
  createAllButtons();
  logginAdmin();
  logoutAdmin();
  displayByCategory();
}
main();

/* affichage des works dans le dom */
function displayWorksGallery() {
  gallery.innerHTML = "";
  getWorks().then((data) => {
    //cree pour chaque élément du tableau
    // console.log(data);
    data.forEach((work) => {
      createWork(work);
    });
  });
}

function createWork(work) {
  const figure = document.createElement("figure");
  const img = document.createElement("img");
  const figcaption = document.createElement("figcaption");
  figcaption.textContent = work.title;
  img.src = work.imageUrl;
  img.alt = work.title;
  figure.appendChild(img);
  figure.appendChild(figcaption);
  gallery.appendChild(figure);
}

/*****Création des bouton dynamiquement******/
/*Boucle for pour creer les bouton par catégorie*/
function createAllButtons() {
  getCategory().then((data) => {
    // console.log(data);
    data.forEach((category) => {
      createButton(category);
    });
  });
}
function createButton(category) {
  const btn = document.createElement("button");
  btn.classList.add("buttons-filtres");
  btn.textContent = category.name;
  btn.id = category.id;
  containerFiltres.appendChild(btn);
  // console.log(category.id);
  // console.log(category.name);
}

// Trie par classe sur les boutons filtres
async function displayByCategory() {
  const works = await getWorks();
  const buttons = document.querySelectorAll(".container-filtres button");
  buttons.forEach((button) => {
    button.addEventListener("click", (e) => {
      buttons.forEach((btn) => {
        btn.classList.remove("active");
      });
      button.classList.add("active");
      const btnId = e.target.id;
      gallery.innerHTML = "";
      works.forEach((work) => {
        if (btnId == work.categoryId) {
          createWork(work);
          // console.log(work);
        }
        if (btnId == "0") {
          createWork(work);
          // console.log(work);
        }
      });
    });
  });
  // console.log(buttons);
}

