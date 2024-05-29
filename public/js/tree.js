const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 600;

ctx.translate(canvas.width / 2, canvas.height);
ctx.scale(1, -1);

drawBranch([0, 0], 70, 100, 90);

function drawBranch(v0, thickness, length, dir) {
  if (length < 5 && Math.random() < 0.5) {
    return;
  }

  if (thickness < 5) {
    ctx.beginPath();
    ctx.arc(...v0, 2, 0, 2 * Math.PI);
    ctx.fillStyle = Math.random() > 0.1 ? "white" : "red";
    ctx.fill();
    return;
  }

  ctx.beginPath();
  ctx.moveTo(...v0);
  const v1 = [
    v0[0] + length * Math.cos((dir * Math.PI) / 180),
    v0[1] + length * Math.sin((dir * Math.PI) / 180),
  ];
  ctx.lineTo(...v1);
  ctx.strokeStyle = "#333";
  ctx.lineCap = "round";
  ctx.lineWidth = thickness;
  ctx.stroke();

  drawBranch(v1, thickness * 0.8, length * 0.8, dir + Math.random() * 30);
  drawBranch(v1, thickness * 0.8, length * 0.8, dir - Math.random() * 30);
}
