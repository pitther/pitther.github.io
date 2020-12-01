class Robot {
  constructor(x, y, TYPE) {
      this.x = x;
      this.y = y;
      this.score = 0;
      this.iterCount = 0;
      this.type = TYPE;
  }
  iteration(field){
    field[this.x][this.y] = 0;
    let prevPosX = this.x,
        prevPosY = this.y;

    if (this.type === 'p'){
      this.algorytmRoute(field);
    } else if (this.type === 'pp'){
      this.algorytmPointed(field);
    } else if (this.type === 'fr'){
      this.algorytmRandom(field);
    } else if (this.type === 's'){
      this.algorytmRoute2(field);
    }

    if (field[this.x][this.y] == 1){
      this.score++;
    }
    field[this.x][this.y] = 2;
    this.iterCount++;
    return {x1: prevPosX,y1:prevPosY,x2: this.x,y2:this.y}
  }
  checkMove(t_,step){
    if (t_ === 0){
        if (this.y != 0){
            if (step){this.moveTop();}
            return true;
        } else {
            return false;
        }
    } else if (t_ === 1){
      if (this.x != ROWS - 1){
          if (step){this.moveRight();}
          return true;
      } else {
          return false;
      }
    } else if (t_ === 2){
      if (this.y != CONS - 1){
          if (step){this.moveBottom();}
          return true;
      } else {
          return false;
      }
    } else if (t_ === 3){
      if (this.x != 0){
          if (step){this.moveLeft();}
          return true;
      } else {
          return false;
      }
    } else {
      return false;
    }
  }
  algorytmRoute2(field){
    const P = {"U":0, "R":1, "D":2, "L":3};
    Object.freeze(P)


    let routeMap = [
      [P.R, P.R, P.R, P.R, P.D],
      [P.U, P.U, P.U, P.U, P.D],
      [P.U, P.R, P.U, P.L, P.D],
      [P.U, P.U, P.U, P.U, P.D],
      [P.U, P.L, P.L, P.L, P.L],
    ];

    if (this.checkMove(0,false) && field[this.x][this.y-1] === 1){
      this.checkMove(0,true);
    } else if (this.checkMove(1,false) && field[this.x+1][this.y] === 1){
      this.checkMove(1,true);
    } else if (this.checkMove(2,false) && field[this.x][this.y+1] === 1){
      this.checkMove(2,true);
    } else if (this.checkMove(3,false) && field[this.x-1][this.y] === 1){
      this.checkMove(3,true);
    } else {
      this.checkMove(routeMap[this.y][this.x],true);
    }
  }
  algorytmRoute(field){
    const P = {"U":0, "R":1, "D":2, "L":3};
    Object.freeze(P)

    let routeMap = [
      [P.R, P.D, P.L, P.L, P.L],
      [P.R, P.D, P.L, P.U, P.L],
      [P.R, P.D, P.L, P.U, P.L],
      [P.R, P.D, P.L, P.U, P.L],
      [P.R, P.R, P.R, P.U, P.L],
    ];

    if (this.checkMove(0,false) && field[this.x][this.y-1] === 1){
      this.checkMove(0,true);
    } else if (this.checkMove(1,false) && field[this.x+1][this.y] === 1){
      this.checkMove(1,true);
    } else if (this.checkMove(2,false) && field[this.x][this.y+1] === 1){
      this.checkMove(2,true);
    } else if (this.checkMove(3,false) && field[this.x-1][this.y] === 1){
      this.checkMove(3,true);
    } else {
      this.checkMove(routeMap[this.y][this.x],true);
    }
  }
  algorytmRandom(field){
    let rand = Math.floor(Math.random() * (4));
    if (!this.checkMove(rand,true)){
      this.iteration(field);
    }
  }
  algorytmPointed(field){
    if (this.checkMove(0,false) && field[this.x][this.y-1] === 1){
      this.checkMove(0,true);
    } else if (this.checkMove(1,false) && field[this.x+1][this.y] === 1){
      this.checkMove(1,true);
    } else if (this.checkMove(2,false) && field[this.x][this.y+1] === 1){
      this.checkMove(2,true);
    } else if (this.checkMove(3,false) && field[this.x-1][this.y] === 1){
      this.checkMove(3,true);
    } else {
      this.algorytmRandom(field);
    }
  }
  moveLeft(){
      this.x -= 1;
  }
  moveRight(){
      this.x += 1;
  }
  moveTop(){
      this.y -= 1;
  }
  moveBottom(){
      this.y += 1;
  }

}
