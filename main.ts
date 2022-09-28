let ledX = 2;
let ledY = 2;
// x = true, y = false
let changingX = true;

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
    if (changingX && ledX < 4)
        ledX++;
    else if (!changingX && ledY < 4)
        ledY++;
    updateLED();
});

input.onLogoEvent(TouchButtonEvent.Pressed, () => {
    changingX = !changingX;
});