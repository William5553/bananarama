const GRID_SIZE = { X: 5, Y: 5 };
const gridPos = { X: 2, Y: 2 };
// x = true, y = false
let changingX: boolean = true;

const updateLED = () => {
    basic.clearScreen();
    led.plot(gridPos.X, gridPos.Y);
};

updateLED();

input.onButtonPressed(Button.A, () => {
    if (gridPos[changingX ? 'X' : 'Y'] > 0)
        gridPos[changingX ? 'X' : 'Y']--;
    updateLED();
});

input.onButtonPressed(Button.B, () => {
    if (gridPos[changingX ? 'X' : 'Y'] < GRID_SIZE[changingX ? 'X' : 'Y'] - 1)
        gridPos[changingX ? 'X' : 'Y']++;
    updateLED();
});

input.onLogoEvent(TouchButtonEvent.Pressed, () => {
    changingX = !changingX;
});