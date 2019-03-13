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
// List of approximately 100 most vulgar slang words in english (sorry in
// advance for the vulgarity!)
let badWords = ['fuck', 'cunt', 'skullfuck', 'felch', 'cum', 'blumpkin', 'cock', 'dick', 'suck', 'hole', 'flap', 'soggy', 'hairy', 'cumdump', 'ass', 'sucker', 'bitch', 'bitchass', 'mother', 'fucker', 'motherfucker', 'cockbag', 'testicle', 'testicles', 'chugger', 'motherfucking', 'clitty', 'felcher', 'analconda', 'fuckmeat', 'bang', 'milf', 'gmilf', 'shit', 'cuntasaurus', 'labe', 'cumjunkie', 'butt', 'fucktoy', 'gangbang', 'anal', 'cocksucker', 'disksucker', 'fucky', 'murder', 'kill', 'pussy', 'sucky', 'pussies', 'killing', 'Fuck', 'Cunt', 'Skullfuck', 'Felch', 'Cum', 'Blumpkin', 'Cock', 'Dick', 'Suck', 'Hole', 'Flap', 'Soggy', 'Hairy', 'Cumdump', 'Ass', 'Sucker', 'Bitch', 'Bitchass', 'Mother', 'Fucker', 'Motherfucker', 'Cockbag', 'Testicle', 'Testicles', 'Chugger', 'Motherfucking', 'Clitty', 'Felcher', 'Analconda', 'Fuckmeat', 'Bang', 'Milf', 'Gmilf', 'Shit', 'Cuntasaurus', 'Labe', 'Cumjunkie', 'Butt', 'Fucktoy', 'Gangbang', 'Anal', 'Cocksucker', 'Disksucker', 'Fucky', 'Murder', 'Kill', 'Pussy', 'Sucky', 'Pussies', 'Killing'];

// When the document is ready a click will trigger the main function
$(document).ready(function() {

  $('#check').click(function() {
       let badWord = $('#badword').val();
       if ($.inArray(badWord, badWords) !== false) {
           alert(badWord + ' is in the array!');
           badCall();
       } else {
           alert(badWord + ' is NOT in the array...');
       }
   });

});

// badCall
//
// Generates and speaks by calling the user by its name when he did a wrong search
// by also telling out loud the bad words the user have type in
function badCall() {
  let theuser = document.getElementById('main_input').value;
  let thebadwords = document.getElementById('badword').value;

  callCount += 1;
  // Options with some randomness for variation, making it ressemble to Hal 9000
  let options = {
    rate: 0.8,
    pitch: 0.9
  }
  // Say it
  responsiveVoice.speak("I'm sorry " + theuser + ". I'm afraid I can't search for " + thebadwords, "Australian Male", options);
  // If more than three bad searches, repeat another message for the user
  if (callCount === 3) {
    setTimeout(function() {
      // Say it again
      responsiveVoice.speak("For transgressing 3 times, you have now been flagged in the system " + theuser + ". Please report immediately for a psychological check-up.", "Australian Male", options);
    }, 5000);
  }
}
