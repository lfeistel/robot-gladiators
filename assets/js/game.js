var playerName = window.prompt("What is your robot's name?");
var playerHealth;
var playerAttack;
var playerMoney;

var enemyNames = ["Roborto", "Amy Android", "Robo Trumble"];
var enemyHealth;
var enemyAttack;

// function to generate a random numeric value
var randomNumber = function(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var fight = function(enemyName) {
  // repeat and execute as long as the enemy-robot is alive 
  while(playerHealth > 0 && enemyHealth > 0) {
    var promptFight = window.confirm("Enemy Robot "+enemyName+" is up. Would you like to FIGHT or SKIP this battle? Select OK to fight of Cancel to skip."); //.toUpperCase();

    // if player choses to fight, then fight
    if (promptFight) { // === "FIGHT") {
      //Subtract the value of `playerAttack` from the value of `enemyHealth` and use that result to update the value in the `enemyHealth` variable
      enemyHealth = Math.max(0, enemyHealth - randomNumber(playerAttack - 3, playerAttack));

      // Log a resulting message to the console so we know that it worked.
      console.log(playerName + " attacked " + enemyName + ". " + enemyName + " now has " + enemyHealth + " health remaining.");

      // check enemy's health
      if (enemyHealth <= 0) {
        window.alert(enemyName + " has died!");
        break;
      } else {
        window.alert(enemyName + " still has " + enemyHealth + " health left.");
      }

      // Subtract the value of `enemyAttack` from the value of `playerHealth` and use that result to update the value in the `playerHealth` variable.
      playerHealth = Math.max(0, playerHealth - randomNumber(enemyAttack - 3, enemyAttack));

      // Log a resulting message to the console so we know that it worked.
      console.log(enemyName + " attacked " + playerName + ". " + playerName + " now has " + playerHealth + " health remaining.");

      // check player's health
      if (playerHealth <= 0) {
        window.alert(playerName + " has died!");
        break;
      } 
      else {
        window.alert(playerName + " still has " + playerHealth + " health left.");
      }
    } else { // if (promptFight === "SKIP") {
      // confirm player wants to skip
      var confirmSkip = window.confirm("Are you sure you'd like to quit?");

      // if yes (true), leave fight
      if (confirmSkip) {        
        window.alert(playerName + " has decided to skip this fight. Goodbye!");
        // subtract money from playerMoney for skipping
        playerMoney = Math.max(0, playerMoney - 10);
        console.log("playerMoney = " + playerMoney);
        break;
      }
      // if no (false), ask question again by running fight() again
      else {
        fight();
      }
    //} else {
    //  window.alert("You need to choose a valid option. Try again!");
    }
  }    
};

var startGame = function() {
  // reset player stats
  playerHealth = 100;
  playerAttack = 10;
  playerMoney = 10;
  
  for(var i = 0; i < enemyNames.length && playerHealth > 0; i++) {        
    window.alert("Welcome to Robot Gladiators! Round " + (i + 1));
    var pickedEnemyName = enemyNames[i];
    enemyHealth = randomNumber(40, 60);
    enemyAttack = 12;
    fight(pickedEnemyName); 

    // if we're not at the last enemy in the array
    if (playerHealth > 0 && i < enemyNames.length - 1) {
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
  if (playerHealth > 0) {
    window.alert("Great job, you've survived the game! You now have a score of " + playerMoney + ".");
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
    "Money: "+playerMoney+" Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one: 'REFILL', 'UPGRADE', or 'LEAVE' to make a choice."
  ).toLowerCase();
  // use switch to carry out action
  switch (shopOptionPrompt) {
    case "refill":
      if (playerMoney >= 7) {
        window.alert("Refilling player's health by 20 for 7 dollars.");

        // increase health and decrease money
        playerHealth = playerHealth + 20;
        playerMoney = playerMoney - 7;
      }
      else {
        window.alert("You don't have enough money!");
      }
      break;
    case "upgrade":
      if (playerMoney >= 7) {
        window.alert("Upgrading player's attack by 6 for 7 dollars.");

      // increase attack and decrease money
        playerAttack = playerAttack + 6;
        playerMoney = playerMoney - 7;
      }
      else {
        window.alert("You don't have enough money!");
      }
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

if (playerName) {
  startGame();
}