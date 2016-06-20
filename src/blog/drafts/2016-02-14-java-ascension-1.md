---
layout: post.html
title: Java Ascension - Part 1
comments: true
social: true
---

When I need to work on a new Java project, I run Maven to bootstrap a basic project skeleton with my choosen favour of artifact (slash framework). Then manage all aspects of development in Eclipse IDE. This process is like clockwork and I can do this from comfort of my IDE. Nonetheless, it is essential to understand underlying technology and tools.

This is first part of series of posts where I am going to talk about writing Java programs starting form command line and gradually move towards using tools like Eclipse and Maven.

Before we start, we need:

1. JDK installed and enviroment variable PATH configured to point to JDK folder
2. Your favourite texteditor (Atom, Notepad, etc - we will leave out Eclipse for now)

<br/>  

### 1. The First Application - Hello World, what else
Lets start off with a basic Java program called Hello.java:

```java
public class Hello{
  public static void main(String [] args){
    System.out.println("Hello World, what else");
  }
}
```
Lets compile this program:

```console
javac Hello.java
```

This will compile _Hello.java_ to produce _Hello.class_. This .class file contains Java Bytecode representation of our _Hello.java_ program that can be executed by JVM (Java Virtual Machine). Lets run this compiled Java program:

```console
java Hello
```

<br>
### 2. Working with multiple source files

Create one more file _Calc.java_:

```java
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
```

Edit _Hello.java_ :

```java
public class Hello
{
	public static void main(String[] args){
		Calc a = new Calc(1,2);
		System.out.println("Hello World!" + a.add());
	}
}
```

Compile time:

```console
mkdir target
mkdir target\class
javac -verbose -d target\classes Hello.java
```

Last command will compile _Hello.java_ and _Calc.java_ and put output files in _target\class_ directory.

Finally, to run the program:

```console
java -cp target\classes Hello
```

_Tip:_ A java file can contain multipe class declerations, but can have only one public class, whose name is same as the file name.
<br>

### 3. Using Package
### 4. Using External Libraries
### 5. Working with JARs
### 6. Working with WARs
### 7. Hello Maven
