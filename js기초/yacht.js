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
        this.scores = {};

        this.scores.ace = new Score((dices) => {
            let result = 0;
            let nums = dices.map((dice) => {
                return dice.getNum();
            });

            for(let i in nums){
                if (i == 1){
                    result += i;
                }
            }

            return result;
        });

        this.scores.deuce = new Score((dices) => {
            let result = 0;
            let nums = dices.map((dice) => {
                return dice.getNum();
            });

            for(let i in nums){
                if (i == 1){
                    result += i;
                }
            }

            return result;
        });
    }
}


class Yacht{

}

const diceset = new DiceSet(5, 6);
console.log(diceset.getEachNum());