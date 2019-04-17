"use strict";

/*****************

AV.ITH
Alexandra Melançon

This is a jQuery and Responsivevoice experience that intends to remake how we see and use an Antivirus on a PC in an interactive way. To eradicate virus on your computer, one must play to a tamagotchi game clone to reduce the latter's influence to be able to delete it easely.

The name of this interactive software is AV.ITH (Antivirus.Information Technology Helper)

Uses:
Responsive Voice
https://responsivevoice.org/
jQuery
https://jquery.com/

******************/

// Variables for the interactive experience
let voice = 'Norwegian Male';

// The parameters for the voice in an object
let voiceParameters = {
  pitch: 0.6,
  rate: 0.8,
  volume: 0.7
}


$(document).ready(function() {

  // We can have speech happen in reaction to different page
  // events like clicks and keypresses, to make things more dynamic...

  $(document).on('click',function () {
    // say() is a function defined below
    say("Test. Test. Test.");
  });

});

function say (text) {
  responsiveVoice.speak(text,voice,voiceParameters);
}
