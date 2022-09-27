let x = 2;
let y = 2;

input.onButtonPressed(Button.A, () => {
    x--;
    if (x < 0)
        x = 4;
    updateLED();
});

input.onButtonPressed(Button.B, () => {
    x++;
    if (x > 4)
        x = 0;
    updateLED();
});

const updateLED = () => {
    basic.clearScreen()
    led.plot(x, y);
};