---
layout: post
title: (Draft) Java Ascension - Part 1
comments: true
social: true
---

When I need to work on a new Java project, I run Maven which bootstraps a basic project skeleton with my choosen favour of artifact (slash framework). Then I manage all aspects of development in Eclipse IDE. This process is like clockwork and I can do this from comfort of my IDE. Nonetheless, it is essential to understand the underlying technology and tools. 

This is the first part of a series of posts where I am going to talk about writing Java programs starting form command line and ending and gradually move towards using big boys like Maven and Eclipse.

Before we start, we need:

1. JDK installed and enviroment variable PATH configured to point to JDK folder
2. Your favourite texteditor (Atom, Notepad, etc - we will leave out Eclipse for now)

I am running on a Windows 8 box.
<br/>  

### 1. The First Application - Hello World, what else
Lets start off with a basic Java program:

<div class='code'>
{% highlight java linenos %}
public class Hello{
  public static void main(String [] args){
    System.out.println("Hello World, what else");
  }
}
{% endhighlight %}
</div>

Lets compile this program:

<div class='code'>
{% highlight console %}
javac Hello.java
{% endhighlight %}
</div>

This will compile _Hello.java_ to produce _Hello.class_. This .class file contains Java Bytecode representation of our _Hello.java_ program that can be executed by JVM (Java Virtual Machine). Lets run this compiled Java program:

<div class='code'>
{% highlight console %}
java Hello
{% endhighlight %}
</div>

<br>
### 2. Working with multiple files

Create one more file _Calc.java_:

<div class='code'>
{% highlight java linenos %}
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
{% highlight java linenos %}
public class Hello
{
	public static void main(String[] args){
		Calc a = new Calc(1,2);
		System.out.println("Hello World!" + a.add());
	}
}
{% endhighlight %}
</div>

Compile time:

<div class='code'>
{% highlight console linenos %}
mkdir target
mkdir target\class
javac -verbose -d target\classes Calc.java
javac -verbose -cp target\classes -d target\classes Hello.java
java -classpath target\classes first.Hello
{% endhighlight %}
</div>

_Tip:_ A java file can contain multipe class declerations, but can have only one public class, whose name is same as the file name. 

<br>
### 3. Using Package
### 4. Using External Libraries
### 5. Working with JARs
### 6. Working with WARs
### 7. Hello Maven

