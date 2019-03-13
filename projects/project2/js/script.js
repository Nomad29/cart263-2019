"use strict";

/*****************

The Normality Simulator
Alexandra Melançon
A fake browsing simulator on how people normally behave with a tool like the
World Wide Web at their fingertips. Sometimes, the searches are funny, but
they can also become rapidly twisted. To counter the spreading perversion of
the WWW, the authorities created the AI named BLACK BOX to control the
users in a not so distant future.


Uses:
Responsive Voice
https://responsivevoice.org/

******************/

// Variables for the game to exist
let theuser;
let callCount = 0;

// When the document is ready a click will trigger the main function
$(document).ready(function() {
  $(document).on('click', function() {
    $('#click').remove();
    badCall();
  });
});

// badCall
//
// Generates and speaks by calling the user by its name when he did a wrong search
function badCall() {
  let theuser = document.getElementById('main_input').value;

  callCount += 1;
  // Options with some randomness for variation, making it ressemble to Hal 9000
  let options = {
    rate: 0.8,
    pitch: 0.9
  }
  // Say it
  responsiveVoice.speak("I'm sorry " + theuser + " but I'm afraid I can't search for " + theuser, "Australian Male", options);
  // If more than three bad searches, repeat another message for the user
  if (callCount === 4) {
    setTimeout(function() {
      // Say it again
      responsiveVoice.speak("For transgressing more than 3 times, you have now been flagged in the system " + theuser + ". Please report to the section manager for a psychological checkup.", "Australian Male", options);
    }, 7000);
  }
}
