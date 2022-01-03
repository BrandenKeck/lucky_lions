// Global Canvas and Context
let canvas = document.getElementById('index_ani');
let ctx = canvas.getContext('2d');

function index_animation(){

  // Start Animation on Image Load
  let eyes_img = new Image();
  eyes_img.src = "static/img/eyes.png";
  eyes_img.onload = function(){
    positions = [
      {'x': 10, 'y': 10, 'o': 0},
      {'x': 1000, 'y': 600, 'o': -2.0},
      {'x': 500, 'y': 50, 'o': -4.0},
      {'x': 220, 'y': 800, 'o': -0.5},
      {'x': 1400, 'y': 120, 'o': -1.5}
    ]
    render_ani(eyes_img, positions);
  }

}

function render_ani(img, positions){

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
    ctx.drawImage(img, 0, 0, 200, 50, xx, yy, 100, 25);

    positions[i].o += 0.02 + 0.02*Math.random();
    if(positions[i].o > 2*Math.PI){
      positions[i].o = 0;
    }

  }


  // Something here
  setTimeout(function(){render_ani(img, positions);}, 100);

}

$(document).ready(function(){
  index_animation();
});
