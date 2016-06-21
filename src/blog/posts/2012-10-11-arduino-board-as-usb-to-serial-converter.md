---
date: 2012-10-11
layout: post.html
title: Arduino Board as USB to Serial Converter
comments: true
social: true
---
With simple hacks the Arduino board (with USB programming interface) can be used as a USB to serial conversion device. There are two methods to do this.

__Method uno__

When the processor is put to reset mode (shorting Reset and GND pins), the I/O pins are held at tri-state mode. This essentally frees the TX and RX pins, which can now be connected to a USART enabled device for communication via USB. This method works for Uno and other boards that have dedicated USB to serial converstion chip. It does not work with Leonardo, since it uses main processor's built-in USB module.

__Method dos__

This method works for all types of Arduino boards. It involves downloading a relay sort of sketch to the Arduino, which looks like so:

<script src="http://gist.github.com/3871893.js"></script>

Leonardo has an added advantage of having two USARTs. Instead of using SoftwareSerial, second USART (Serial1 class) can be used.
Thats all folks!
