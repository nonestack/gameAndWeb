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
    console.log(app);

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

    const num1 = new PIXI.Text("1");
    //num1.x = num1_b.width / 2;
    //num1.y = num1_b.height / 2;
    num1.x = 100;
    num1.y = 100;

    console.log(num1_b.width);
    console.log(num1_b.height);

    num1_b.addChild(num1);


    myContainer.addChild(num1_b);
    app.stage.addChild(myContainer);

    console.log(myContainer);
    return myContainer;
}

function animation(myContainer, app) {
    let keyUp = keyboard(38);
    let keyDown = keyboard(40);
    let keyRight = keyboard(39);
    let keyLeft = keyboard(37);
    //let elapse = 0.0;

    keyUp.press = () => {
        myContainer.y += 10.0;
    };
    keyDown.press = () => {
        myContainer.y -= 10.0;
    };
    keyRight.press = () => {
        myContainer.x += 10.0;
    };
    keyLeft.press = () => {
        myContainer.x -= 10.0;
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
}

main();