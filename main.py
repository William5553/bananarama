def on_button_pressed_a():
    basic.show_string('William')
input.on_button_pressed(Button.A, on_button_pressed_a)

def on_button_pressed_b():
    basic.show_string('Hello')
input.on_button_pressed(Button.B, on_button_pressed_b)
