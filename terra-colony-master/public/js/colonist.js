

class Colonist{
    constructor(colonyId,clr,x,y,strength,ill) {
        this.startStrength = strength;
        this.aliveColor = clr;
        this.colonyId = colonyId;
        this.x = x;
        this.y = y;
        this.age = 0;
        this.reproduction = 0;
        this.alive = true;
        this.ill = ill;
        this.strength = strength;

        if (random(1) < ILLNESS_CHANCE){
            this.ill = 1;
        }
    }
    randomMove(){
        let mov = Math.floor(random(4));
        if (mov === 0){
            this.tryMove(this.x+1,this.y);
        } else if (mov === 1){
            this.tryMove(this.x-1,this.y);
        } else if (mov === 2){
            this.tryMove(this.x,this.y+1);
        } else if (mov === 3){
            this.tryMove(this.x,this.y-1);
        }
    }
    tryMove(x,y){
        let rep =  CORE.tryMoveToPixel(x,y);
        if ( rep.status ){
            if (rep.colonist){
                if (this.ill || rep.colonist.ill){
                    if (random (1) < INFECTION_CHANCE){
                        this.ill = 1;
                        rep.colonist.ill = 1;
                    }
                }
                if (!rep.colonist.alive){

                    CORE.deleteColonist(x,y);
                    CORE.moveColonist(this.x, this.y, x, y);
                } else if (rep.colonist.colonyId !== this.colonyId){
                    if (rep.colonist.strength >= this.strength){
                        this.alive = false;
                    } else {
                        CORE.deleteColonist(x,y);
                        CORE.moveColonist(this.x, this.y, x, y);
                    }
                }
                this.strength += rep.colonist.strength/10;
            } else {
                //this.strength -= 1;
                CORE.moveColonist(this.x, this.y, x, y);
            }
        }
    }
    tryMakeKid(x,y){
        if ( CORE.isFreePixel(x,y) ){
            let newStrength = this.startStrength + random(-SMALL_STRENGTH_SHIFT,SMALL_STRENGTH_SHIFT);
            if (random(1) < CHANCE_GREAT_GEN){
                newStrength = this.startStrength + random(-BIG_STRENGTH_SHIFT,BIG_STRENGTH_SHIFT);
            }
            CORE.addColonist(x,y,new Colonist(this.colonyId,this.aliveColor,x,y,newStrength,this.ill));
        }
    }
    makeKid(){
        let mov = Math.floor(random(4));
        if (mov === 0){
            this.tryMakeKid(this.x+1,this.y);
        } else if (mov === 1){
            this.tryMakeKid(this.x-1,this.y);
        } else if (mov === 2){
            this.tryMakeKid(this.x,this.y+1);
        } else if (mov === 3){
            this.tryMakeKid(this.x,this.y-1);
        }

    }
    step(){
        this.age++;
        this.reproduction++;
        this.age += this.ill;

        if (this.strength < this.age) {
            this.alive = false;
        }

        if (this.alive){
            if (this.reproduction > BORN_TRESHOLD){
                this.makeKid();
                this.reproduction = 0;
            } else {
                this.randomMove();
            }
        } else {
            //CORE.deleteColonist(this.x,this.y);

        }
    }
    render(){
        let renderColor;
        if (this.alive){
            renderColor = this.aliveColor;
        } else {
            renderColor = color(0);
        }
        set(this.x,this.y,renderColor);

    }

}