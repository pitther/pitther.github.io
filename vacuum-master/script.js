const W = 300;
const H = 300;
const ROWS = 5;
const CONS = 5;

const SIMIterations = 100;

let SIM = new Simulation(W,H,ROWS,CONS, "p");

let settings = {
  grid: true,
  stop: false,
  fps: 120,
  trace: true
}

window.onload  =  function(){
  document.getElementById("settings-grid").checked = settings.grid;

  document.getElementById("settings-trace").checked = settings.trace;
}


function setup() {
    let canvas = createCanvas(W, H);
    canvas.parent('canvas-container');
    frameRate(settings.fps);
}



function draw() {
  if (!settings.stop){
    for (let i = 0; i < 1; i++){
      background(255);
      SIM.iteration();
      if (settings.grid)
        SIM.drawGrid();
      SIM.drawElements();
      frameRate(settings.fps);
    }
  }
}

function settings_set(id){
  if (id==1){
    settings.grid = document.getElementById("settings-grid").checked;
  } else if (id=='start'){
    settings.stop = !settings.stop;
    console.log(settings.stop)
  } else if (id=='fps'){
    settings.fps = parseInt(document.getElementById('rangeSuccess').innerHTML);
  } else if (id=='trace'){
    settings.trace = document.getElementById("settings-trace").checked;
  } else if (id=='p'){
    SIM = new Simulation(W,H,ROWS,CONS, "p");
  } else if (id=='pp'){
    SIM = new Simulation(W,H,ROWS,CONS, "pp");
  } else if (id=='fr'){
    SIM = new Simulation(W,H,ROWS,CONS, "fr");
  } else if (id=='s'){
    SIM = new Simulation(W,H,ROWS,CONS, "s");
  }
}
