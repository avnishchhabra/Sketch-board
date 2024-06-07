const canvas = document.querySelector("canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const tool = canvas.getContext("2d");

const pencilWidthElem = document.querySelector(".pencil-width");
const erasorWidthElem = document.querySelector(".erasor-width");
const pencilColors = document.querySelectorAll(".pencil-color");
const eraser2 = document.querySelector(".eraser");
const download = document.querySelector(".download");

let pencilWidth = pencilWidthElem.value;
let erasorWidth = erasorWidthElem.value;
let pencilColor = "red";
let erasorColor = "white";

tool.strokeStyle = pencilColor;
tool.lineWidth = pencilWidth;

let bool = false;
let erasorFlag2 = true;

canvas.addEventListener("mousedown", function (e) {
  bool = true;
  beginPath({
    x: e.clientX,
    y: e.clientY,
  });
});

canvas.addEventListener("mousemove", function (e) {
  if (bool) {
    drawStroke({
      x: e.clientX,
      y: e.clientY,
    });
  }
});

canvas.addEventListener("mouseup", function () {
  bool = false;
});

function beginPath(strokeObj) {
  tool.beginPath();
  tool.moveTo(strokeObj.x, strokeObj.y);
}

function drawStroke(strokeObj) {
  tool.lineTo(strokeObj.x, strokeObj.y);
  tool.stroke();
}

pencilColors.forEach((colorElem) => {
  colorElem.addEventListener("click", function () {
    const color = colorElem.classList[0];
    pencilColor = color;
    tool.strokeStyle = color;
  });
});

pencilWidthElem.addEventListener("change", function (e) {
  console.log("e", e.target.value);
  pencilWidth = e.target.value;
  tool.lineWidth = pencilWidth;
});

erasorWidthElem.addEventListener("change", function (e) {
  console.log("e", e.target.value);
  erasorWidth = e.target.value;
  tool.lineWidth = erasorWidth;
});

eraser2.addEventListener("click", () => {
  if (erasorFlag2) {
    tool.strokeStyle = "white";
    tool.lineWidth = erasorWidth;
    erasorFlag2 = false;
  } else {
    erasorFlag2 = true;
    tool.strokeStyle = pencilColor;
    tool.lineWidth = pencilWidth;
  }
});

download.addEventListener("click", () => {
  const url = canvas.toDataURL();
  const a = document.createElement("a");
  a.href = url;
  a.download = "board.jpg";
  a.click();
});
