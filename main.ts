type coordinate = { X: number, Y: number };

const GRID_SIZE: coordinate = { X: 5, Y: 4 }; // y does not include timer
const MAX_TIME: number = 10;

const gridPos: coordinate = { X: -1, Y: -1 };
const currentFoodPos: coordinate = { X: -1, Y: -1 };
let gameActive: boolean = true;
let changingX: boolean = true; // x = true, y = false
let score: number = 0;
let timer: number = 0;


const spawnFood = () => {
    currentFoodPos.X = Math.floor(Math.random() * GRID_SIZE.X);
    currentFoodPos.Y = Math.floor(Math.random() * GRID_SIZE.Y);

    if (currentFoodPos.X === gridPos.X && currentFoodPos.Y === gridPos.Y)
        spawnFood(); // using recusion on the first assignment!!
    else
        led.plotBrightness(currentFoodPos.X, currentFoodPos.Y, 120);
};

const updateLED = () => {
    led.plot(gridPos.X, gridPos.Y);

    if (gridPos.X === currentFoodPos.X && gridPos.Y === currentFoodPos.Y) {
        timer = 0;
        score++;
        spawnFood();
    }
};

const plotTimer = () => {
    const percentOn: number = timer / MAX_TIME;
    const ledsOn: number = GRID_SIZE.X * (1 - percentOn);

    for (let currX: number = GRID_SIZE.X; currX > 0; currX--)
        currX >= ledsOn
            ? led.unplot(currX - 1, GRID_SIZE.Y)
            : led.plot(currX - 1, GRID_SIZE.Y)
};

const startGame = () => {
    score = 0;
    timer = 0;
    gridPos.X = Math.floor(GRID_SIZE.X / 2);
    gridPos.Y = Math.floor(GRID_SIZE.Y / 2);
    gameActive = true;
    updateLED();
    spawnFood();
    plotTimer();
};

input.onButtonPressed(Button.A, () => {
    if (!gameActive) return;

    if (gridPos[changingX ? 'X' : 'Y'] > 0) {
        led.unplot(gridPos.X, gridPos.Y);
        gridPos[changingX ? 'X' : 'Y']--;
    }
    updateLED();
});

input.onButtonPressed(Button.B, () => {
    if (!gameActive) return;

    if (gridPos[changingX ? 'X' : 'Y'] < GRID_SIZE[changingX ? 'X' : 'Y'] - 1) {
        led.unplot(gridPos.X, gridPos.Y);
        gridPos[changingX ? 'X' : 'Y']++;
    }
    updateLED();
});

input.onLogoEvent(TouchButtonEvent.Pressed, () => {
    changingX = !changingX;
});

startGame();

loops.everyInterval(100, () => { // uses 100 instead of 1000 for higher precision timer
    if (!gameActive) return;
    timer += 0.1;

    if (timer >= MAX_TIME) {
        gameActive = false;
        basic.showIcon(IconNames.Sad, 1000);
        basic.showNumber(score);
    }
});

basic.forever(() => {
    if (!gameActive) return;
    plotTimer();
});