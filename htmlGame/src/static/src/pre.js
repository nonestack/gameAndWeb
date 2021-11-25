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

function createBlock(num){
    let block = new PIXI.Container();
    let tmpNum = new PIXI.Graphics();
    let rand = Math.ceil(Math.random()*10);
    tmpNum.beginFill(0xde3248);
    tmpNum.drawRect(rand, rand, rand, rand);
    tmpNum.endFill();

    const numStr = new PIXI.Text(num.toString());

    tmpNum.addChild(numStr);

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

    return app;
}
//app.stage.addChild(sprite);

function init_Unit(app) {
    myContainer = new PIXI.Container();
    //let sprite = PIXI.Sprite.from("./doge.jpg");

    const num1_b = new PIXI.Graphics();
    num1_b.beginFill(0xDE3249);
    num1_b.drawRect(50, 50, 100, 100);
    num1_b.endFill();

    num1_b.beginFill(0x112342);
    num1_b.drawRect(500, 50, 550, 100);
    num1_b.endFill();

    const num1 = new PIXI.Text("1");
    num1.x = 100;
    num1.y = 100;
    num1_b.addChild(num1);

    myContainer.addChild(num1_b);
    app.stage.addChild(myContainer);

    //console.log(myContainer);
    return myContainer;
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
    let myContainer = init_Unit(app);
    //init_Scene(app);
    //init_Unit(myContainer, app);
    animation(myContainer, app);
    console.log(myContainer);
}

main();