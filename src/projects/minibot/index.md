# Minibot

*December 10, 2022*

**This page will be updated regularly**

I'm building a Pololu Romi + Raspberry Pi that will do... I'm not quite sure what, yet.

This is one of many kits owned by the FRC Team 7475 "Wired" in Ontario, donated by Locus Robotics.  This page will likely serve as some basic guidance (alongside the existing online documentation) and some lessons learned about the process.  I think we're going to try to do some basic vision work with the Raspberry Pi camera.

![Robot in-progress](bot-00.jpg)


# Hardware

## Capabilities

Once assembled, the Romi Control Board has:

- 3 programmable buttons
- 3 programmable LEDs
- 2 motors with encoders
- an accelerometer


## Assembly

While assembly can be fairly intuitive, the [Pololu Romi Chassis User's Guide](https://www.pololu.com/docs/0J68) is a great resource for verifying any assumptions being made. Be careful about where the instructions describe a differing options depending on what hardware you're mounting. In this case, we're mounting the **Romi 32U4 Control Board**, which changes some steps:

1. you **do not** need to jumper the two sets of AA batteries, the control board has slots for both and handles the serialization of voltage for you
2. The Raspberry Pi (Model 3 B) will mount directly to this board via the GPIO cluster of pins

## Soldering

!> Before you solder anything, dry fit everything to make sure you have the right idea

As you solder each section, use a multimeter to verify you haven't shorted any of the pins to each other. Be sure to follow soldering best practices regarding temperature and methods. Dry joints on a small mobile robot will eventually wiggle loose and you'll get a very frustrating kind of problem to debug: randomly occurring, intermittent issues.

There are 5 areas to solder:

1. The 6-pin socket connector strips for the wheel encoder/power supplies (
    - note there are two sets of holes, you want the one closest to the wheels
2. The L-shaped 6-pin male jumpers into the encoders
    - be sure you dry-fit these first, there's many ways do orient them wrongly
    - the black frame must be flush with the encoder board
3. The power pins between the motors and the encoder board
    - be especially careful not to apply too much heat for too long as this can warp the brushes in the motor
4. The buzzer in the middle of the board
    - make sure to orient this properly, but it's easy given the outline shape of the buzzer is printed on the board
5. The four battery pins that connect the battery leads/springs to the board
    - in order to remove the board later, you can squish the springs through the holes and pull them up with the board
    - the battery leads will be delicate when removed from the frame, so be careful

## Images

![Motors](bot-01.jpg)

![Motors](bot-02.jpg)


# Software

## Raspberry Pi

### Installing Raspberry Pi OS

The `Raspberry Pi Imager` makes this completely painless.  It will:

- Download the desired OS (Raspberry Pi OS Lite 64-bit)
- Format and properly partition an SD Card then install the above OS
- Allow you to set things such as the Wifi credentials, the local hostname for the device, and an ssh password.

When using the Imager, make sure you use:
- Pi OS Lite 32-bit
- Set the hostname (eg. `minibot`)
- Set the Wifi Credentials
- Set a username and password

?> You MUST use the 32-bit version of Pi OS  (other OSes might work, but they must be 32 bit). This can make some operations a bit slower, but there are currently no 64-bit drivers for the Pi Camera 2 that I could find.

You'll pick the SD card that you've plugged into the computer. It might suggest it is completely wiping one or more partitions on this card. That's fine.

Once the imaging is complete, you can remove the card and plug it into the Raspberry Pi.   Note that when you boot up the Pi for the first time, it can take 5-10 minutes before it responds to `ping` or `ssh`.

### Connecting to the Raspberry Pi

If you set the hostname and Wifi credentials correctly, you can address it on the same network with:

`ping pihostname.local` (where you replace `pihostname` with the hostname you picked)

?> `ping` is a command that sends a tiny packet of data over the network that requests a tiny responds. It's a way to way "hello!" and prove that your two computers can communicate.

Once that works, you can `ssh` to the robot using:

`ssh username@hostname.local`

It will ask a few security-related questions which you can say `yes` to.  It will then ask for a password.

### Installing OpenCV

You now need to set up a few things to get the Camera working and OpenCV Installed.

```bash
sudo raspi-config                # Go to "Interface Options" and enable "Legacy Camera". You'll have to reboot after.
sudo apt update                  # Update the list of available software to make sure you download the latest versions.
sudo apt install python3-opencv  # Install OpenCV for Python 3.
```

You can test that OpenCV installed properly and can access the camera with `python3`:

```python
import cv2                  # Import the library.
cap = cv2.VideoCapture(0)   # Open `/dev/video0` as a capture device.
result, image = cap.read()  # Capture an image and return two values:
                            # `result` is a boolean that will be `True` if image captured.
                            # `image` will be an object of image data.
image.size                  # This will be the size of image in bytes. If it's zero, something is wrong.

```

## Romi 32U4 (Arduino-like) Control Board

### Arduino Follower (Slave) Library.

?> Historically we call things in software/hardware a "slave" because they are designed to simply follow orders from a "master". Some might find it more modern to describe them as a "follower."

In this case, the follower library is designed to expose all of the Romi 32U4 (an Arduino-compatible board) capabilities via I2C. This allows the attached Raspberry Pi to do all the work (ie. it's the "master" or "leader").  The Pi will tell it to do things, and the 32U4 will handle the low-level details of doing them.

The library is found here: [https://github.com/pololu/pololu-rpi-slave-arduino-library](https://github.com/pololu/pololu-rpi-slave-arduino-library).


### Reference Library

For this robot, I'm keeping the code here: [Minibot](https://github.com/ablakey/minibot). Note that it isn't designed to work out of the box, but it should be pretty close. At the very least, it's a useful reference if you get stuck programming your own.

# Links

- [Pololu Romi Arduino Library](https://github.com/pololu/romi-32u4-arduino-library)

- [Pololu Pi Slave Library for Arduino](https://github.com/pololu/pololu-rpi-slave-arduino-library)


# FAQ

### How is the Raspberry Pi powered?

The Raspberry Pi is powered by the GPIO pins at the top end of the cluster. They supply VCC (5V) and ground from the Control Board.

Note that there is no power regulation or safety circuits, so these pins MUST be supplying 5V, which the Control Board does guarantee.

### Can I power the robot from both the batteries and the 5V USB cable?

I'm not sure how safe it is. But I've often powered the Raspberry Pi from USB while the robot itself is turned off.


### The HDMI port is blocked by a motor. How do I use it?

You can partially disassemble the robot, but think about what that means: any time you want a screen, you need to muck with your hardware.  A better option is to try to never require a screen. This can be accomplished by setting up Wifi and network settings when installing the OS via the `Raspberry Pi Imager`.  This way you can just `ssh` to the robot's computer from a PC on your network.

### How do I develop on the Raspberry Pi?

Raspberry Pis are comparatively slow. Very slow. You're best off doing as much development as possible elsewhere, and then running it on your Pi for compatibility and performance testing. This isn't always possible, however, as you might be doing work that requires the capabilities of the Pi, such as the camera, or the robot it is attached to. For managing code (that should all be in a repository such as GitHub!) you can just clone your code directly.  For editing code in a quicker development cycle, check out a tool such as the Remote Development plugin for VSCode.
