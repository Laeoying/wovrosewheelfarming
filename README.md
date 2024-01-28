# wovrosewheelfarming
Do all your today's turns of the rose wheel in Wolvesville. (for players with a lot of roses)

## How to use it ?
You must change the tokens (email and password) in the script.js file. You can't connect in another way. You can edit the file with notepad for exemple.
Then, just launch the script with NodeJS.

## How to use NodeJS ?
You must install it with NPM, here where you can download this :
https://nodejs.org/en/download
Then, start a CMD session, copy the path to your folder where "script.js" is, and type :
> cd C:/you/folder/location
> npm i
> node script.js

You need to do *npm i* only once, and even once may be useless, but we never too sure. You don't need ever do type it again.
When you did that, you'll see what is the script doing.

## Annoying to do that everytime ?
You can setup a .bat file, which need only two click on you desktop to launch the script.
Create a file with the name you wish but with a ".bat" extension, like "roses.bat".
Edit this file with notepad for exemple, and type :
> @echo off
> cd C:/you/folder/location
> node script.js
> pause

Then save it and when you double-click on it on your desktop or your file explorer, the script will execute.
Remove "pause" if you want the window to close itself after the script execution.
You can remove the first line too but that will be uglier.