//const num0 = new PIXI.Container();
//const num2 = new PIXI.Container();
//const num4 = new PIXI.Container();
//const num8 = new PIXI.Container();
//const num16 = new PIXI.Container();
//const num32 = new PIXI.Container();
//const num64 = new PIXI.Container();
//const num128 = new PIXI.Container();
//const num256 = new PIXI.Container();
//const num512 = new PIXI.Container();
//const num1024 = new PIXI.Container();
//const num2048 = new PIXI.Container();

//let blockPosition = new Array(16);
let blockPosition = [
    [17, 17], 
]

function createBlock(){
    let block = new PIXI.Container();
    let tmpNum = PIXI.Sprite.from("./image/block_2.png");
    //let rand = Math.ceil(Math.random()*10);
    //begin(17, 17)
    //midst 17
    //block 135 - 35 = 100
    tmpNum.x = 17;
    tmpNum.y = 135;

    block.addChild(tmpNum);
    return block;
}

function keyboard(keyCode) {
    let key = {};
    key.code = keyCode;
    key.isDown = false;
    key.isUp = true;
    key.press = undefined;
    key.release = undefined;
    //The `downHandler`
    key.downHandler = event => {
        if (event.keyCode === key.code) {
            if (key.isUp && key.press) key.press();
            key.isDown = true;
            key.isUp = false;
        }
        event.preventDefault();
    };
    //The `upHandler`
    key.upHandler = event => {
        if (event.keyCode === key.code) {
            if (key.isDown && key.release) key.release();
            key.isDown = false;
            key.isUp = true;
        }
        event.preventDefault();
    };
    //Attach event listeners
    window.addEventListener(
        "keydown", key.downHandler.bind(key), false
    );
    window.addEventListener(
        "keyup", key.upHandler.bind(key), false
    );
    return key;
}

function init_Scene() {
    //let app = new PIXI.Application({ width: 1200, height: 900 });
    let app = new PIXI.Application();
    app.renderer.backgroundColor = 0x1099bb;
    document.body.appendChild(app.view);
    //console.log(app);

    //canvas布满整个brower
    app.renderer.view.style.position = "absolute";
    app.renderer.view.style.display = "block";
    app.renderer.autoResize = true;
    app.renderer.resize(window.innerWidth, window.innerHeight);

    //init game scene
    let gameScene = new PIXI.Container();
    let background = PIXI.Sprite.from("./image/background.png");

    gameScene.addChild(background);

    //gameScene.x = app.screen.width / 2 - gameScene.width / 2;
    //gameScene.y = app.screen.height / 2 - gameScene.height / 2;
    gameScene.x = app.screen.width / 2;
    gameScene.y = app.screen.height / 2;

    gameScene.pivot.x = gameScene.width / 2;
    gameScene.pivot.y = gameScene.height / 2;

    //console.log(app.screen.width);
    //console.log(app.screen.height);
    //console.log(gameScene.width);
    //console.log(gameScene.height);

    
    //let blockArr = new Array(16);


    app.stage.addChild(gameScene);

    gameScene.addChild(createBlock());


    return app;
}
//app.stage.addChild(sprite);

function init_Unit(app) {

}

function moveFunc(delta, vx, vy){
    myContainer.vx = vx;
    myContainer.vy = vy;

    myContainer.x += myContainer.vx;
    myContainer.y += myContainer.vy;
}

function animation(myContainer, app) {
    let keyUp = keyboard(38);
    let keyDown = keyboard(40);
    let keyRight = keyboard(39);
    let keyLeft = keyboard(37);
    //let elapse = 0.0;

    keyUp.press = () => {
        //myContainer.y -= 10.0;
        app.ticker.add(delta => moveFunc(delta, 0, -1));
    };
    keyDown.press = () => {
        //myContainer.y += 10.0;
        app.ticker.add(delta => moveFunc(delta, 0, 1));
    };
    keyRight.press = () => {
        //myContainer.x += 10.0;
        app.ticker.add(delta => moveFunc(delta, 1, 0));
    };
    keyLeft.press = () => {
        //myContainer.x -= 10.0;
        app.ticker.add(delta => moveFunc(delta, -1, 0));
    };

    //app.ticker.add((delta) => {
    //  //console.log(delta);
    //  elapse += delta;

    //  myContainer.x = 100.0 + Math.cos(elapse / 50.0) * 100.0;
    //});
}



function main() {
    let app = init_Scene();
    //let myContainer = init_Unit(app);
    //init_Scene(app);
    //init_Unit(myContainer, app);
    //animation(myContainer, app);
    //console.log(myContainer);
}

main();