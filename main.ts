type coordinate = { X: number, Y: number };

const GRID_SIZE: coordinate = { X: 5, Y: 4 };

const gridPos: coordinate = { X: -1, Y: -1 };
const currentFoodPos: coordinate = { X: -1, Y: -1 };
let gameActive: boolean = true;
let changingX: boolean = true; // x = true, y = false
let score: number = 0;
let timer: number = 0;


const spawnFood = () => {
    currentFoodPos.X = Math.floor(Math.random() * GRID_SIZE.X);
    currentFoodPos.Y = Math.floor(Math.random() * GRID_SIZE.Y);

    led.plotBrightness(currentFoodPos.X, currentFoodPos.Y, 120);
};

const updateLED = () => {
    led.plot(gridPos.X, gridPos.Y);

    if (gridPos.X === currentFoodPos.X && gridPos.Y === currentFoodPos.Y) {
        timer = 0;
        spawnFood();
    }
};

const startGame = () => {
    gridPos.X = Math.floor(GRID_SIZE.X / 2);
    gridPos.Y = Math.floor(GRID_SIZE.Y / 2);
    updateLED();
    spawnFood();
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

basic.forever(() => {
    timer++;

    basic.pause(1000);
});