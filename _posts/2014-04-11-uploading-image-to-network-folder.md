---
layout: post
title: Simple wireless link between Arduino and a desktop using Bluetooth
comments: true
social: true
---
Bluetooth modules come really cheap these days, affordable alternatives to Xbee. I got my hands on a BTM-182 from Rayson. Like most Bluetooth modules, it comes with Serial Port Profile. SPP is basically a serial port emulator; in a nut shell - once its paired with a computer, you get a virtual COM port to play with. Try to get the module with a breakout board. Well, I forgot about it and ended up needing to improvise (its not too bad though). Download the datasheet [here](http://www.sparkfun.com/datasheets/Wireless/Bluetooth/BTM182.pdf).

<center><img src="{{ site.url }}/img/posts/bt-ckt.jpg"/></center>

It is just going to take four pins to get this module humming. Two of them are power pins: 3.3V and GND. The other two are the familiar TX and RX pins. When power is supplied, BMT initializes. On the computer it will show up as a new bluetooth device under the name "SerialAdapter". It can now be paired with using default pass code, "1234". Once, pairing is done, a virtual COM port should show up in the system hardware.

To check this setup, a software version of loopback test can be performed by downloading this sketch to the Arduino:

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

Basically this sketch sends all data received on RX of USB Serial to TX of Bluetooth Serial and vice versa. The USB COM port is connected with Arduino's Serial Monitor and the Bluetooth COM port is connected to a second terminal program, I am using [SerialTools](http://www.w7ay.net/site/Applications/Serial%20Tools/index.html). Once the connections are established, data sent from one terminal should show up on the other. The TX and RX pins of BTM are connected to pins 10 and 11, utilizing SoftwareSerial library.

<center><img src="{{ site.url }}/img/posts/BMT-180_schem.png" /></center>

Next, I wanted to change the Bluetooth attributes, specially - device name, passcode and baud rate. To do this, we need to talk with the module using AT commands, its simple enough. [Here](http://www.sparkfun.com/datasheets/Wireless/Bluetooth/SPP%20AT%20command%20set.pdf) is the list of AT Command Set for BMT-182. Firstly the module needs to be switched to command mode by sending +++, it will send back OK as acknowledgement. My favorite command is `ATI1`, this command lists all current attribute values,

<div class='code'>
{% highlight c %}
ATI1
OK
ATC=1, HARDWARE FLOW CONTROL
ATD=0000-00-000000, NEVER SET BLUETOOTH ADDRESS 
ATE=1, ECHO CHARACTERS 
ATG=1, ENABLE ALL PAGE AND INQUIRY SCAN 
ATH=1, DISCOVERABLE 
ATK=0, ONE STOP BIT 
ATL=2, BAUD RATE is 19200 
ATM=0, NONE PARITY_BIT 
ATN=SerialAdapter, LOCAL NAME 
ATO=0, ENABLE AUTO CONNECTING 
ATP=1234, PIN CODE 
ATQ=0, SEND RESULT CODE
ATR=1, SPP SLAVE ROLE
ATS=1, ENABLE AUTO-POWERDOWN OF RS232 DRIVER
ATX=1, ALWAYS CHECK '+++'
{% endhighlight %}
</div>

To set new passcode to _0000_ send: `ATP=0000` ; to change device name: `ATN=BTSERIAL` ; to change baud rate to 9600: `ATL2`. So what happens when baud rate is changed on the fly? Well the module will receive gibberish and send back gibberish because now the two parties are communicating at different baud rates. If device name has been changed, it needs to be re-paired.  

Bluetooth module are quite robust after pairing is established, leaving the user to focus on data.

More info here: [Byron's Blog](http://byron76.blogspot.com/) | [Rayson BTM222 & BTM112 Bluetooth modules](http://elektorembedded.blogspot.com/2010/08/rayson-btm222-btm112-bluetooth-modules.html) | [Technical stuffs on Bluetooth](http://www.cs.tut.fi/kurssit/TLT-6556/Slides/2-Bluetooth.pdf)
