"use strict";

/*****************

The Normality Simulator
Alexandra Melançon
An interactive experience on how people normally behave with a tool like the
World Wide Web at their fingertips. Sometimes, the searches are funny, but
they can also become rapidly twisted. To counter the spreading perversion of
the WWW, the authorities created an IA to control the users in a not so
distant future.


Uses:
Responsive Voice
https://responsivevoice.org/

******************/

// Variables for the game to exist
let theuser;
let callCount = 0;
// List of approximately 100 most vulgar slang words in english (sorry in
// advance for the vulgarity!)
let badWords = new Array('fuck', 'cunt', 'skullfuck', 'felch', 'cum', 'blumpkin', 'cock', 'dick', 'suck', 'hole', 'flap', 'soggy', 'hairy', 'cumdump', 'ass', 'sucker', 'bitch', 'bitchass', 'mother', 'fucker', 'motherfucker', 'cockbag', 'testicle', 'testicles', 'chugger', 'motherfucking', 'clitty', 'felcher', 'analconda', 'fuckmeat', 'bang', 'milf', 'gmilf', 'shit', 'cuntasaurus', 'labe', 'cumjunkie', 'butt', 'fucktoy', 'gangbang', 'anal', 'cocksucker', 'disksucker', 'fucky', 'murder', 'kill', 'pussy', 'sucky', 'pussies', 'killing', 'asshole', 'death');


$(document).ready(setup);

function setup() {

  //Calls the loading screen
  setTimeout(function() {
    $('.loader').hide();
  }, 6000);

}

// continueTo
//
// Let the user continue foward after reading the introduction
function continueTo() {
  $('.intro').hide();
  $(".left_ui").animate({width: "10%"}, 1000);
}

// loginIn
//
// Let the user continue foward after reading the introduction
function loginIn() {
  $('.intro').hide();
  $('.login').hide();
}

// checkUp
//
// Validates if the user wrote inapropriate words or not in the search input
function checkUp() {
  let searchWord = $('#searchword').val();

  let error = 0;
  for (let i = 0; i < badWords.length; i++) {
    let val = badWords[i];
    if ((searchWord.toLowerCase()).indexOf(val.toString()) > -1) {
      error = error + 1;
    }
  }

  if (error > 0) {
    badCall();
    return false;

  } else {
    location.href = 'https://www.google.com/search?q=' + searchWord;
  }
}


// badCall
//
// Generates and speaks by calling the user by its name when he did a wrong search
// by also telling out loud the bad words the user have type in
function badCall() {
  let theuser = document.getElementById('main_input').value;

  callCount += 1;
  // Options with some randomness for variation, making it ressemble to Hal 9000
  let options = {
    rate: 0.8,
    pitch: 0.9
  }
  // Say it
  responsiveVoice.speak("I'm sorry " + theuser + ". I'm afraid I can't search for " + $('#searchword').val(), "Australian Male", options);
  // If more than three bad searches, repeat another message for the user
  if (callCount === 3) {
    setTimeout(function() {
      // Say it again
      responsiveVoice.speak("For transgressing 3 times, you have now been flagged in the system " + theuser + ". Please report immediately for a psychological check-up.", "Australian Male", options);
    }, 5000);
  }
}
