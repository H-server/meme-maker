//canvas
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d"); //붓
const lineWidth = document.querySelector("#line-width");
const lineColor = document.querySelector("#line-color");
canvas.width = 800;
canvas.height = 800;

let isPainting = false;

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
    ctx.beginPath();
}

function onChangeLineWidth(event){
    ctx.lineWidth = event.target.value; //그냥width는 안 됨.
}

function onChangeLineColor(event){
    ctx.strokeStyle = event.target.value;
    ctx.fillStyle = event.target.value;
}

canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", startPaint);
canvas.addEventListener("mouseup", stopPaint);
canvas.addEventListener("mouseout", stopPaint);

lineWidth.addEventListener("change", onChangeLineWidth);
lineColor.addEventListener("change", onChangeLineColor);
