// Global Canvas and Context
let canvas = document.getElementById('animation_canvas');
let ctx = canvas.getContext('2d');

function bubbles_animation(){

  // Start Animation on Image Load
    bubbles = init_bubbles();
    render_ani(bubbles);

}

function render_ani(bubbles){

  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Recalculate image sizes
  wiw = window.innerWidth;
  wih = window.innerHeight;
  canvas.width = wiw;
  canvas.height = wih;

  // Draw Animations
  for(var i = 0; i < bubbles.length; i++) {

    // Get Dimensions
    xx = bubbles[i].x;
    yy = bubbles[i].y;
    rr = bubbles[i].r;
    oo = bubbles[i].o;

    // Update y-coordinate
    bubbles[i].y -= 0.001;
    if(bubbles[i].y < -0.05){
      bubbles[i].x = Math.random();
      bubbles[i].y = 1 + 0.1*Math.random();
      bubbles[i].r = 4*Math.random() + 1;
      bubbles[i].o = 0;
    }

    // Update opacity
    bubbles[i].o += 0.05 + 0.02*Math.random();
    if(bubbles[i].o > 2*Math.PI){
      bubbles[i].o = 0;
    }

    // Check if quadrant exists
    is_q = $.grep(get_quadrants(), function(obj) { return obj.id == bubbles[i].qid; });
    if(is_q.length === 1){

      // Calculate opacity
      if(bubbles[i].o < 0){op = 0;}
      else{op = Math.sin(bubbles[i].o);}
      if(op < 0){op = 0;}
      ctx.globalAlpha = op;

      // Calculate x and y positions:
      draw_x = is_q[0].x + xx*is_q[0].w;
      draw_y = yy*is_q[0].h;

      // Draw bubble
      ctx.beginPath();
      ctx.arc(draw_x, draw_y, rr, 0, 2 * Math.PI, false);
      // ctx.fillStyle = '#008000';
      ctx.fillStyle = '#00FF31';
      ctx.fill();
      ctx.lineWidth = 2;
      ctx.strokeStyle = "#00FF31";
      ctx.stroke();

    }

  }

  // Draw grdient layer
  gradient = ctx.createLinearGradient(0, 0, 0, wih);
  gradient.addColorStop(0, "rgba(0, 128, 0, 0)");
  gradient.addColorStop(1, "rgba(0, 128, 0, 0.25)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, wiw, wih);

  // Animation Loop
  setTimeout(function(){render_ani(bubbles);}, 100);

}

// Set up a function to calculate positioning
function get_quadrants(){

  // Get window dimensions
  let wiw = window.innerWidth;
  let wih = window.innerHeight;

  // Define number of screen partitions
  let num_quadrants = 10;
  if(wiw < 1400){num_quadrants = 8;}
  if(wiw < 1000){num_quadrants = 6;}
  if(wiw < 800){num_quadrants = 4;}

  // Calculate partition dimentions
  let quadrants = [];
  for(var i = 0; i < num_quadrants; i++) {
    quadrants.push({
      id: i,
      x: i*wiw / num_quadrants,
      w: wiw / num_quadrants,
      h: wih
    });
  }

  // Return
  return quadrants;

}

// Initiate array of bubbles for the animation
function init_bubbles(){

  bpq = 12;
  max_quadrants = 10;
  bubbles = []
  for(var i = 0; i < max_quadrants; i++) {
    for(var j = 0; j < bpq; j++) {
      bubbles.push({
        qid: i,
        x: Math.random(),
        y: Math.random(),
        r: 4*Math.random() + 1,
        o: -4*Math.random(),
      });
    }
  }
  return bubbles;

}

// Initiate Animations
$(document).ready(function(){
  bubbles_animation();
});
