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

// Links some variables to the HTML page
let myVirus;
let $sprite;
let $message;
let $influence;
// Voice variable
let voice = 'Norwegian Male';
// The parameters for the voice in an object
let voiceParameters = {
  pitch: 0.6,
  rate: 0.8,
  volume: 0.7
}

$(document).ready(function() {

  //Calls the loading screen for the Scan page
  setTimeout(function() {
    $('.loader-scan').hide();
    $('.warning-popup').show();
  }, 900);

  $sprite = $("#sprite");
  $message = $("#message");
  $influence = $("#influence");

  // Creates the Virus
  myVirus = new Virus(); // New Virus function to let other lines of code to unfold
  $influence.html(myVirus.influence);

  let virusInfo = setInterval(function() {
    $influence.html(myVirus.influence);
    $message.html("Why hello there!");
    $sprite.css("background-image", "url(/projects/project3/assets/images/virus.gif)");
    myVirus.life();

    if (myVirus.influence < 70) {
      $message.html("Hey!");
      $sprite.css("background-image", "url(/projects/project3/assets/images/virus.gif)");
    }

    if (myVirus.influence < 50) {
      $message.html("Hey...");
      $sprite.css("background-image", "url(/projects/project3/assets/images/virus-a.gif)");
    }

    if (myVirus.influence < 30) {
      $message.html("HEY.");
      $sprite.css("background-image", "url(/projects/project3/assets/images/virus-a.gif)");
      $("#influence").css({
        "display": "inherit"
      });
      $("#btns").css({
        "display": "inherit"
      });
      $("#btnDelete").css({
        "display": "none"
      });
    }

    if (myVirus.influence < 10) {
      $message.html("Virus has no more influence");
      $("#influence").css({
        "display": "none"
      });
      $("#btns").css({
        "display": "none"
      });
      $("#btnDelete").css({
        "display": "inherit"
      });
      $sprite.css("background-image", "url(/projects/project3/assets/images/virus-s.gif)");
    }

    if (myVirus.influence < 0) {
      $message.html("Virus has been deleted");
      $influence.html = 0;
      $sprite.css("background-image", "url(/projects/project3/assets/images/virus-s.gif)");
      $("#btnDelete").css({
        "display": "none"
      });
      clearInterval(virusInfo);
      virusFade();
    }
  }, 1000);

});

// closeWarning()
//
// Close the Warning screen after the scanning so the game can truly begins
function closeWarning() {
  $('.warning-popup').hide();
}

// virusFade()
//
// Fade slowly the virus sprite when deleted
function virusFade() {
  $sprite.fadeTo( 3000, 0 );
}
