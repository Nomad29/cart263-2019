"use strict";

/*****************

AV.ITH
Alexandra Melançon

Virus JS file.

******************/


// Virus basic functions
function Virus() {
  this.influence = 100;
  this.damage = 19;
  this.regain = 1;
}

// Creates the function to link with the buttons to reduce the virus influence
Virus.prototype.reduceInf = function() {
  this.influence--;

  if (this.influence--) {
    this.influence = this.influence - this.damage;
  }
};

// Creates the function to let the virus gain back its influence slowy at a maximum of 100
Virus.prototype.life = function() {
  this.influence = this.influence + this.regain;

  if (this.influence > 100) {
    this.influence = 100;
  }
};
