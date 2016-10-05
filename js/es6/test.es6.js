function powerUpPhasers() {
  let $enterprise = document.getElementById("enterprise");
  let $enterpriseContainer = $enterprise.parentElement;

  let firePhasers = () => {
    let $phaser = document.createElement("DIV");
    $phaser.className = "starship-img-phaser fire-scotty";
    $enterpriseContainer.appendChild($phaser);
    setTimeout(() => {
      $enterpriseContainer.removeChild($phaser);
      console.log('removing phaser');
    }, 2000); 
  };

  $enterprise.addEventListener("click", firePhasers);
}

function powerUpTractorBeam() {
  let $beam = document.getElementById("alien-beam-container");
  let $ship = document.getElementById("alien-ship-click-block");
  let gettingWhale = false;
  
  let getThatWhale = () => {
    if(!gettingWhale) {
      gettingWhale = true;
      console.log('getting that whale');
      let className = " there-be-whales";
      $beam.className += className;
      setTimeout( () => {
        $beam.className = "alien-beam-container";
        gettingWhale = false;
      }, 7000);
    }
  };
  
  $ship.addEventListener("click", getThatWhale);
}

window.onload = () => {
  powerUpPhasers();
  powerUpTractorBeam();
};