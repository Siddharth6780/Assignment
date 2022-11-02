const express = require('express')
const app = express()
const port = 3001
const mongoose = require('mongoose');
const cors = require('cors');
const operator = require('./models/operator');
app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://localhost:27017/Assignment')

var calculate = function (s) {
    let stack = [];
    let num = '';
    let sign = null
    for (let i = 0; i <= s.length; i++) {
        const curr = s[i];
        if (curr === ' ') continue;
        if (!isNaN(curr)) num += curr;
        if (isNaN(curr)) {
            num = Number(num)
            switch (sign) {
                case '+':
                case null:
                    stack.push(num)
                    break;
                case '-':
                    stack.push(-num)
                    break;
                case '*':
                    stack.push(stack.pop() * num)
                    break;
                case '/':
                    stack.push(parseInt(stack.pop() / num, 10))
                    break;
            }
            sign = curr;
            num = '';
        }
    }
    return stack.reduce((a, b) => {
        return a + b
    }, 0)
};

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post('/api/test', async function (req, res) {

    const data = await operator.findOne({ isValid: true });
    const result = await req.body;
    let list = result;
    let str = "";

    list.map((item) => {
        let w = item.value;
        if (w === 'A') {
            str += data.A;
        }
        else if (w === 'B') {
            str += data.B;
        }
        else if (w === 'C') {
            str += data.C;
        }
        else if (w === 'D') {
            str += data.D;
        }
        else if (w === 'E') {
            str += data.E;
        }
        else if (w === '+' || w === '-' || w === '*' || w === '/') {
            str += w;
        }
    })


    console.log(str);
    const finalResult = calculate(str);
    console.log(finalResult);


    const op = result[result.length - 2];
    const val = result[result.length - 1];

    if(finalResult === NaN) {
        res.send({ success: "Expression not possible" });
    }
    
    if (op.value === "<") {
        if (val.value > finalResult) {
            res.send({ success: "true" });
        }
        else {
            res.send({ success: "false" });
        }
    }
    else if (op.value === ">") {
        if (val.value < finalResult) {
            res.send({ success: "true" });
        }
        else {
            res.send({ success: "false" });
        }
    }
    else {
        res.send({ success: "Expression not possible" });
    }

})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})