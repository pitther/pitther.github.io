class Core{
    constructor(){
        this.scaleFactor = .1;
        this.map = {};
        this.heightsMap = [];

        //this.colonistMap = new Map();
        this.colonistMap = [];
    }
    setMap(img){
        img.resize(parseInt(img.width * this.scaleFactor), parseInt(img.height * this.scaleFactor));
        this.map.image = img;
        this.map.width = img.width;
        this.map.height = img.height;
        console.log("Actual W,H: ",this.map.width, this.map.height);
    }
    startGeneration(cnt,r){
        for (let i = 0; i < cnt; i++){
            let colony = new Colony(color(random(255),random(255),random(255)));
            colony.spawnRandom(r);
        }
    }
    addColonist(x,y,colonist){
        this.colonistMap[x][y] = {colonist};
        //colonist.id = this.colonistArray.length - 1;
        //this.colonistMap.set(id,this.colonistArray[this.colonistArray.length-1]);
    }
    deleteColonist(x,y){
        this.colonistMap[x][y] = null;
        //this.colonistArray.splice(this.colonistMap.get(x+":"+y).id,1);
        //this.colonistMap.set(x+":"+y,false);
    }
    moveColonist(x0,y0,x1,y1){
        this.colonistMap[x1][y1] = this.colonistMap[x0][y0];
        this.colonistMap[x1][y1].colonist.x = x1;
        this.colonistMap[x1][y1].colonist.y = y1;
        this.deleteColonist(x0,y0);

        /*
        this.colonistMap.set(x1+":"+y1,this.colonistArray[this.colonistMap.get(x0+":"+y0).id]);
        this.colonistMap.get(x1+":"+y1).x = x1;
        this.colonistMap.get(x1+":"+y1).y = y1;
        this.colonistMap.delete(x0+":"+y0);
        */
    }
    tryMoveToPixel(x,y){
        let reply = {status: false}
        if (x < 0 || y < 0 || y > this.map.height-1 || x > this.map.width -1){
            reply.status = false;
        } else if (!this.heightsMap[x][y]) {
            reply.status = false;
        } else {
            if (!this.colonistMap[x][y]){
                reply.status = true;
            } else {
                reply.status = true;
                reply.colonist = this.colonistMap[x][y];
            }
        }
        return reply;
    }
    isFreePixel(x,y){
        if (x < 0 || y < 0 || y > this.map.height-1 || x > this.map.width -1){
            return false;
        } else if (!this.heightsMap[x][y]) {
            return false;
        } else if (this.colonistMap[x][y]){
            return false;
        } else {
            return true;
        }
    }
    createBitmap(){
        let img = createImage(this.map.width, this.map.height);
        img.set(0, 0, this.map.image);
        img.loadPixels();
        for (let i = 0; i < img.width; i++) {
            this.heightsMap.push([]);
            this.colonistMap.push([]);
            for (let j = 0; j < img.height; j++) {
                let g = img.get(i,j);
                if ( g[0]+g[1]+g[2] > 0 ){
                    this.heightsMap[i].push(1);
                } else {
                    this.heightsMap[i].push(0);
                }
                this.colonistMap[i].push(null);
            }
        }

    }
    renderMap(){
        //console.log("Render W,H",this.heightsMap[1].length,this.heightsMap.length);
        for (let i = 0; i < this.heightsMap.length; i++) {
            for (let j = 0; j < this.heightsMap[i].length; j++) {
                if ( this.heightsMap[i][j] ){
                    set( i,j,color(0,190,0,255) );
                } else {
                    set( i,j,color(0,0,200,255) );
                }
            }
        }
        updatePixels();

    }
    renderColonists(){
        for (let i = 0; i < this.colonistMap.length; i++){
            for (let j = 0; j < this.colonistMap[i].length; j++) {
                if (this.colonistMap[i][j]){
                    this.colonistMap[i][j].colonist.render();
                }

            }
        }

        updatePixels();
    }
    stepColonists(){
        for (let i = 0; i < this.colonistMap.length; i++){
            for (let j = 0; j < this.colonistMap[i].length; j++) {
                if (this.colonistMap[i][j]) {
                    this.colonistMap[i][j].colonist.step();
                }
            }
        }
    }
}


let CORE = new Core();