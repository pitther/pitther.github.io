class Simulation {
  constructor(W,H,ROWS,CONS,TYPE) {
    this.statistics = {
      sumEated: 0,
      sumJunk: 0,
      avgEated: 0,
      avgJunk: 0
    }
    this.SIMcount = 0;
    this.iterCount = 0;
    this.robot = new Robot();
    this.W = W;
    this.H = H;
    this.ROWS = ROWS;
    this.CONS = CONS;
    this.field = [];
    this.TYPE = TYPE;
    this.createField();
    console.log(this.field);

    setTimeout(function(){
      if (this.TYPE === 'p'){
        document.getElementById("curr-alg").innerHTML = "P algorytm";
      } else if (this.TYPE == 'pp'){
        document.getElementById("curr-alg").innerHTML = "RandomPointer algorytm";
      } else if (this.TYPE == 'fr'){
        document.getElementById("curr-alg").innerHTML = "FullRandom algorytm";
      } else if (this.TYPE == 's'){
        document.getElementById("curr-alg").innerHTML = "Square algorytm";
      }

      document.getElementById("prev-iter-num").innerHTML = "Previous simulation (№0)";
      document.getElementById("prev-robot-score").innerHTML = 0;
      document.getElementById("prev-junk-left").innerHTML = 0;

      document.getElementById("avg-iter-num").innerHTML = "Average of 0 simulations";
      document.getElementById("avg-robot-score").innerHTML = 0;
      document.getElementById("avg-junk-left").innerHTML = 0;
    }.bind(this),100);



  }
  createField(){
    this.field = [];
    for (let i = 0; i < this.ROWS; i++) {
      let buff = [];
      for (let j = 0; j < this.CONS; j++){
        buff.push(0);
      }
      this.field[i] = buff;
    }
    this.addRobot();
  }
  onEndSim(){
    this.iterCount = 0;
    this.SIMcount++;
    this.statistics.sumJunk += this.calculateJunkCount();
    this.statistics.sumEated += this.robot.score;

    this.statistics.avgJunk = this.statistics.sumJunk/this.SIMcount;
    this.statistics.avgEated = this.statistics.sumEated/this.SIMcount;

    document.getElementById("prev-iter-num").innerHTML = "Previous simulation (№"+(this.SIMcount-1)+")";
    document.getElementById("prev-robot-score").innerHTML = this.robot.score;
    document.getElementById("prev-junk-left").innerHTML = this.calculateJunkCount();

    document.getElementById("avg-iter-num").innerHTML = "Average of "+(this.SIMcount-1)+" simulations";
    document.getElementById("avg-robot-score").innerHTML = this.statistics.avgEated.toFixed(2);
    document.getElementById("avg-junk-left").innerHTML = this.statistics.avgJunk.toFixed(2);


    console.log(this.SIMcount+". Robot eated:",this.robot.score, "Junk:", this.calculateJunkCount(),"AVG (",this.statistics.avgEated.toFixed(2),",",this.statistics.avgJunk.toFixed(2),")");
  }
  addRobot(){
    let x = Math.floor(Math.random() * (this.ROWS));
    let y = Math.floor(Math.random() * (this.CONS));
    this.robot = new Robot(x,y,this.TYPE);
    this.field[x][y] = 2;
  }
  checkFullField(){
    for (let i = 0; i < this.ROWS; i++) {
      for (let j = 0; j < this.CONS; j++){
        if (this.field[i][j] === 0){ return false; }
      }
    }
    return true;
  }
  addJunk(){
      let x = Math.floor(Math.random() * (this.ROWS));
      let y = Math.floor(Math.random() * (this.CONS));
      if (this.field[x][y] == 0){
        this.field[x][y] = 1;
      } else {
        this.addJunk();
      }
  }
  iteration(){
    this.iterCount++;
    document.getElementById("curr-iter-num").innerHTML = "Current simulation (№"+this.SIMcount+", "+this.iterCount+")";
    document.getElementById("curr-robot-score").innerHTML = this.robot.score;
    document.getElementById("curr-junk-left").innerHTML = this.calculateJunkCount();
    if (!this.checkFullField() && Math.random() < .5){
      this.addJunk();
    }
    let res = this.robot.iteration(this.field);

    if (settings.trace)
      this.drawVector(res.x1,res.y1,res.x2,res.y2);

    if (this.iterCount === SIMIterations){

      this.onEndSim();
      this.createField();
    }
  }
  drawVector(x1,y1,x2,y2){
    stroke(150);
    let p1 = this.calculateCenter(x1,y1),
        p2 = this.calculateCenter(x2,y2);
    line(p1.x,p1.y,p2.x,p2.y);
    stroke(70);
    noStroke();
    fill('rgba(50,50,50,0.3)');
    ellipse(p1.x,p1.y,30);
    stroke(0);
  }
  drawGrid(){
    let cellW = this.W/this.ROWS;
    let cellH = this.H/this.CONS;
    for (let i = 0; i < this.ROWS+1; i++) {
      line(cellW*i, 0, cellW*i,this.H);
    }
    for (let j = 0; j < this.CONS+1; j++){
      line(0, cellH*j, this.W,cellH*j);
    }

  }
  drawElements(){
    for (let i = 0; i < this.ROWS; i++) {
      for (let j = 0; j < this.CONS; j++){
        let center = this.calculateCenter(i,j);
        if (this.field[i][j] === 1){
          this.drawJunk(center.x, center.y, 30);
        } else if (this.field[i][j] === 2){
          this.drawRobot(center.x, center.y, 30);
        }
      }
    }
  }
  drawJunk(x,y,d){
    noStroke();
    fill('rgb(100%,0%,10%)');
    rect(x-d/2,y-d/2,d,d);
    stroke(0);
  }
  drawRobot(x,y,d){
    noStroke();
    fill('rgb(0,255,0)');
    ellipse(x,y,d);
    stroke(0);
  }
  calculateJunkCount(){
    let count = 0;
    for (let i = 0; i < this.ROWS; i++) {
      for (let j = 0; j < this.CONS; j++){
        if (this.field[i][j] === 1){
            count++;
        }
      }
    }
    return count;
  }
  calculateCenter(i,j){
    let cellW = this.W/this.ROWS;
    let cellH = this.H/this.CONS;
    let obj = {x: 0,y:0};
    obj.x = cellW*i+cellW/2;
    obj.y = cellH*j+cellH/2;

    return obj;
  }
}
