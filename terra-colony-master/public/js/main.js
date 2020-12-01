let img;

function preload(){
    img = loadImage('data/worldMap.png');
}

function setup(){
    CORE.setMap(img);
    createCanvas(CORE.map.width, CORE.map.height);
    image(CORE.map.image, 0, 0, CORE.map.width, CORE.map.height);
    frameRate(FPS_LOCK);
    CORE.createBitmap();

    CORE.startGeneration(COLONY_COUNT,SPAWN_RADIUS);


}

function draw(){
    CORE.renderMap();
    CORE.stepColonists();
    CORE.renderColonists();
    //image(CORE.map.image, 0, 0, CORE.map.width, CORE.map.height);

}