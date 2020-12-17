const getRandomValue = (max,min) => {
    return Math.floor(Math.random() * (max - min)) + min
}

const app = Vue.createApp({
    data() {
        return{
            playerHealth: 100,
            monsterHealth: 100,
            counter: 0,
            winner: null,
            logMessage: [],
        }
    },
    watch: {
        playerHealth(value) {
            if(value < 0 && this.monsterHealth < 0) {
                this.winner = "draw"
            } else if(value < 0) {
                this.winner = "monster"
            }
        },
        monsterHealth(value) {
            if(value < 0 && this.playerHealth < 0) {
                this.winner = "draw"
            } else if(value < 0) {
                this.winner = "player"
            }
        }
    },
    computed:{
        monsterBarStyles() {
            if(this.monsterHealth <= 0) {
                return {width: '0%'}
            }
            return {width: this.monsterHealth + '%'}
        },
        playerBarStyles() {
            if(this.playerHealth <= 0) {
                return {width: '0%'}
            }
            return {width: this.playerHealth + '%'}
        }
    },
    methods:{
        attackMonster() {
            const attackValue = getRandomValue(12, 5);
            this.monsterHealth -= attackValue;
            this.addLogMessage('player', 'attack', attackValue)
            this.attackPlayer();
        },
        attackPlayer() {
            const attackValue = getRandomValue(15, 8)
            this.playerHealth -= attackValue;
            this.counter++;
            this.addLogMessage('monster', 'attack', attackValue)
        },
        specialAttackMonster() {
            const attackValue = getRandomValue(10, 25)
            this.monsterHealth -= attackValue;
            this.counter = 0;
            this.addLogMessage('player', 'Special Attack', attackValue)
            this.attackPlayer();
        },
        healPlayer() {
            this.counter++;
            const healValue = getRandomValue(8, 20);
            if(healValue + this.playerHealth > 100) {
                this.playerHealth = 100;
            }else{
                this.playerHealth += healValue;
            }
            this.addLogMessage('player', 'heal', healValue)
            this.attackPlayer();
        },
        startNewGame() {
            this.playerHealth= 100;
            this.monsterHealth= 100;
            this.counter= 0;
            this.winner= null;
            this.logMessage = [];
        },
        addLogMessage(who, what, value) {
            this.logMessage.unshift({
                actionBy: who,
                actionType: what,
                actionValue: value
            }); 
        }
    },
});
app.mount("#game")
