const GRID_SIZE = { X: 5, Y: 5 };

let ledX: number = 2;
let ledY: number = 2;
// x = true, y = false
let changingX: boolean = true;

const updateLED = () => {
    basic.clearScreen();
    led.plot(ledX, ledY);
};

updateLED();

input.onButtonPressed(Button.A, () => {
    if (changingX && ledX > 0)
        ledX--;
    else if (!changingX && ledY > 0)
        ledY--;
    updateLED();
});

input.onButtonPressed(Button.B, () => {
    if (changingX && ledX < GRID_SIZE.X - 1)
        ledX++;
    else if (!changingX && ledY < GRID_SIZE.Y - 1)
        ledY++;
    updateLED();
});

input.onLogoEvent(TouchButtonEvent.Pressed, () => {
    changingX = !changingX;
});