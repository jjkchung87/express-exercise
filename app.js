const express = require('express')
const ExpressError = require('./expressError')

const app = express();
app.use(express.json()); //For JSON
app.use(express.urlencoded({ extended: true })); //For Form Data

function calculateMean(array) {
    if (array.length === 0) {
        return null;  // Return null for an empty array or handle it as needed
      }
    
      const sum = array.reduce((acc, num) => acc + num, 0);
      const mean = sum / array.length;
      return mean;
}

function calculateMedian(array) {
    if (array.length === 0) {
        return null;  // Return null for an empty array or handle it as needed
      }

    const midPoint = Math.floor((array.length-1)/2);
    const median = array[midPoint];

    return median;

}

function calculateMode(array) {
    if (array.length === 0) {
        return null;  // Return null for an empty array or handle it as needed
    }
    
    const frequency = new Map();
    let maxFrequency = 0;
    let modes = [];

    for (const num of array) {
        if (!frequency.has(num)) {
            frequency.set(num, 1);
        } else {
            frequency.set(num, frequency.get(num) + 1);
        }

        if (frequency.get(num) > maxFrequency) {
            maxFrequency = frequency.get(num);
            modes = [num];
        } else if (frequency.get(num) === maxFrequency) {
            modes.push(num);
        }
    }

    if (modes.length === array.length) {
        return null; // All numbers appear the same number of times
    }

    return modes;
}


app.get("/mean",(req,res, next) => {
    try{
        const numbersStr = req.query.nums

        console.log(req.query)
        
        if(!numbersStr) throw new ExpressError("Numbers are required",400)
        
        const numbers = numbersStr.split(',').map(num => parseInt(num));
        const notNumbers = numbers.filter(num => isNaN(num));
        if (notNumbers.length > 0) {
          throw new ExpressError(`${notNumbers.join(',')} are not numbers`, 400);
        }
    
        const mean = calculateMean(numbers);
        return res.json({ operation: "mean", value: mean });

    } catch(e) {
      next(e)  
    }
})

app.get("/median",(req,res, next) => {
    try{
        const numbersStr = req.query.nums
        
        if(!numbersStr) throw new ExpressError("Numbers are required",400)
        const numbers = numbersStr.split(',').map(num => num);
        console.log(numbers)
        const notNumbers = numbers.filter(num => isNaN(num));
        console.log(notNumbers)
        
        if (notNumbers.length > 0) {
          throw new ExpressError(`${notNumbers.join(', ')} are not numbers`, 400);
        }
    
        const mean = calculateMedian(numbers);
        return res.json({ operation: "median", value: mean });

    } catch(e) {
      next(e)  
    }
})

app.get("/mode",(req,res, next) => {
    try{
        const numbersStr = req.query.nums

        console.log(req.query)
        
        if(!numbersStr) throw new ExpressError("Numbers are required",400)
        const numbers = numbersStr.split(',').map(num => parseInt(num));
        const notNumbers = numbers.filter(num => isNaN(num));
        
        if (notNumbers.length > 0) {
          throw new ExpressError(`${notNumbers.join(', ')} are not numbers`, 400);
        }
    
        const mean = calculateMode(numbers);
        return res.json({ operation: "mode", value: mean });

    } catch(e) {
      next(e)  
    }
})

app.use(function(error, req, res, next) {
    let status = error.status || 500;
    let message = error.msg;

    return res.status(status).json({error: {message, status}});
})


app.listen(3000,function() {
    console.log('App on port 3000')
})


module.exports = {calculateMean, calculateMedian, calculateMode}
