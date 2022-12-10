# Minibot

*December 10, 2022*

**This page will be updated regularly**

I'm building a Pololu Romi + Raspberry Pi that will do... I'm not quite sure what, yet.

This is one of many kits owned by the FRC Team 7475 "Wired" in Ontario, donated by Locus Robotics.  This page will likely serve as some basic guidance (alongside the existing online documentation) and some lessons learned about the process.  I think we're going to try to do some basic vision work with the Raspberry Pi camera.




# Hardware

## Assembly

While assembly is a bit straightforward, the [Pololu Romi Chassis User's Guide](https://www.pololu.com/docs/0J68) is a great resource for verifying any assumptions being made. Just be careful about where the instructions describe a bunch of options depending on what hardware you're mounting. In this case, we're mounting the **Romi 32U4 Control Board**, which changes some steps:

1. you **do not** need to jumper the two sets of AA batteries, the control board has slots for both and handles the serialization of voltage for you.
2. The Raspberry Pi (Model 3 B) will mount directly to this board via the GPIO cluster of pins.


# Questions / Unknowns

*This section will grow and shrink. When a question disappears, the answer has made its way into the document above.*

## Powering the Raspberry Pi

I don't know if the Pi is powered by any of the pins. I don't believe the GPIO has power supply pins, so either there's other pins, or we have to manually wire the power supply. Should be easy to look up, first my getting a GPIO schematic.

## Mounting the Raspberry Pi Camera

The extended kit provided by Locus Robotics has a Raspberry Pi Camera and a ring of LED lights for illuminating targets. It remains unclear how to mount these. I think there might be some 3D printing in our future.
