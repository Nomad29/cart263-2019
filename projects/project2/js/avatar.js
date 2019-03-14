"use strict";

/*****************

The JS script for the interactive cube avatar.

******************/

// Variables for the avatar to exist
let root = document.documentElement;

// Lets the cube moves by getting the user mouse location on the screen in X,Y
document.addEventListener('mousemove', function(avatar){
	let x = avatar.clientX / (innerWidth / 2);
	let y = avatar.clientY / (innerHeight / 2);

	root.style.setProperty('--mouse-x', x);
	root.style.setProperty('--mouse-y', y);
});
