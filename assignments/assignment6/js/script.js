/*

Condiments
Pippin Barr

Chooses random words from local JSON data to fill out a sentence
describing a condiment based on cats and rooms... weird.

Uses:

Corpora
https://github.com/dariusk/corpora

RiTA
http://rednoise.org/rita/index.html

*/

let vowels = ['a', 'e', 'i', 'o', 'u', 'y'];

$(document).ready(function() {

  $.getJSON('data/data.json', dataLoaded);

});

// Click function
//
// Enable the user to refresh the description by clicking on the page without
// adding more following descriptions.
$(document).click(function() {
  $('body').empty();
  $.getJSON('data/data.json', dataLoaded);
});

// dataLoaded (data)
//
// This function gets called by getJSON when the data has been loaded.
function dataLoaded(data) {

  // First the condiment
  // Get a random condiment from the condiments array in the JSON
  let condiment = getRandomElement(data.condiments);
  // Assume it's singular
  let verb = 'is';
  // Check if the last latter of the condiment is an 's'
  if (condiment.charAt(condiment.length - 1) === 's') {
    // If so, assume it's plural (this is a flawed assumption)
    verb = 'are';
  }

  // Now the cat
  let cat = getRandomElement(data.cats);

  // Same again for room
  let room = getRandomElement(data.rooms);

  // Same again for deities
  let deity = getRandomElement(data.deities);

  // Same again for supernatural_creatures
  let supernaturalCreature = getRandomElement(data.supernatural_creatures);

  // Look for the first letter of the Supernatural Creature and change the article if need be
  let articleSupernaturalCreature = 'a';
  for (let i = 0; i < vowels.length; i++) {
    if (supernaturalCreature.toLowerCase().charAt(0) === vowels[i]) {
      articleSupernaturalCreature = 'an';
    }
  }

  // Look for the first letter of the room and change the article if need be
  let articleRoom = 'a';
  for (let i = 0; i < vowels.length; i++) {
    if (room.toLowerCase().charAt(0) === vowels[i]) {
      articleRoom = 'an';
    }
  }

  // Now we can construct our description with a template string
  let description = `${condiment} ${verb} like ${articleSupernaturalCreature} ${supernaturalCreature} ${cat} in ${articleRoom} ${room} with ${deity}.`;

  // Finally, we add it to the page and hey presto!
  $('body').append(description)
}

// getRandomElement ()
//
// Returns a random element from the array provided
function getRandomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}
