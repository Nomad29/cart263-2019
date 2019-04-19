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
//
// Links some variables to the HTML page
let myVirus;
let $sprite;
let $message;
let $influence;
// Voice variable
let voice = 'Norwegian Male';
// The parameters for the voice in an object
let voiceParameters = {
  pitch: 1.55,
  rate: 0.8,
  volume: 3
}
// Makes the virus's voice make statement each clicks
let nbrClick = 0;
// Soundtrack for the experience
let gameSFX = new Audio("assets/sounds/soundtrack.mp3");
// Variables to hold the feeding game
let $spriteF;
let $fly;
let $tomato;
// Sound effect for the feeding experience
let crunchSFX = new Audio("assets/sounds/crunch.mp3");

// Beginning
$(document).ready(function() {
  // Hides the game for Pet, Feed and Play until they are individually called
  $('#pet').hide();
  $('#feed').hide();
  $('#play').hide();

  // Calls the loading screen for the Scan page
  setTimeout(function() {
    $('.loader-scan').hide();
    $('.warning-popup').show();
  }, 900);

  // Gets the virus elements from the Scan HTML page
  $sprite = $("#sprite");
  $message = $("#message");
  $influence = $("#influence");

  // Lets the virus's voice speak when buttons are clicked
  $("#btnPet, #btnFeed, #btnPlay").on("click", function() {
    // Adds 1 with one click
    nbrClick = nbrClick + 1;

    if (nbrClick === 1) {
      say("You think you can buy me?");
    }

    if (nbrClick === 2) {
      say("This is not very nice...");
    }

    if (nbrClick === 3) {
      say("You fool...");
    }

    if (nbrClick === 4) {
      say("You think you can beat me!?");
    }

    if (nbrClick === 5) {
      say("En garde ma mignonne!");
    }

    if (nbrClick === 6) {
      say("I will never succumb to the likes of you!");
    }
  });

  // Creates the Virus
  myVirus = new Virus(); // New Virus function to let other lines of code to unfold
  $influence.html(myVirus.influence);

  let virusInfo = setInterval(function() {
    $influence.html(myVirus.influence);
    $message.html("There! The virus");
    $sprite.css("background-image", "url(/projects/project3/assets/images/virus.gif)");
    myVirus.life();

    if (myVirus.influence < 70) {
      $message.html("Diminish its influence");
      $sprite.css("background-image", "url(/projects/project3/assets/images/virus.gif)");
    }

    if (myVirus.influence < 50) {
      $message.html("Do it again!");
      $sprite.css("background-image", "url(/projects/project3/assets/images/virus-a.gif)");
    }

    if (myVirus.influence < 30) {
      $message.html("Just a little more");
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


  // Sets the feeding game
  //
  // Get the spriteF element from the page
  $spriteF = $('#spriteF');
  // Make it droppable
  $spriteF.droppable({
    accept: "#tomato",
    // The drop option specifies a function to call when a drop is completed
    drop: foodDropped
  });

  // Get the fly element from the page
  $fly = $('#fly');
  // Make it draggable
  $fly.draggable({
    revert: false,
    helper: "clone",
    start: function(event, ui) {
      say("Yuuugh...");
    }
  });
  // Get the fly element from the page
  $tomato = $('#tomato');
  // Make it draggable
  $tomato.draggable({
    revert: false,
    helper: "clone",
    start: function(event, ui) {
      say("I guess I can try it.");
    }
  });

});

// closeWarning()
//
// Close the Warning screen after the scanning so the game can truly begins
function closeWarning() {
  $('.warning-popup').hide();
  // Plays the soundtrack when the game screen appears
  gameSFX.loop = true;
  gameSFX.play();
}

// virusFade()
//
// Fade slowly the virus sprite when deleted
function virusFade() {
  $sprite.fadeOut(3000, 0);
}

// say (text)
//
// Lets the voice of virus be heard when call in another function
function say(text) {
  responsiveVoice.speak(text, voice, voiceParameters);
}

// feedScreen() - Feeding game starts
//
// The function for the game of feeding the Virus
function feedScreen() {
  $('#feed').show();
}

// foodDropped(event,ui) - Feeding game
//
// Called when a draggable element is dragged over the droppable element (the spriteF)
function foodDropped(event, ui) {
  // Hides the draggables elements that have been eaten
  ui.draggable.hide();
  // Adds back the draggables elements that have been eaten if player make the virus eat again
  ui.draggable.show();

  // We should "close the spriteF" by changing its image
  $(this).attr('src', 'assets/images/virus.gif');

  if ($spriteF.attr('src') === 'assets/images/virus.gif') {
    // If it is, we set the 'src' attribute to the closed spriteF
    $spriteF.attr('src', 'assets/images/virus-l.gif');
  }

  // And start the crunching sound effect of chewing
  crunchSFX.play();
  setTimeout(function() {
    $('#feed').hide();
    myVirus.reduceInf();
    if ($spriteF.attr('src') === 'assets/images/virus-l.gif') {
      // If it is, we set the 'src' attribute to the closed spriteF
      $spriteF.attr('src', 'assets/images/virus.gif');
    }
  }, 1500);
}
