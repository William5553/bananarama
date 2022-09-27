let ledX = 2;
let ledY = 2;
// x = true, y = false
let changingX = true;

const updateLED = () => {
    if (ledX < 0)
        ledX = 4;
    if (ledX > 4)
        ledX = 0;
    if (ledY < 0)
        ledY = 4;
    if (ledY > 4)
        ledY = 0;
    basic.clearScreen();
    led.plot(ledX, ledY);
};

updateLED();

input.onButtonPressed(Button.A, () => {
    if (changingX)
        ledX--;
    else
        ledY--;
    updateLED();
});

input.onButtonPressed(Button.B, () => {
    if (changingX)
        ledX++;
    else
        ledY++;
    updateLED();
});

input.onLogoEvent(TouchButtonEvent.Pressed, () => {
    changingX = !changingX;
});