// Global Canvas and Context
let canvas = document.getElementById('roadmap_ani');
let ctx = canvas.getContext('2d');

function create_roadmap(){

  // create an array with nodes
  var nodes = new vis.DataSet([
    { id: 1, label: "Node 1" },
    { id: 2, label: "Node 2" },
    { id: 3, label: "Node 3" },
    { id: 4, label: "Node 4" },
    { id: 5, label: "Node 5" },
  ]);

  // create an array with edges
  var edges = new vis.DataSet([
    { from: 1, to: 3 },
    { from: 1, to: 2 },
    { from: 2, to: 4 },
    { from: 2, to: 5 },
    { from: 3, to: 3 },
  ]);

  // create a network
  var container = document.getElementById("roadmap");
  var data = {
    nodes: nodes,
    edges: edges,
  };
  var options = {};
  var network = new vis.Network(container, data, options);
}

function roadmap_animation(){

  // Start Animation on Image Load
    positions = [
      {'x': 10, 'y': 10, 'o': 0},
      {'x': 1000, 'y': 600, 'o': -2.0},
      {'x': 500, 'y': 50, 'o': -4.0},
      {'x': 220, 'y': 800, 'o': -0.5},
      {'x': 1400, 'y': 120, 'o': -1.5}
    ]
    render_ani(positions);

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

    const radius = 10;
    context.beginPath();
    context.arc(xx, yy, radius, 0, 2 * Math.PI, false);
    context.fillStyle = 'green';
    context.fill();
    context.stroke();

    positions[i].o += 0.02 + 0.02*Math.random();
    if(positions[i].o > 2*Math.PI){
      positions[i].o = 0;
    }

  }


  // Something here
  setTimeout(function(){render_ani(img, positions);}, 100);

}

window.onload = function(){
  create_roadmap();
  roadmap_animation();
}
