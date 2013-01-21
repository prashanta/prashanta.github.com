---
layout: docs
title: Arduino Board as USB to Serial Converter
prev_section: 10-ways-to-destroy-an-arduino
next_section: simple-wireless-link-between-Arduino-and-desktop
---
With simple hacks the Arduino board (with USB programming interface) can be used as a USB to serial conversion device. There are two methods to do this.

__Method uno__

When the processor is put to reset mode (shorting Reset and GND pins), the I/O pins are held at tri-state mode. This essentally frees the TX and RX pins, which can now be connected to a USART enabled device for communication via USB. This method works for Uno and other boards that have dedicated USB to serial converstion chip. It does not work with Leonardo, since it uses main processor's built-in USB module.

__Method dos__

This method works for all types of Arduino boards. It involves downloading a relay sort of sketch to the Arduino, which looks like so:

<div class='code'>
{% highlight c %}
#include <SoftwareSerial.h>

SoftwareSerial mySerial = SoftwareSerial(10, 11);; // RX, TX

void setup() {
  pinMode(10,INPUT);
  pinMode(11,OUTPIT);
  mySerial.begin(19200);// this connects to the other USART device
  Serial.begin(19200);  // this one connects to a computer via USB
  while (!Serial) {
    ; // wait for serial port to connect. Needed for Leonardo only
  }
} 

void loop() { 
  if (mySerial.available() > 0) {
    // relay everything received from mySerial to Serial    
    Serial.write(mySerial.read()); 
  }
  if (Serial.available() > 0) {
    // relay everything received from Serial to mySerial
    mySerial.write(Serial.read());        
  }  
} 
{% endhighlight %}
</div>

Leonardo has an added advantage of having two USARTs. Instead of using SoftwareSerial, second USART (Serial1 class) can be used.
Thats all folks!