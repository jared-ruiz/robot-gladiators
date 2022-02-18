// Game States
// "WIN" - Player robot has defeated all enemy-robots
//      *fights all enemy-robots
//      *Defeat each enemy-robot
// "LOSE" - Player robot's health is zero or less

// Player robot info
var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

// Enemy robot info
var enemyNames = ["Roborto", "Amy Android", "Robo Trumble"];
var enemyHealth = 50;
var enemyAttack = 12;

console.log(enemyNames);
console.log(enemyNames.length);
console.log(enemyNames[0]);
console.log(enemyNames[3]);

//fight function
var fight = function(enemyName) {
    while (playerHealth > 0 && enemyHealth > 0) {
      // ask player if they'd like to fight or run
        var promptFight = window.prompt('Would you like to FIGHT or SKIP this battle? Enter "FIGHT" or "SKIP" to choose.');
    
        // if player picks "skip" confirm and then stop the loop
        if (promptFight === "skip" || promptFight === "SKIP") {
            // confirm player wants to skip
            var confirmSkip = window.confirm("Are you sure you'd like to quit?");
    
            // if yes (true), leave fight
            if (confirmSkip) {
                window.alert(playerName + ' has decided to skip this fight. Goodbye!');
                
                // subtract money from playerMoney for skipping
                playerMoney = Math.max(0, playerMoney - 10);
                console.log("playerMoney", playerMoney)
                break;
            }
        }
  
        // remove enemy's health by subtracting the amount set in the playerAttack variable
        var damage = randomNumber(playerAttack - 3, playerAttack);

        enemyHealth = Math.max(0, enemyHealth - damage);
        console.log(playerName + ' attacked ' + enemyName + '. ' + enemyName + ' now has ' + enemyHealth + ' health remaining.');
  
        // check enemy's health
        if (enemyHealth <= 0) {
            window.alert(enemyName + ' has died!');
    
            // award player money for winning
            playerMoney = playerMoney + 20;
    
            // leave while() loop since enemy is dead
            break;
        } 
        else {
            window.alert(enemyName + ' still has ' + enemyHealth + ' health left.');
        }
  
        // remove players's health by subtracting the amount set in the enemyAttack variable
        var damage = randomNumber(enemyAttack - 3, enemyAttack);
        
        playerHealth = Math.max(0, playerHealth - damage);
        console.log(enemyName + ' attacked ' + playerName + '. ' + playerName + ' now has ' + playerHealth + ' health remaining.');
    
        // check player's health
        if (playerHealth <= 0) {
            window.alert(playerName + ' has died!');
            // leave while() loop if player is dead
            break;
        } 
        else {
            window.alert(playerName + ' still has ' + playerHealth + ' health left.');
        }
    }
};

// startGame Function
var startGame = function() {
    //reset player stats
    playerHealth = 100;
    playerAttack = 10;
    playerMoney = 10;

    for (var i = 0; i < enemyNames.length; i++) {
        if (playerHealth > 0) {
            //let the player know what round they are in
            window.alert("Welcome to Robot Gladiators! Round " + ( i + 1));
            
            //pick a new enemy to fight based on the inde of the enemyNames array
            var pickedEnemyName = enemyNames[i];
            
            //randomly generate health from 0-20 + 40. floor rounds down to 20. and +40 guarentees we at least have 40 health if it picks 0.
            enemyHealth = Math.floor(Math.random() * 21) + 40;

            //use debugger to pause script from running and check what's going on at that moment in code
            // debugger;

            //pass the pickedEnemyName variable's value into the fight function, where it will assume the value of the enemyName parameter
            fight(pickedEnemyName);

            //only enter if we are alive AND not on the last robot of the fight
            if (i < enemyNames.length - 1 && playerHealth > 0) {
                shop();
            }
            
            //call randomNumber function to create random health number for enemy robot. min max values passed in.
            enemyHealth = randomNumber(40, 60);
        }
        else {
            window.alert("You have lost your robot in battle! Game Over!");
            break;
        }
    }
    //call endGame function 
    endGame();
}

//function to end the entire game
var endGame = function() {
    //if player is still alive, the player wins
    if (playerHealth > 0) {
        window.alert("Great job, you've survived the game! You now have a score of " + playerMoney + ",");
    }
    else
    {
        window.alert("You've lost your robot in battle.");
    }

    var playAgainConfirm = window.confirm("Would you like to play again?");

    if (playAgainConfirm) {
        startGame();
    }
    else {
        window.alert("Thank you for playing Robot Gladiators! Come back soon!");
    }
}

var shop = function() {
    //ask player what they would like to do
    var shopOptionPrompt = window.prompt("Would you like to Refill your health, UPGRADE your attack, or LEAVE the store? Please enter one: 'REFILL', 'UPGRADE', or 'LEAVE' to make a choice");

    //use switch to carry out action
    switch (shopOptionPrompt) {
        case "REFILL":
        case "Refill":
        case "refill":
            if (playerMoney >= 7) {
                window.alert("Refilling player's health by 20 for 7 dollars.");

                //increase health and decrease money
                playerHealth = playerHealth + 20;
                playerMoney = playerMoney - 7;
                break;
            }
            else {
                window.alert("You don't have enough money!");
            }
            
            break;

        case "UPGRADE":
        case "Upgrade":
        case "upgrade":
            if (playerMoney >= 7) {
            window.alert("Upgrading player's attack by 6 for 7 dollars.");

            //increase attack and decrease money
            playerAttack = playerAttack + 6;
            playerMoney = playerMoney - 7;
            break;
            }
            else {
                window.alert("You don't have enough money!")
            }

            break;
        
        case "LEAVE":
        case "Leave":
        case "leave":
            window.alert("Leaving the store.");

            //do nothing to end function
            break;
        
        default:
            window.alert("You did not pick a valid option. Try again.");

            //call shop function again until they correctly input something
            shop();
            break;
    }
};

//function to generate a random numeric value
var randomNumber = function(min, max) {
    var value = Math.floor(Math.random() * (max - min + 1) + min);

    return value;
};

//starts game upon page load
startGame();
