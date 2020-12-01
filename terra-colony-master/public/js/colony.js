class Colony{
    constructor(clr){
        this.color = clr;
        this.colonyId = guid();
    }
    spawnRandom(r){
        let x,y;
        do {
            x = Math.floor(random(CORE.map.width));
            y = Math.floor(random(CORE.map.height));
        } while( !CORE.isFreePixel(x,y) );


        for (let i = x-r; i < x+r; i += 2){
            for (let j = y-r; j < y+r; j += 2){
                if (CORE.isFreePixel(i,j)){
                    CORE.addColonist(i,j,new Colonist(this.colonyId,this.color,i,j,DEFAULT_STRENGHT,0));
                }
            }
        }
    }
}

function guid() {
    var result, i, j;
    result = '';
    for(j=0; j<32; j++) {
        if( j == 8 || j == 12 || j == 16 || j == 20)
            result = result + '-';
        i = Math.floor(Math.random()*16).toString(16).toUpperCase();
        result = result + i;
    }
    return result;
}