const optionsCont = document.querySelector(".options-cont");
const toolsCont = document.querySelector(".tools-cont");
const pencil = document.querySelector(".pencil");
const eraser = document.querySelector(".eraser");
const pencilToolCont = document.querySelector(".pencil-tool-cont");
const eraserToolCont = document.querySelector(".eraser-tool-cont");
let optionsFlag = true;
let pencilFlag = true;
let erasorFlag = true;

optionsCont.addEventListener("click", (e) => {
  optionsFlag = !optionsFlag;
  if (optionsFlag) openTools();
  else closeTools();
});

function openTools() {
  const iconElem = optionsCont.children[0];
  iconElem.classList.remove("fa-times");
  iconElem.classList.add("fa-bars");
  toolsCont.style.display = "flex";
}

function closeTools() {
  const iconElem = optionsCont.children[0];
  iconElem.classList.remove("fa-bars");
  iconElem.classList.add("fa-times");
  toolsCont.style.display = "none";
  pencilToolCont.style.display = "none";
  eraserToolCont.style.display = "none";
}

pencil.addEventListener("click", function (e) {
  pencilFlag = !pencilFlag;
  if (pencilFlag) {
    pencilToolCont.style.display = "none";
  } else {
    pencilToolCont.style.display = "block";
  }
});

eraser.addEventListener("click", function (e) {
  erasorFlag = !erasorFlag;
  if (erasorFlag) {
    pencilToolCont.style.display = "none";
  } else {
    pencilToolCont.style.display = "flex";
  }
});
