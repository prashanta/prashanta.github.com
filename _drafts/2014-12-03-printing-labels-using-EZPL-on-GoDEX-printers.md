---
layout: post
title: (Draft) Programming GoDEX Label Printer
comments: true
social: true
---

<br>
<center><img src="../../../img/posts/wck-pin-spec.png" width="400px"/></center>

Label printers come with their own companion software which is used to design and print labels. Some software include feature to import data from Excel file or connect to a database via ODBC. This approach is useful when printing labels with data from ERP or other enterprise applications, however it is not completely autonomous and usually requires itermediate steps. Most label printer manufacturers also provide a programming language to program the printers, a sort of API for the printer. For example GoDex calls this programmign language EZPL, while the industry giant Zebra calls it ZPL. The programming language is basically a set of commands that is sent to printer mostly via the serial port on the printer in ASCII format.
