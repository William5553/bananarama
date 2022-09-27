let x = 2;
let y = 2;

const updateLED = () => {
    if (x < 0)
        x = 4;
    if (x > 4)
        x = 0;
    basic.clearScreen();
    led.plot(x, y);
};

input.onButtonPressed(Button.A, () => {
    x--;
    updateLED();
});

input.onButtonPressed(Button.B, () => {
    x++;
    updateLED();
});