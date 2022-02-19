// Game States
// "WIN" - Player robot has defeated all enemy-robots
//      *fights all enemy-robots
//      *Defeat each enemy-robot
// "LOSE" - Player robot's health is zero or less

var fightOrSkip = function() {
    //ask player if they'd like to fight or skip using fightOrSkip function
    var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");

    //conditional recursive function call
    promptFight = promptFight.toLowerCase();
    
    if (promptFight === "" || promptFight === null) {
        window.alert("You need to provide a valid answer! Please try again.");
        return fightOrSkip();
    }

    //if player picks "skip" cpmfor, amd then stop loop
    if (promptFight === "skip") {
        //confirm player wants to skip
        var confirmSkip = window.confirm("Are you sure you'd like to quit?");

        //if yes (true), leave fight
        if (confirmSkip) {
            window.alert(playerInfo.name + " has decided to skip this fight. Goodbye!");
            //subtract money from playerMoney for skipping
            playerInfo.playerMoney = Math.max(0, playerInfo.money - 10);
            
            //return true if player wants to leave
            return true;
        }
    }
    return false;
}

//fight function
var fight = function(enemy) {    
    //keep track of who goes first
    var isPlayerTurn = true;

    //randomly change turn order
    if (Math.random() > 0.5) {
        isPlayerTurn = false;
    }

    while (playerInfo.health > 0 && enemy.health > 0) {
        if (isPlayerTurn) {
                // ask player if they'd like to fight or run
                if (fightOrSkip()) {
                    //if true, leave fight by breaking loop
                    break;
                }
                
    
            var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);

            // remove enemy's health by subtracting the amount set in the playerInfo.attack variable
            enemy.health = Math.max(0, enemy.health - damage);
            console.log(playerInfo.name + ' attacked ' + enemy.name + '. ' + enemy.name + ' now has ' + enemy.health + ' health remaining.');
    
            // check enemy's health
            if (enemy.health <= 0) {
                window.alert(enemy.name + ' has died!');
        
                // award player money for winning
                playerInfo.money = playerInfo.money + 20;
        
                // leave while() loop since enemy is dead
                break;
            } 
            else {
                window.alert(enemy.name + ' still has ' + enemy.health + ' health left.');
            }
        }
        
        //player gets attacked first
        else {
            var damage = randomNumber(enemy.attack - 3, enemy.attack);
    
            // remove players's health by subtracting the amount set in the enemy.attack variable            
            playerInfo.health = Math.max(0, playerInfo.health - damage);
            console.log(enemy.name + ' attacked ' + playerInfo.name + '. ' + playerInfo.name + ' now has ' + playerInfo.health + ' health remaining.');
        
            // check player's health
            if (playerInfo.health <= 0) {
                window.alert(playerInfo.name + ' has died!');
                // leave while() loop if player is dead
                break;
            } 
            else {
                window.alert(playerInfo.name + ' still has ' + playerInfo.health + ' health left.');
            }
        }
        //switch turn order for next round
        isPlayerTurn = !isPlayerTurn;
    }
};

// startGame Function
var startGame = function() {
    //reset player stats
    playerInfo.reset();

    for (var i = 0; i < enemyInfo.length; i++) {
        if (playerInfo.health > 0) {
            //let the player know what round they are in
            window.alert("Welcome to Robot Gladiators! Round " + ( i + 1));
            
            //pick a new enemy to fight based on the inde of the enemy.names array
            var pickedEnemyObj = enemyInfo[i];
            
            //randomly generate health from 0-20 + 40. floor rounds down to 20. and +40 guarentees we at least have 40 health if it picks 0.
            pickedEnemyObj.health = randomNumber(40,60);

            //pass the pickedenemy.name variable's value into the fight function, where it will assume the value of the enemy.name parameter
            fight(pickedEnemyObj);

            //only enter if we are alive AND not on the last robot of the fight
            if (i < enemyInfo.length - 1 && playerInfo.health > 0) {
                shop();
            }
            
            //call randomNumber function to create random health number for enemy robot. min max values passed in.
            pickedEnemyObj.health = randomNumber(40, 60);
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
    if (playerInfo.health > 0) {
        window.alert("Great job, you've survived the game! You now have a score of " + playerInfo.money + ",");
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
    var shopOptionPrompt = window.prompt("Would you like to Refill your health, UPGRADE your attack, or LEAVE the store? Please enter 1 for REFILL, 2 for UPGRADE, or 3 for LEAVE.");

    //parses input to convert string to int
    shopOptionPrompt = parseInt(shopOptionPrompt);

    //use switch to carry out action    
    switch (shopOptionPrompt) {
        case 1:
            playerInfo.refillHealth();
            break;

        case 2:
            playerInfo.upgradeAttack();
            break;

        case 3:
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

//function that prevents null/non response for player name
var getPlayerName = function() {
    var name = "";

   while (name === "" || name === null) {
       name = prompt("What is your robot's name?");
   }

    console.log("Your robot's name is " + name);
    return name;
}

// Player robot custom object
var playerInfo = {
    name: getPlayerName(),
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
            this.money -= 7
        }
        else {
            window.alert("You'don't have enough money!");
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

// Enemy robot custom object array. Access with enemyInfo[0].name etc. etc.
var enemyInfo = [
    {
        name: "Roborto",
        attack: randomNumber(10, 14),
    },
    {
        name: "Amy Android",
        attack: randomNumber(10, 14),
    },
    {
        name: "Robo Trumble",
        attack: randomNumber(10, 14),
    }    
];

console.log(enemyInfo);
console.log(enemyInfo[0]);
console.log(enemyInfo[0].name);
// console.log(enemyInfo[0]['attack']);

//starts game upon page load
startGame();
