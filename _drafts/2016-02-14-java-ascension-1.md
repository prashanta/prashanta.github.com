---
layout: post
title: (Draft) Java Ascension - Part 1
comments: true
social: true
---

When I need to work on a new Java project, I fire up Maven which bootstraps a basic project skeleton with my choosen favour of framework/architecture. Then I manage all aspects of development in Eclipse IDE. This process is like clockwork and I can do this from comfort of my IDE. Nonetheless, it is essential to understand the underlying technology and tools. This is the first part of a series of posts I am going to write that will talk about writing Java programs, compiling and packaging. My aim is to revisit Java command line utilities and gradually move towards using Maven.

Before we start, we need:

1. JDK installed and PATH configured to point to JDK folder
2. Your favourite texteditor (Atom, Notepad, etc)

<br/>  

### The First Application
Lets start off with a basic Java program:

<div class='code'>
{% highlight java %}
public class Hello{
  public static void main(String [] args){
    System.out.println("Hello Mr.Robot");
  }
}
{% endhighlight %}
</div>

Lets compile and run this:

<div class='code'>
{% highlight java %}
javac Hello.java
java Hello
{% endhighlight %}
</div>

The first command will compile _Hello.java_ to produce _Hello.class_. This .class file contains Java Bytecode representation of our _Hello.java_ program that can be executed by JVM (Java Virtual Machine). 

### Two Class App

Create one more file _Calc.java_:

<div class='code'>
{% highlight java %}
public class Calc{
	int a;
	int b;

	public Calc(int a, int b){
		this.a = a;
		this.b = b;
	}

	public int add(){
		return a+b;
	}
}
{% endhighlight %}
</div>

Edit _Hello.java_ :

<div class='code'>
{% highlight java %}
public class Hello
{
	public static void main(String[] args){
		Calc a = new Calc(1,2);
		System.out.println("Hello World!" + a.add());
	}
}
{% endhighlight %}
</div>

### Using Package
