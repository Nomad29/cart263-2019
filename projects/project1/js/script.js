"use strict";

/*****************

Scoopy's Frenzy
Alexandra Melançon

This is a simple jQuery game reminiscing of the never ending work when canine waste machines are involved.

******************/

// Sound effects for the experience
let doorSFX = new Audio("assets/sounds/door.mp3");
let pantingSFX = new Audio("assets/sounds/panting.mp3");

// Variable to hold our key elements
let $door;
let $dog;
let $poop;

$(document).ready(setup);

function setup() {
  // Get the door element from the page
  $door = $('#house2');
  // Make it droppable
  $door.droppable({
    drop: dogDropped
  });

  // Get the dog element from the page
  $dog = $('#dog');
  // Function for the dog animation of the beginning
  doggie();
  // Make it draggable
  $dog.draggable({
    axis: 'x',
  });

  // Get the poop element from the page
  $poop = $('#poop');
  // Hide it until called
  $poop.hide();
  // Function for the cleaning the waste
  wasting();

  pantingSFX.loop = true;

  // Start the dog panting when interacted with
  $dog.on({
    mousedown: function() {
      $(this).animate({
        marginRight: "+=3%",
      }, 100);
      pantingSFX.play();
      $poop.show();
      $("#poop").attr('src', 'assets/images/poop.svg');
    },
    // Stop the dog panting when not interacted with anymore
    mouseout: function() {
      $(this).animate({
        marginRight: "-=1%",
      }, 100);
      pantingSFX.pause();
    },
  });

}

// dogDropped(event,ui)
//
// Sets opening() when the dog image is dropped on its house. It also play the door sound when // dropped.
function dogDropped(event, ui) {
  $(this).attr('src', 'assets/images/house2-open.svg');
  pantingSFX.pause();
  // Start the door opening sound effect
  doorSFX.play();
  // Use a setInterval to call the opening() function over and over
  setInterval(opening, 250);
}

// opening()
//
// When the dog is dropped on its house, the door open.
// However, the door open again instantly and  the dog also...
function opening() {
  // Checks if the image if the door is open
  if ($door.attr('src') === 'assets/images/house2-open.svg') {
    // If it is, the 'src' attribute is set to the closed door instead
    setTimeout(function() {
      $dog.hide();
      $door.attr('src', 'assets/images/house2.svg');
      // Play the door sound
      doorSFX.play();
    }, 500)
  } else {
    setTimeout(function(event, ui) {
      $dog.show();
      $dog.animate({
        marginRight: "+=30%",
      }, 10000);
      $door.promise().done('src', 'assets/images/house2-open.svg');
    }, 500);
  }
}

// wasting()
//
// Let the user press any key to clean an unstoppable canine waste machine that
// will not disapear
function wasting() {
  $("html").keydown(function() {
    $("#poop").attr('src', 'assets/images/blank.png');
  });
}

function doggie() {
  $dog.animate({
    marginRight: "75%",
  }, 5000);
}
