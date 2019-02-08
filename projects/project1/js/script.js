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
  $dog.animate({
    marginRight: "75%",
  }, 7000);
  // Make it draggable
  $dog.draggable({
    axis: 'x',
  });

  // Get the poop element from the page
  $poop = $('#poop');
  // Hide it until called
  $poop.hide();
  $poop.show(9000);
  wasting();

  pantingSFX.loop = true;

  // Start the dog panting when interacted with
  $dog.on({
    mousedown: function() {
      pantingSFX.play();
      $(this).animate({
        marginRight: "-=5%",
      }, 300);
    },
    // Stop the dog panting when not interacted with anymore
    mouseout: function() {
      $(this).animate({
        marginRight: "+=5%",
      }, 8000);
      pantingSFX.pause();
    },
    // Stop the dog suddenly for a fake stress reaction
    click: function() {
      $(this).animate({
        marginLeft: "-=5%",
      }, 100);
    }
  });

}

// dogDropped(event,ui)
//
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
      $door.promise().done('src', 'assets/images/house2-open.svg');
    }, 500);
  }
}

// wasting()
//
function wasting() {
  $("html").keydown(function() {
    $("#poop").attr('src', 'assets/images/blank.png');
  });
  $("html").keyup(function() {
    $("#poop").attr('src', 'assets/images/poop.svg');
  });
}
