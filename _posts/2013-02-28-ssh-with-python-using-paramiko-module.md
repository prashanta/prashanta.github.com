---
title: Automating remote file access through SSH with Python using Paramiko module
layout: post
comments: true
social: true
---

The scenario - I need to view/download log files from remote servers on a regular basis. The task of having to SSH to multiple servers to download log files was aching for some automation. This led me to Paramiko module, it "implements the SSH2 protocol for secure (encrypted and authenticated) connections to remote machines", bravo! just what I needed. Download Paramiko module [here](http://www.lag.net/paramiko/).

Guide to installing Python modules [here](http://docs.python.org/install/index.html#install-index).

Here is a basic working example: 

<div class="code">
{% highlight python %}

import paramiko
import string
import webbrowser
import os

ssh = paramiko.SSHClient()
ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
ssh.connect('192.168.1.21', username='username', password='password') 
    
print "1: get file \n2: print contents of file"
c=input(':')

if c==1:
	ftp = ssh.open_sftp()
	ftp.get('log.txt', 'log.txt')
	ftp.close()
	webbrowser.open_new(os.getcwd()+"/log.txt")
	print "FILE GOT!"
elif c==2:
	ftp = ssh.open_sftp()
	file=ftp.file('log.txt', "r", -1)
	data=file.read()
	L = string.split(data)
	for i in L:
		if string.find(i, '%')>-1:
			print i
	print ftp.stat("log.txt")		
	ftp.close()
	print "DONE!"	
else: 
	print "EXIT!"
ssh.close()

{% endhighlight %}
</div>

Time saved from having to download log files will be utilized to automate other trivial stuff, perfect!