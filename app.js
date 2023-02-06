//canvas
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d"); //붓
const lineWidth = document.querySelector("#line-width");
const lineColor = document.querySelector("#line-color");
const colorOption = Array.from(document.getElementsByClassName("color-option"));
const modeBtn = document.getElementById("mode-btn");
const destroyBtn = document.getElementById("destroy-btn");
const eraserBtn = document.getElementById("eraser-btn");
const fileInput = document.getElementById("file");
const text = document.getElementById("text");
const save = document.getElementById("save");
const shape = document.getElementById("shape");
canvas.width = 800;
canvas.height = 800;
ctx.width = lineWidth.value;
ctx.lineCap = "round";

let isPainting = false;
let isFill = false; 
let isShape = false;

function onMove(event){
    if(isPainting){
        ctx.lineTo(event.offsetX, event.offsetY);
        ctx.stroke();
        return; // lineTo는 이전 값을 기억해서 moveTo(기능) 동작한다! 그래서 바로 리턴가능!
    }
    ctx.moveTo(event.offsetX, event.offsetY); 
    //이전의 마우스 위치를 바탕으로 시작점 셋팅, 그래서 앞에 있어서는x 시작점과 끝점이 같으면 선 안 그어져!
}

function startPaint(){
    isPainting = true;
}

function stopPaint(){
    isPainting = false;
    if(isShape){
        ctx.fill();
    }
    ctx.beginPath();
}

function onChangeLineWidth(event){
    ctx.lineWidth = event.target.value; //그냥width는 안 됨.
}

function onChangeLineColor(event){
    ctx.strokeStyle = event.target.value;
    ctx.fillStyle = event.target.value;
}

function onColorClick(event){
    const currentColor = event.target.dataset.color;
    ctx.strokeStyle = currentColor;
    ctx.fillStyle = currentColor;
    lineColor.value = currentColor;
}

function onChangeMode(){
    if(isFill){
        isFill = false;
        modeBtn.innerText = "Fill"
    } else{
        isFill = true;
        modeBtn.innerText = "Draw"
    }
}

function onCanvasClick(){
    if(isFill){ctx.fillRect(0,0,800,800);}
}

function onDestroy(){
    ctx.fillStyle = "white";
    ctx.fillRect(0,0,800,800);
}

function onErase(){
    ctx.strokeStyle = "white";
    isFill = false;
     modeBtn.innerText = "Fill"
}

function onFileChange(event){
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    const image = new Image(); // html에서 태그 만드는 것과 비슷
    image.src = url;
    image.onload = function(){
        ctx.drawImage(image, 0, 0, 800, 800);
        fileInput.value = null;
    }
}

function onText(event){
    ctx.save();
    ctx.lineWidth = 1;
    ctx.font = "60px serif"; 
    const newText = text.value;
    ctx.fillText(newText, event.offsetX, event.offsetY);
    ctx.restore();
}

function onSave(event){
    const url = canvas.toDataURL();
    const a = document.createElement("a");
    a.href = url;
    a.download = "myDrawing.png"
    a.click();
}

function onShape(){
    if(isShape){
        isShape = false;
        shape.innerText = "shape";
    } else{
        isShape = true;
        shape.innerText = "pen";
    }
}

canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", startPaint);
canvas.addEventListener("mouseup", stopPaint);
canvas.addEventListener("mouseout", stopPaint);
canvas.addEventListener("click", onCanvasClick);
canvas.addEventListener("dblclick", onText);

lineWidth.addEventListener("change", onChangeLineWidth);
lineColor.addEventListener("change", onChangeLineColor);
colorOption.forEach((color)=>color.addEventListener("click", onColorClick));
modeBtn.addEventListener("click", onChangeMode);
destroyBtn.addEventListener("click", onDestroy);
eraserBtn.addEventListener("click", onErase);
fileInput.addEventListener("change", onFileChange);
save.addEventListener("click", onSave);
shape.addEventListener("click", onShape)

