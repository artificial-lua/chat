class Dice {
    constructor(max_num) {
        this.max_num = max_num;

        this.roll();
    }
    roll() {
        this.num = Math.floor(Math.random() * this.max_num) + 1;
    }
    getNum() {
        return this.num;
    }
}

class DiceSet{
    constructor(many, max_num){
        this.dices = [];
        this.many = many;
        for(let i=0; i<many; i++){
            this.dices.push(new Dice(max_num));
        }

        this.rollAll();

        console.log('DiceSet created');
    }

    rollEach(roll_nums){
        for (let i in roll_nums){
            this.dices[i - 1].roll();
        }
    }

    rollAll(){
        for(let i=0; i<this.many; i++){
            this.dices[i].roll();
        }
    }


    getEach(){
        let result = [];
        for(let dice of this.dices){
            result.push(dice);
        }
        return result;
    }

    getEachNum(){
        let result = [];
        for(let dice of this.dices){
            result.push(dice.getNum());
        }
        return result;
    }
}

class Score{
    constructor(calc){
        this.isUsed = false;
        this.calc = calc;
        this.score = 0;
    }

    calculation(dices, isSet=false){
        if (isSet){
            this.isUsed = true;
            this.score = this.calc(dices);
        }

        return this.calc(dices);
    }

    getScore(){
        return this.score;
    }
}

class YachtScoreBoard{
    constructor(){
        this.scores = {
            aces: new Score({}),
            deuces: new Score({}),
            threes: new Score({}),
            fours: new Score({}),
            fives: new Score({}),
            sixes: new Score({}),
            choice: new Score({}),
            four_of_a_kind: new Score({}),
            full_house: new Score({}),
            small_straight: new Score({}),
            large_straight: new Score({}),
            yahtzee: new Score({}),
        };

        this.scores.aces = new Score((dices) => {
            let result = 0;
            
            let nums = dices.getEachNum()

            for(let i in nums){
                if (nums[i] == 1){
                    result += nums[i];
                }
            }

            return result;
        });

        this.scores.deuces = new Score((dices) => {
            let result = 0;
            
            let nums = dices.getEachNum()

            for(let i in nums){
                if (nums[i] == 2){
                    result += nums[i];
                }
            }

            return result;
        });

        this.scores.threes = new Score((dices) => {
            let result = 0;
            
            let nums = dices.getEachNum()

            for(let i in nums){
                if (nums[i] == 3){
                    result += nums[i];
                }
            }

            return result;
        });

        this.scores.fours = new Score((dices) => {
            let result = 0;
            
            let nums = dices.getEachNum()

            for(let i in nums){
                if (nums[i] == 4){
                    result += nums[i];
                }
            }

            return result;
        });

        this.scores.fives = new Score((dices) => {
            let result = 0;
            
            let nums = dices.getEachNum()

            for(let i in nums){
                if (nums[i] == 5){
                    result += nums[i];
                }
            }

            return result;
        });

        this.sixes = new Score((dices) => {
            let result = 0;
            
            let nums = dices.getEachNum()

            for(let i in nums){
                if (nums[i] == 6){
                    result += nums[i];
                }
            }

            return result;
        });

        this.scores.choice = new Score((dices) => {
            let result = 0;
            
            let nums = dices.getEachNum()

            for(let i in nums){
                result += nums[i];
            }

            return result;
        });

        this.scores.four_of_a_kind = new Score((dices) => {
            let result = 0;
            
            let nums = dices.getEachNum()

            for(let i in nums){
                if (nums.filter((num) => {
                    return num == i;
                }).length == 4){
                    result += i * 4;
                }
            }

            return result;
        });

        this.scores.full_house = new Score((dices) => {
            let result = 0;
            
            let nums = dices.getEachNum()

            for(let i in nums){
                if (nums.filter((num) => {
                    return num == i;
                }).length == 2){
                    result += i * 2;
                }else if(nums.filter((num) => {
                    return num == i;
                }).length == 3){
                    result += i * 3;
                }
            }

            return result;
        });

        this.scores.small_straight = new Score((dices) => {
            let result = 0;
            
            let nums = dices.getEachNum()

            if (nums.includes(1) && nums.includes(2) && nums.includes(3) && nums.includes(4)){
                result = 15;
            }else if(nums.includes(2) && nums.includes(3) && nums.includes(4) && nums.includes(5)){
                result = 15;
            }else if(nums.includes(3) && nums.includes(4) && nums.includes(5) && nums.includes(6)){
                result = 15;
            }

            return result;
        });

        this.scores.large_straight = new Score((dices) => {
            let result = 0;
            
            let nums = dices.getEachNum()

            if (nums.includes(2) && nums.includes(3) && nums.includes(4) && nums.includes(5) && (nums.includes(6) || nums.includes(1))){
                result = 30;
            }

            return result;
        });

        this.scores.yacht = new Score((dices) => {
            let result = 0;
            
            let nums = dices.getEachNum()

            for(let i in nums){
                if (nums.filter((num) => {
                    return num == i;
                }).length == 5){
                    result = 50;
                }
            }

            return result;
        });

        console.log('YachtScoreBoard created');
    }
    
    subtotal(){
        let result = 0;

        let categories = [this.scores.aces, this.scores.deuces, this.scores.threes, this.scores.fours, this.scores.fives, this.sixes];
        for(let score of categories){
            if (score.isUsed){
                result += score.getScore();
            }
        }
        
        return result;
    }

    getScore(){
        let result = 0;
        for(let score of Object.values(this.scores)){
            if (score.isUsed){
                result += score.getScore();
            }
        }

        if(this.subtotal() >= 63){
            result += 35;
        }

        return result;
    }
}


class YachtPlayer{
    constructor(name){
        this.name = name;
        this.scoreBoard = new YachtScoreBoard();
        console.log(name + " has joined the game.");
    }

    getScoreBoard(){
        return this.scoreBoard;
    }
    
    getScore(){
        return this.scoreBoard.getScore();
    }
}


class Yacht{

}

const diceset = new DiceSet(5, 6);

const player1 = new YachtPlayer('player1');
const player2 = new YachtPlayer('player2');

console.log(diceset.getEachNum());

player1.getScoreBoard().scores.choice.calculation(diceset, true);

console.log(player1.getScoreBoard().getScore());

// while(true){
//     // console.log(diceset.getEachNum());
//     let score;
//     if ((score = player1.getScoreBoard().scores.full_house.calculation(diceset, false)) >= 1){
//         console.log(score);
//         player1.getScoreBoard().scores.full_house.calculation(diceset, true);
//         break;
//     }
//     diceset.rollAll();
// }

// while(true){
//     // console.log(diceset.getEachNum());
//     let score;
//     if ((score = player1.getScoreBoard().scores.small_straight.calculation(diceset, false)) >= 1){
//         console.log(score);
//         player1.getScoreBoard().scores.small_straight.calculation(diceset, true);
//         break;
//     }
//     diceset.rollAll();
// }

// while(true){
//     // console.log(diceset.getEachNum());
//     let score;
//     if ((score = player1.getScoreBoard().scores.large_straight.calculation(diceset, false)) >= 1){
//         console.log(score);
//         player1.getScoreBoard().scores.large_straight.calculation(diceset, true);
//         break;
//     }
//     diceset.rollAll();
// }

// while(true){
//     // console.log(diceset.getEachNum());
//     let score;
//     if ((score = player1.getScoreBoard().scores.yacht.calculation(diceset, false)) >= 1){
//         console.log(score);
//         player1.getScoreBoard().scores.yacht.calculation(diceset, true);
//         break;
//     }
//     diceset.rollAll();
// }

// console.log(player1.getScore());