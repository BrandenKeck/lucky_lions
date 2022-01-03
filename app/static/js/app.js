// Global Canvas and Context
let canvas = document.getElementById('app_ani');
let ctx = canvas.getContext('2d');

function app_animation(){

  // Start Animation on Image Load
  let positions = [
      {'x': 10, 'y': 10, 'o': 0},
      {'x': 1000, 'y': 600, 'o': -2.0},
      {'x': 500, 'y': 50, 'o': -4.0},
      {'x': 220, 'y': 800, 'o': -0.5},
      {'x': 1400, 'y': 120, 'o': -1.5}
    ]
    render_ani(positions);

}

function render_ani(positions){

  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Recalculate image sizes
  wiw = window.innerWidth;
  wih = window.innerHeight;
  canvas.width = wiw;
  canvas.height = wih;

  // Draw Animations
  for(var i = 0; i < positions.length; i++) {
    xx = positions[i].x;
    yy = positions[i].y;
    if(positions[i].o < 0){op = 0;}
    else{op = Math.sin(positions[i].o);}
    if(op < 0){op = 0;}
    ctx.globalAlpha = op;

    const radius = 10;
    ctx.beginPath();
    ctx.arc(xx, yy, radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = 'green';
    ctx.fill();
    ctx.stroke();

    positions[i].o += 0.02 + 0.02*Math.random();
    if(positions[i].o > 2*Math.PI){
      positions[i].o = 0;
    }

  }


  // Something here
  setTimeout(function(){render_ani(positions);}, 100);

}

$(document).ready(function(){
  app_animation();
});
