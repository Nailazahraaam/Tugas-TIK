const player = { hp: 100, maxHp: 100 };
const enemy = { hp: 100, maxHp: 100 };
let playerTurn = true;

const playerHpEl = document.getElementById("player-hp");
const enemyHpEl = document.getElementById("enemy-hp");
const messageBox = document.getElementById("message-box");
const playerSprite = document.getElementById("player-sprite");
const enemySprite = document.getElementById("enemy-sprite");

function updateHP() {
  playerHpEl.textContent = `HP: ${player.hp}`;
  enemyHpEl.textContent = `HP: ${enemy.hp}`;
}

function showMessage(msg) {
  messageBox.textContent = msg;
}

function attack(attacker, defender, sprite, targetSprite, attackerName, defenderName) {
  const damage = Math.floor(Math.random() * 20) + 5;
  defender.hp = Math.max(0, defender.hp - damage);
  
  targetSprite.classList.add("hit");
  setTimeout(() => targetSprite.classList.remove("hit"), 300);
  
  showMessage(`${attackerName} hits ${defenderName} for ${damage} damage!`);
  updateHP();
}

function heal(character, name) {
  const amount = Math.floor(Math.random() * 15) + 10;
  character.hp = Math.min(character.maxHp, character.hp + amount);
  showMessage(`${name} heals for ${amount} HP!`);
  updateHP();
}

document.getElementById("attack-btn").addEventListener("click", () => {
  if (!playerTurn) return;
  attack(player, enemy, playerSprite, enemySprite, "Player", "Enemy");
  playerTurn = false;
  checkGameOver();
  if (enemy.hp > 0) setTimeout(enemyTurn, 1000);
});

document.getElementById("heal-btn").addEventListener("click", () => {
  if (!playerTurn) return;
  heal(player, "Player");
  playerTurn = false;
  if (enemy.hp > 0) setTimeout(enemyTurn, 1000);
});

function enemyTurn() {
  const choice = Math.random() > 0.3 ? "attack" : "heal";
  if (choice === "attack") {
    attack(enemy, player, enemySprite, playerSprite, "Enemy", "Player");
  } else {
    heal(enemy, "Enemy");
  }
  checkGameOver();
  if (player.hp > 0 && enemy.hp > 0) {
    setTimeout(() => {
      playerTurn = true;
      showMessage("Your Turn!");
    }, 1000);
  }
}

function checkGameOver() {
  if (player.hp <= 0) {
    showMessage("💀 You Lost!");
    playerTurn = false;
  } else if (enemy.hp <= 0) {
    showMessage("🏆 You Win!");
    playerTurn = false;
  }
}

updateHP();
