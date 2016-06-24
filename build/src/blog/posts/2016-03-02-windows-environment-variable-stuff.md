---
date: 2016-03-02
layout: post.html
comments: true
social: true
title: Windows Environment Variable Stuff
---

Let’s try setting up environment variables on Windows OS (I am on Windows 8 box) from a command-line. Before we start some pointers:

1. There are two types of environment variable we are concerned about here - *User* and *System*. User environment variables are valid for the current user session/profile. System environment variables are valid system wide irrespective of user session.

2. If same variable name exists in both User and System, the User variable takes precedence. However, for _Path_ variable the value from User is appended to System.

3. Once the environment variables are created/modified from command line, they do not take effect in the current command prompt session. You have to start a new cmd session.

### Listing Environment Variables

Fire up _cmd.exe_ in administrator mode. The first command we are going to use is [SET](http://ss64.com/nt/set.html). To list the environment variables that have been setup run:

```console
D:\>set
```

This will list all effective environment variables for your user session. To list all variables that start with 'P':

```console
D:\>set P
```

There is another way to list the environment variables - using [REG](http://ss64.com/nt/reg.html) command. This will list user variables:

```console
D:\>REG QUERY HKEY_CURRENT_USER\Environment
```

And this will list system variables:

```console
D:\>REG QUERY "HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\Session Manager\Environment"
```

<br>
### Setting Environment Variables

To set a new user variable we need to use the [SETX](http://ss64.com/nt/setx.html) command:

```console
D:\>setx myvar1 "Hello Mr. Robot"
```

To set a new system variable run:

```console
D:\>setx myvar2 "Hello Mr.Robot" /m
```

To append values in existing variables:

```console
D:\>setx Path "%Path%;C:/maven/bin;"
```

Appending the _Path_ variable is a bit different because _%Path%_ returns the combined values of both User and System _Path_ variables, which means the new _Path_ User variable will be combination of [old System _Path_ variable + old User _Path_ variable + new path values].
<br>
### Deleting Environment Variables

To clear an environment variable, use the following command, this will not delete the variable, just clears it:

```console
D:\>setx myvar1 ""
D:\>setx myvar2 "" /m
```

Unfortunately, there is no cousin command to SETX that can delete environment variables. This has to be done by removing from registry using REG command. Practice caution here - you are about to change registry entries so be careful! Run this command to delete environment variable:

```console
D:\>REG DELETE "HKEY_CURRENT_USER\Environment" /v myvar1
D:\>REG DELETE "HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\Session Manager\Environment" /v myvar2
```
