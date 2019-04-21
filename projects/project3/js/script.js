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
let $hbar;
let $message;
let $influence;
// Voice variable
let voice = 'Norwegian Male';
// The parameters for the voice in an object
let voiceParameters = {
  pitch: 1.55,
  rate: 0.8,
  volume: 10
}
// Creates an Array for the text the virus says when playing
let virusSpeech = new Array('You think you can buy me?', 'This is not very nice...', 'You fool...', 'You think you can beat me!?', 'En garde, ma mignonne!', 'I will never succumb to the likes of you!');
// Soundtrack for the experience
let gameSFX = new Audio("assets/sounds/soundtrack.mp3");
// Variables to hold the feeding game
let $spriteF;
let $bad;
let $bad2;
let $good;
// Sound effect for the feeding experience
let crunchSFX = new Audio("assets/sounds/crunch.mp3");
let purrSFX = new Audio("assets/sounds/purring.mp3");
// Variables to hold the petting game
let $spriteP;
let $hand;
let globalTimer;
// Variable to hold the game of game
// Counter for number of time the player needs to click in order to complete the game
let dataCount = 5;


// Beginning
$(document).ready(function() {
  // Hides the game for Pet, Feed and Play until they are individually called
  $('#pet').hide();
  $('#feed').hide();
  $('#play').hide();
  $('.end').hide();

  // Calls the loading screen for the Scan page and 'scans' for virus
  setTimeout(function() {
    $('.loader-scan').hide();
    $('.warning-popup').show();
  }, 12000);

  // Gets the virus elements from the Scan HTML page
  $sprite = $("#sprite");
  $hbar = $(".barImage");
  $message = $("#message");
  $influence = $("#influence");

  // Lets the virus's voice speak when buttons are clicked
  $("#btnPet, #btnFeed, #btnPlay").on("click", function() {
    // Says a random sentence from the Array virusSpeech when mini-game
    // buttons are clicked
    say(virusSpeech[Math.floor(Math.random() * virusSpeech.length)]);
  });

  // Creates the Virus
  myVirus = new Virus(); // New Virus function to let other lines of code to unfold
  $influence.html(myVirus.influence);

  let virusInfo = setInterval(function() {
    // Give the ability to ID #influence in HTML to show the number of the
    // $influence counter
    $influence.html(myVirus.influence);
    $message.html(" ");
    $sprite.css("background-image", "url(assets/images/virus.gif)");
    $hbar.css("background-image", "url(assets/images/hbar-100.png)");
    // lets the virus gain back its influence slowy at a maximum of 100
    myVirus.life();

    if (myVirus.influence < 70) {
      $message.html(" ");
      $sprite.css("background-image", "url(assets/images/virus.gif)");
      $hbar.css("background-image", "url(assets/images/hbar-70.png)");
    }

    if (myVirus.influence < 50) {
      $message.html(" ");
      $sprite.css("background-image", "url(assets/images/virus-a.gif)");
      $hbar.css("background-image", "url(assets/images/hbar-50.png)");
    }

    if (myVirus.influence < 30) {
      $message.html(" ");
      $sprite.css("background-image", "url(assets/images/virus-a.gif)");
      $hbar.css("background-image", "url(assets/images/hbar-30.png)");
      $(".barImage").css({
        "display": "inherit"
      });
      $("#influence").css({
        "display": "inherit"
      });
      $("#btns").css({
        "display": "inherit",
        "pointer-events": "all"
      });
      $("#btnDelete").css({
        "display": "none"
      });
      $("#bar100").css({
        "display": "inline-flex"
      });
      $("#sprite").css({
        "margin-left": "0"
      });
    }

    if (myVirus.influence < 20 && myVirus.influence > 0) {
      $message.html(" ");
      $("#btns").css({
        "pointer-events": "none"
      });
      $hbar.css("display", "none");
      $("#influence").css({
        "display": "none"
      });
      $("#btnDelete").css({
        "display": "inline-flex"
      });
      $("#bar100").css({
        "display": "none"
      });
      $sprite.css("background-image", "url(assets/images/virus-s.gif)");
      $("#sprite").css({
        "margin-left": "2vmax"
      });
    }

    if (myVirus.influence <= 0) {
      $message.html("Virus has been deleted");
      $sprite.css("background-image", "url(assets/images/virus-s.gif)");
      $hbar.css("display", "none");
      $("#btnDelete").css({
        "display": "none"
      });
      $("#bar100").css({
        "display": "none"
      });
      $("#btns").css({
        "pointer-events": "none"
      });
      $("#sprite").css({
        "margin-left": "2vmax"
      });
      // Stops the virus influence counter
      clearInterval(virusInfo);
      // Virus final words
      say("Going to sleep now...");
      // Makes the virus fade/die slowly when the counter reached 0 or less
      virusFade();
    }
  }, 1000);

  // Sets the petting game
  //
  // Get the spriteP element from the page
  $spriteP = $('#spriteP');

  // Make Virus Sprite for petting game droppable
  $spriteP.droppable({
    accept: $hand,
    // Makes the player wait 1.5 seconds for completing the petting game
    // Needs to over with the hand over the virus sprite for 1.5s
    over: function(event, ui) {
      globalTimer = setTimeout(function() {
        handDropped();
      }, 1500);
    },
    // Clears the timeout timer if the petting game if played again
    out: function(event, ui) {
      clearTimeout(globalTimer);
    }
  });

  // Get the hand element from the page
  $hand = $('#hand');
  // Make the hand image be draggable
  $hand.draggable({
    revert: true,
    start: function(event, ui) {
      say("I'm not sure...");
    }
  });


  // Sets the feeding game
  //
  // Get the spriteF element from the page
  $spriteF = $('#spriteF');
  // Make the Virus sprite for the feeding game be droppable
  $spriteF.droppable({
    accept: "#good",
    // The drop option specifies a function to call when a drop is completed
    drop: foodDropped
  });

  // Get the fries from the feeding game
  $bad = $('#bad');
  // Make the fries image draggable
  $bad.draggable({
    revert: true,
    helper: "clone",
    start: function(event, ui) {
      say("Yuuugh...");
    }
  });
  // Get the second bad element, the hamburger from the feeding game
  $bad2 = $('#bad2');
  // Make the hamburger image draggable
  $bad2.draggable({
    revert: true,
    helper: "clone",
    start: function(event, ui) {
      say("Yuuugh...");
    }
  });
  // Get the sandwich from the feeding game be draggable
  $good = $('#good');
  // Make the sandwich image draggable
  $good.draggable({
    revert: false,
    helper: "clone",
    start: function(event, ui) {
      say("I guess I can try it.");
    }
  });


  // Game of game
  //
  // Game to play when user clicks on the Play button. Pure Javascript inspired
  // by bits of code by Ronni DC on StackOverflow
  // Gets the elements from the Scan HTML page
  let pickdata = document.querySelector(".file-icon");
  let showCount = document.querySelector(".data-span");
  // Variables for the window resize for the file-icon in the game of game to respect the limit
  // of the screen
  let windowWidth = window.innerWidth;
  let windowHeight = window.innerHeight;

  // Function for the window resize for the file-icon in the game of game to respect the limit
  // of the screen
  window.onresize = function() {
    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;
  }

  // OnClick function for when the user click on the file-icon
  $('.file-icon').on("click", function() {
    pickdata.style.top = Math.round(Math.random() * windowHeight) + "px";
    pickdata.style.left = Math.round(Math.random() * windowWidth) + "px";
    dataCount--;
    showCount.innerHTML = dataCount;

    // Ends the game of game, reset the counter, hide the game and diminish the virus influence
    if (dataCount === 0) {
      $('#play').hide();
      // Reduce the Virus influence
      myVirus.reduceInf();
      // Resets the counter to 5 if played again
      dataCount = 5;
      showCount.innerHTML = dataCount;
    }

  });

});


// window.onresize = function()
//
// For containing the data file icon in the game of game
window.onresize = function() {
  let windowWidth = window.innerWidth;
  let windowHeight = window.innerHeight;
}


// closeWarning()
//
// Close the Warning screen after the scanning so the game can truly begins
function closeWarning() {
  $('.warning-popup').hide();
  // Plays the soundtrack in loop when the game screen appears
  gameSFX.loop = true;
  gameSFX.play();
}

// virusFade()
//
// Fade slowly the virus sprite when deleted
function virusFade() {
  // Virus dying...
  $sprite.fadeOut(3000, 0);

  // Waits still the virus sprite is gone then show ending
  setTimeout(function() {
    ending().fadeIn(4000);
  }, 9000);
}

// say (text)
//
// Lets the voice of virus be heard when call in another function
function say(text) {
  responsiveVoice.speak(text, voice, voiceParameters);
}

// petScreen() - Feeding game starts
//
// The function for the game of feeding the Virus
function petScreen() {
  $('#pet').show();
}

// handDropped(event,ui) - Feeding game
//
// Called when a draggable element is dragged over the droppable element (the spriteP)
function handDropped(event, ui) {
  // Base image of the virus
  $(this).attr('src', 'assets/images/virus.gif');

  if ($spriteP.attr('src') === 'assets/images/virus.gif') {
    // If it is, changes image to virus who loves when petted
    $spriteP.attr('src', 'assets/images/virus-l.gif');
  }

  // And start the crunching sound effect of chewing
  purrSFX.play();

  // Waits 1.5s for looking to the virus enjoying the attention before Ending
  // the mini-game
  setTimeout(function() {
    $('#pet').hide();
    // Reduce the Virus influence
    myVirus.reduceInf();
    if ($spriteP.attr('src') === 'assets/images/virus-l.gif') {
      $spriteP.attr('src', 'assets/images/virus.gif');
    }
  }, 1500);
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

  // Base image of the virus
  $(this).attr('src', 'assets/images/virus.gif');

  if ($spriteF.attr('src') === 'assets/images/virus.gif') {
    // If it is, change the virus image to loving what it gets
    $spriteF.attr('src', 'assets/images/virus-l.gif');
  }

  // And start the crunching sound effect of chewing
  crunchSFX.play();

  // Waits 1.5s for looking to the virus enjoying the food before Ending
  // the mini-game
  setTimeout(function() {
    $('#feed').hide();
    // Reduce the Virus influence
    myVirus.reduceInf();
    if ($spriteF.attr('src') === 'assets/images/virus-l.gif') {
      $spriteF.attr('src', 'assets/images/virus.gif');
    }
  }, 1500);
}


// playScreen() - Feeding game starts
//
// The function for the game of games for the Virus
function playScreen() {
  $('#play').show();
}


// ending()
//
// The function for ending to show
function ending() {
  $('.end').show();
}
