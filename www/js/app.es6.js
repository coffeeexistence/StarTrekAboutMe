"use strict";

function powerUpPhasers() {
  var $enterprise = document.getElementById("enterprise");
  var $enterpriseContainer = $enterprise.parentElement;

  var firePhasers = function firePhasers() {
    var $phaser = document.createElement("DIV");
    $phaser.className = "starship-img-phaser fire-scotty";
    $enterpriseContainer.appendChild($phaser);
    setTimeout(function () {
      $enterpriseContainer.removeChild($phaser);
      console.log('removing phaser');
    }, 2000);
  };

  $enterprise.addEventListener("click", firePhasers);
}

function powerUpTractorBeam() {
  var $beam = document.getElementById("alien-beam-container");
  var $ship = document.getElementById("alien-ship-click-block");
  var gettingWhale = false;

  var getThatWhale = function getThatWhale() {
    if (!gettingWhale) {
      gettingWhale = true;
      console.log('getting that whale');
      var className = " there-be-whales";
      $beam.className += className;
      setTimeout(function () {
        $beam.className = "alien-beam-container";
        gettingWhale = false;
      }, 7000);
    }
  };

  $ship.addEventListener("click", getThatWhale);
}

window.onload = function () {
  powerUpPhasers();
  powerUpTractorBeam();
};