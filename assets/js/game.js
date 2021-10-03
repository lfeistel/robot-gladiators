// function to generate a random numeric value
var randomNumber = function(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var fight = function(enemy) {
  // repeat and execute as long as the enemy-robot is alive 
  while(playerInfo.health > 0 && enemy.health > 0) {
    var promptFight = window.confirm("Enemy Robot " + enemy.name + " is up. Would you like to FIGHT or SKIP this battle? Select OK to fight of Cancel to skip.");

    // if player choses to fight, then fight
    if (promptFight) {
      //Subtract the value of `playerInfo.attack` from the value of `enemyHealth` and use that result to update the value in the `enemyHealth` variable
      enemy.health = Math.max(0, enemy.health - randomNumber(playerInfo.attack - 3, playerInfo.attack));

      // Log a resulting message to the console so we know that it worked.
      console.log(playerInfo.name + " attacked " + enemy.name + ". " + enemy.name + " now has " + enemy.health + " health remaining.");

      // check enemy's health
      if (enemy.health <= 0) {
        window.alert(enemy.name + " has died!");
        break;
      } else {
        window.alert(enemy.name + " still has " + enemy.health + " health left.");
      }

      // Subtract the value of `enemyAttack` from the value of `playerInfo.health` and use that result to update the value in the `playerInfo.health` variable.
      playerInfo.health = Math.max(0, playerInfo.health - randomNumber(enemy.attack - 3, enemy.attack));

      // Log a resulting message to the console so we know that it worked.
      console.log(enemy.name + " attacked " + playerInfo.name + ". " + playerInfo.name + " now has " + playerInfo.health + " health remaining.");

      // check player's health
      if (playerInfo.health <= 0) {
        window.alert(playerInfo.name + " has died!");
        break;
      } 
      else {
        window.alert(playerInfo.name + " still has " + playerInfo.health + " health left.");
      }
    } else {
      // confirm player wants to skip
      var confirmSkip = window.confirm("Are you sure you'd like to quit?");

      // if yes (true), leave fight
      if (confirmSkip) {        
        window.alert(playerInfo.name + " has decided to skip this fight. Goodbye!");
        // subtract money from playerInfo.money for skipping
        playerInfo.money = Math.max(0, playerInfo.money - 10);
        console.log("playerInfo.money = " + playerInfo.money);
        break;
      }
      // if no (false), ask question again by running fight() again
      else {
        fight();
      }
    }
  }    
};

var startGame = function() {
  // reset player stats
  playerInfo.reset();

  for(var i = 0; i < enemyInfo.length && playerInfo.health > 0; i++) {        
    window.alert("Welcome to Robot Gladiators! Round " + (i + 1));    
    enemyInfo[i].health = randomNumber(40, 60);    
    fight(enemyInfo[i]); 

    // if we're not at the last enemy in the array
    if (playerInfo.health > 0 && i < enemyInfo.length - 1) {
      // ask if player wants to use the store before next round
      var storeConfirm = window.confirm("The fight is over, visit the store before the next round?");

      // if yes, take them to the store() function
      if (storeConfirm) {
        shop();
      }      
    }
  }
  
  endGame();
};

var endGame = function() {
  // if player is still alive, player wins!
  if (playerInfo.health > 0) {
    window.alert("Great job, you've survived the game! You now have a score of " + playerInfo.money + ".");
  } 
  else {
    window.alert("You've lost your robot in battle.");
  }

  // ask player if they'd like to play again
  var playAgainConfirm = window.confirm("Would you like to play again?");

  if (playAgainConfirm) {
    // restart the game
    startGame();
  } 
  else {
    window.alert("Thank you for playing Robot Gladiators! Come back soon!");
  }
};

var shop = function() {
  // ask player what they'd like to do
  var shopOptionPrompt = window.prompt(
    "Money: "+playerInfo.money+" Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one: 'REFILL', 'UPGRADE', or 'LEAVE' to make a choice."
  ).toLowerCase();
  // use switch to carry out action
  switch (shopOptionPrompt) {
    case "refill":
      playerInfo.refillHealth();
      break;
    case "upgrade":
      playerInfo.upgradeAttack();
      break;
    case "leave":
      window.alert("Leaving the store.");

      // do nothing, so function will end
      break;
    default:
      window.alert("You did not pick a valid option. Try again.");

      // call shop() again to force player to pick a valid option
      shop();
      break;
  }
};

var playerInfo = {
  name: window.prompt("What is your robot's name?"),
  health: 100,
  attack: 10,
  money: 10,
  reset: function() {
    this.health = 100;
    this.money = 10;
    this.attack = 10;
  },
  refillHealth: function() {
    if (this.money >= 7) {
      window.alert("Refilling player's health by 20 for 7 dollars.");
      this.health += 20;
      this.money -= 7;
    } 
    else {
      window.alert("You don't have enough money!");
    }
  },
  upgradeAttack: function() {
    if (this.money >= 7) {
      window.alert("Upgrading player's attack by 6 for 7 dollars.");
      this.attack += 6;
      this.money -= 7;
    } 
    else {
      window.alert("You don't have enough money!");
    }
  }  
};

var enemyInfo = [
  {
    name: "Roborto",
    attack: randomNumber(10, 14)
  },
  {
    name: "Amy Android",
    attack: randomNumber(10, 14)
  },
  {
    name: "Robo Trumble",
    attack: randomNumber(10, 14)
  }
];

if (playerInfo.name) {
  startGame();
}