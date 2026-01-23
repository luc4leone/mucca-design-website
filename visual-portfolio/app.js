// PORTFOLIO IMAGES DATA - Lista statica (semplice e affidabile)
var portfolioImgs = [
  "./img/1.jpg",
  "./img/2.jpg",
  "./img/3.jpg",
  "./img/4.jpg",
  "./img/5.jpg",
  "./img/7.jpg",
  "./img/8.jpg",
  "./img/9.jpg",
  "./img/10.jpg",
  "./img/11.jpg",
  "./img/12.jpg",
  "./img/13.jpg",
  "./img/14.jpg",
  "./img/15.jpg",
  "./img/16.jpg",
  "./img/17.jpg",
  "./img/18.jpg",
  "./img/19.jpg",
  "./img/20.jpg",
  "./img/21.jpg",
  "./img/22.jpg",
  "./img/23.jpg",
  "./img/24.jpg",
  "./img/25.jpg",
  "./img/26.jpg",
  "./img/27.jpg",
  "./img/28.jpg",
  "./img/29.jpg",
  "./img/31.jpg",
  "./img/32.jpg",
  "./img/33.jpg",
  "./img/34.jpg",
  "./img/35.jpg",
  "./img/36.jpg",
  "./img/37.jpg",
  "./img/38.jpg",
  "./img/39.jpg",
  "./img/40.jpg",
  "./img/41.png",
  "./img/42.jpg",
  "./img/43.jpg",
  "./img/44.jpg",
  "./img/45.jpg",
  "./img/46.jpg",
  "./img/47.jpg",
  "./img/48.jpg",
  "./img/49.jpg",
  "./img/50.jpg",
  "./img/51.jpg",
  "./img/52.jpg",
  "./img/53.jpg",
  "./img/54.jpg",
  "./img/55.jpg",
  "./img/56.jpg",
  "./img/57.jpg",
  "./img/58.jpg",
];
var currentImageArray = [];
var loadedImages = 0;

// Stili CSS per la barra di progresso (semplificato)
function addProgressBarStyles() {
  if (!document.querySelector("#progress-styles")) {
    const style = document.createElement("style");
    style.id = "progress-styles";
    style.textContent = `
      .loading-progress {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 3px;
        background: #f0f0f0;
        z-index: 1000;
      }
      .loading-progress-bar {
        height: 100%;
        background: linear-gradient(90deg, #4CAF50, #45a049);
        transition: width 0.3s ease;
        width: 0%;
      }
    `;
    document.head.appendChild(style);
  }
}

// Funzione per aggiornare la barra di progresso
function updateProgressBar() {
  const progressBar = document.querySelector(".loading-progress-bar");
  if (progressBar && portfolioImgs.length > 0) {
    const percentage = (loadedImages / portfolioImgs.length) * 100;
    progressBar.style.width = percentage + "%";

    // Rimuovi la barra quando il caricamento è completo
    if (loadedImages >= portfolioImgs.length) {
      setTimeout(() => {
        const progressContainer = document.querySelector(".loading-progress");
        if (progressContainer) {
          progressContainer.remove();
        }
      }, 500);
    }
  }
}

// Funzione semplice per creare immagini dirette (compatibile con CSS colonne)
function createImageElement(imagePath, index) {
  const img = document.createElement("img");
  img.src = imagePath;
  img.loading = "lazy"; // Lazy loading nativo del browser
  img.decoding = "async";
  img.style.cssText = `
    width: 100%;
    height: auto;
    display: block;
    opacity: 0;
    transition: opacity 0.3s ease;
    cursor: pointer;
    margin: 0;
    padding: 0;
    border: 0;
    vertical-align: top;
  `;

  img.onload = function () {
    img.style.opacity = "1";
    loadedImages++;
    updateProgressBar();
  };

  img.onerror = function () {
    img.remove();
    loadedImages++;
    updateProgressBar();
  };

  img.addEventListener("click", displayModal);

  return img;
}

// Funzione SEMPLICE per creare la galleria
function buildSimpleGallery() {
  console.log("🚀 Creazione galleria semplice e veloce...");

  // Aggiungi stili CSS
  addProgressBarStyles();

  const gallery = document.getElementById("gallery");

  // Crea barra di progresso
  const progressContainer = document.createElement("div");
  progressContainer.className = "loading-progress";
  const progressBar = document.createElement("div");
  progressBar.className = "loading-progress-bar";
  progressContainer.appendChild(progressBar);
  document.body.insertBefore(progressContainer, document.body.firstChild);

  // Mescola le immagini
  const shuffledImages = shuffleArray([...portfolioImgs]);
  currentImageArray = shuffledImages;

  // Crea tutte le immagini con lazy loading nativo
  shuffledImages.forEach((imagePath, index) => {
    const imageElement = createImageElement(imagePath, index);
    gallery.appendChild(imageElement);
  });

  console.log(
    `✅ Galleria creata con ${shuffledImages.length} immagini (lazy loading nativo)`
  );
}

// https://css-tricks.com/seamless-responsive-photo-grid/
function byRows(list, columns) {
  /*
    list is an array of items.
    columns is the number of columns.
    the function should return an array with the items rearranged by the following logic.
    two examples. 
    the first: if the list is [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20] and the number of columns is 5, the function should return [1, 6, 11, 16, 2, 7, 12, 17, 3, 8, 13, 18, 4, 9, 14, 19, 5, 10, 15, 20].
    the second: if the list is [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20] and the number of columns is 4, the function should return [1, 5, 9, 13, 17, 2, 6, 10, 14, 18, 3, 7, 11, 15, 19, 4, 8, 12, 16, 20]
    */
  var rows = [];
  for (var i = 0; i < columns; i++) {
    rows.push([]);
  }
  for (var i = 0; i < list.length; i++) {
    rows[i % columns].push(list[i]);
  }
  var result = [];
  for (var i = 0; i < rows.length; i++) {
    result = result.concat(rows[i]);
  }
  return result;
}

// Funzione buildGallery ora integrata nel caricamento progressivo
// Non più necessaria come funzione separata

// Funzione per mescolare casualmente un array (Fisher-Yates shuffle)
function shuffleArray(array) {
  const shuffled = [...array]; // Crea una copia dell'array
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Funzione per ottenere un'immagine casuale dall'array corrente
function getRandomImage() {
  const randomIndex = Math.floor(Math.random() * currentImageArray.length);
  return currentImageArray[randomIndex];
}

// Funzione per cambiare l'immagine nel modal con una casuale
function changeToRandomImage() {
  const modal = document.getElementById("modal");
  const img = modal.querySelector("img");
  if (img) {
    img.src = getRandomImage();
  }
}

// Event listener per i tasti freccia
function handleKeyPress(event) {
  const modal = document.getElementById("modal");
  // Controlla se il modal è visibile
  if (modal.style.display === "block") {
    // Freccia su, giù, sinistra o destra
    if (
      event.key === "ArrowUp" ||
      event.key === "ArrowDown" ||
      event.key === "ArrowLeft" ||
      event.key === "ArrowRight"
    ) {
      event.preventDefault(); // Previeni lo scroll della pagina
      changeToRandomImage();
    }
    // ESC per chiudere il modal
    if (event.key === "Escape") {
      hideModal();
    }
  }
}

/*
when I click on a pic, it should zoom to 100% viewport width over the other pics. the pic should not be higher than the viewport.*/
function displayModal(event) {
  var modal = document.getElementById("modal");
  modal.style.display = "block";
  modal.style.position = "fixed";
  modal.style.top = "50%";
  modal.style.left = "50%";
  modal.style.transform = "translate(-50%, -50%)";
  modal.style.width = "100%";
  modal.style.height = "100%";
  var img = document.createElement("img");
  img.src = event.target.src;
  img.style.width = "100%";
  img.style.height = "100%";
  img.style.objectFit = "contain";
  modal.appendChild(img);
  modal.addEventListener("click", hideModal);

  // Aggiungi event listener per i tasti freccia quando il modal è aperto
  document.addEventListener("keydown", handleKeyPress);
}

function hideModal(event) {
  var modal = document.getElementById("modal");
  modal.style.display = "none";
  modal.innerHTML = "";

  // Rimuovi event listener per i tasti freccia quando il modal si chiude
  document.removeEventListener("keydown", handleKeyPress);
}

// Avvia la creazione semplice della galleria
buildSimpleGallery();
