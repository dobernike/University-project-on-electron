function getRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function getHealth(health, attack) {
  return health > attack
    ? health - attack
    : 0;
}

const app = Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      rageForSpecialAttack: 3,
      winner: null,
    };
  },
  computed: {
    monsterBarStyles() {
      return { width: this.monsterHealth + '%' };
    },
    playerBarStyles() {
      return { width: this.playerHealth + '%' };
    },
    mayUseSpecialAttack() {
      return this.rageForSpecialAttack < 3;
    }
  },
  watch: {
    playerHealth(value) {
      if (value <= 0 && this.monsterHealth <= 0) {
        // A draw
        this.winner = 'draw'
      } else if (value <= 0) {
        // Player lost
        this.winner = 'monster'
      }
    },
    monsterHealth(value) {
      if (value <= 0 && this.playerHealth <= 0) {
        // A draw
        this.winner = 'draw'
      } else if (value <= 0) {
        // Player lost
        this.winner = 'player'
      }
    }
  },
  methods: {
    attackMonster() {
      this.rageForSpecialAttack++
      const attackValue = getRandomValue(5, 12)
      this.monsterHealth = getHealth(this.monsterHealth, attackValue)
      this.attackPlayer()
  },
    attackPlayer() {
      const attackValue = getRandomValue(8, 15)
      this.playerHealth = getHealth(this.playerHealth, attackValue)
    },
    specialAttackMonster() {
      this.rageForSpecialAttack = 0
      const attackValue = getRandomValue(10, 25)
      this.monsterHealth = getHealth(this.monsterHealth, attackValue)
      this.attackPlayer()
    },
    healPlayer() {
      this.rageForSpecialAttack++
      const healValue = getRandomValue(8, 20)
      this.playerHealth = this.playerHealth + healValue < 100
        ? this.playerHealth + healValue
        : 100
      this.attackPlayer()
    }
  }
})

app.mount('#game')
