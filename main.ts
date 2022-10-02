type coordinate = { X: number, Y: number };

const GRID_SIZE: coordinate = { X: 5, Y: 4 };
const gridPos: coordinate = { X: 2, Y: 2 };

// x = true, y = false
let changingX: boolean = true;

let score: number = 0;
let timer: number = 0;

let currentFoodPos: coordinate = { X: -1, Y: -1 };

const updateLED = () => {
    // basic.clearScreen();
    led.plot(gridPos.X, gridPos.Y);
};

const spawnFood = () => {
    currentFoodPos.X = Math.random() * GRID_SIZE.X;
    currentFoodPos.Y = Math.random() * GRID_SIZE.Y;

    led.plot(currentFoodPos.X, currentFoodPos.Y);
};

updateLED();
spawnFood();

input.onButtonPressed(Button.A, () => {
    if (gridPos[changingX ? 'X' : 'Y'] > 0) {
        led.unplot(gridPos.X, gridPos.Y);
        gridPos[changingX ? 'X' : 'Y']--;
    }
    updateLED();
});

input.onButtonPressed(Button.B, () => {
    if (gridPos[changingX ? 'X' : 'Y'] < GRID_SIZE[changingX ? 'X' : 'Y'] - 1) {
        led.unplot(gridPos.X, gridPos.Y);
        gridPos[changingX ? 'X' : 'Y']++;
    }
    updateLED();
});

input.onLogoEvent(TouchButtonEvent.Pressed, () => {
    changingX = !changingX;
});