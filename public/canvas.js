const canvas = document.querySelector("canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const tool = canvas.getContext("2d");

const pencilWidthElem = document.querySelector(".pencil-width");
const erasorWidthElem = document.querySelector(".erasor-width");
const pencilColors = document.querySelectorAll(".pencil-color");
const eraser2 = document.querySelector(".eraser");
const download = document.querySelector(".download");
const redo = document.querySelector(".redo");
const undo = document.querySelector(".undo");

let pencilWidth = pencilWidthElem.value;
let erasorWidth = erasorWidthElem.value;
let pencilColor = "red";
let erasorColor = "white";

tool.strokeStyle = pencilColor;
tool.lineWidth = pencilWidth;

let bool = false;
let erasorFlag2 = true;

const undoRedoTracker = [];
let track = 0;

canvas.addEventListener("mousedown", function (e) {
  bool = true;
  const data = {
    x: e.clientX,
    y: e.clientY,
  };
  // beginPath(data);
  socket.emit("beginPath", data);
});

canvas.addEventListener("mousemove", function (e) {
  if (bool) {
    const data = {
      x: e.clientX,
      y: e.clientY,
    };
    // drawStroke(data);
    socket.emit("drawStroke", data);
  }
});

canvas.addEventListener("mouseup", function () {
  bool = false;
  const url = canvas.toDataURL();
  undoRedoTracker.push(url);
  track = undoRedoTracker.length - 1;
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

// undo & undo

undo.addEventListener("click", () => {
  console.log("undo click", undoRedoTracker);
  if (track === 0) return;
  track--;
  undoRedoCanvas({
    track,
    undoRedoTracker,
  });
});

redo.addEventListener("click", () => {
  if (track === undoRedoTracker.length - 1) return;
  track++;
  const trackerObj = {
    track,
    undoRedoTracker,
  };
  // undoRedoCanvas(trackerObj);
  socket.emit("redoUndo", trackerObj);
});

const undoRedoCanvas = (trackerObj) => {
  const { track, undoRedoTracker } = trackerObj;
  const img = new Image();
  img.src = undoRedoTracker[track];
  console.log("undoRedoTracker", undoRedoTracker);
  console.log("tarck", track);
  img.onload = () => {
    tool.drawImage(img, 0, 0, canvas.width, canvas.height);
  };
};

socket.on("beginPath", (data) => {
  // data -> data from server
  beginPath(data);
});
socket.on("drawStroke", (data) => {
  drawStroke(data);
});
socket.on("redoUndo", (data) => {
  undoRedoCanvas(data);
});
