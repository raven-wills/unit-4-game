var ships = [
  {
    color: "white",
    damage: Math.floor(Math.random() * 12) + 1
  },
  {
    color: "red",
    damage: Math.floor(Math.random() * 12) + 1
  },
  {
    color: "blue",
    damage: Math.floor(Math.random() * 12) + 1
  },
  {
    color: "purple",
    damage: Math.floor(Math.random() * 12) + 1
  }
];

var galasparkHealth = Math.floor(Math.random() * 102) + 19;
var wins = 0;
var losses = 0;

function doDamage(damage) {
  galasparkHealth = galasparkHealth - damage;
  if (galasparkHealth === 0) {
    wins++;
    document.getElementById("explosion").style.display = "block";
    document.getElementById("kingGalaspark").style.display = "none";

    setTimeout(function() {
      document.getElementById("explosion").style.display = "none";
      document.getElementById("kingGalaspark").style.display = "initial";
    }, 1000);
  } else if (galasparkHealth < 0) {
    losses++;
    reset();
  }
  updateHTML();
}

function reset() {
  galasparkHealth = Math.floor(Math.random() * 102) + 19;
  ships.forEach(function(ship) {
    ship.damage = Math.floor(Math.random() * 12) + 1;
  });
}

// Updates
function updateHTML() {
  document.getElementById("galasparkHealth").textContent = galasparkHealth;
  document.getElementById("wins").textContent = wins;
  document.getElementById("losses").textContent = losses;

  ships.forEach(function(ship) {
    var shipElement = document.getElementById(ship.color + "Ship");
    var bulletElement = document.getElementById(ship.color + "Bullet");

    shipElement.onclick = function() {
      doDamage(ship.damage);

      // Change ship for firing animation
      shipElement.id = ship.color + "ShipFire";
      bulletElement.id = ship.color + "BulletFire";
      var shot = document.getElementById("shot");
      shot.currentTime = 0;
      shot.play();
      //Return ship to shape after animation
      setTimeout(function() {
        shipElement.id = ship.color + "Ship";
      }, 100);

      setTimeout(function() {
        bulletElement.id = ship.color + "Bullet";
      }, 300);
    };
  });
}

updateHTML();

document.getElementById("shot").play();
