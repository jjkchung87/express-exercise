const {calculateMean, calculateMode, calculateMedian} = require("./app")


describe("calculate mean", function(){
    test('when multiple numbers', () => {
        let mean = calculateMean([1,3,5])
        expect(mean).toEqual(3)
    })

    test('when single number',() => {
        let mean = calculateMean([10])
        expect(mean).toEqual(10)
    })
})

describe("calculate median", function(){
    test('with odd numbers', () => {
        let median = calculateMedian([1,3,5])
        expect(median).toEqual(3)
        
    })

    test('with even numbers',() => {
        let median = calculateMedian([1,2,3,4])
        expect(median).toEqual(2)
    })
})

describe("calculate mode", function(){
    test("with a clear mode", () => {
        let mode = calculateMode([1,3,3,5])
        expect(mode).toEqual([3])
    })

    test('when all the same count of numbers',() => {
        let mode = calculateMode([1,2,3,4,5])
        expect(mode).toEqual(null)
    })
    
    test('when multiple modes',() => {
        let mode = calculateMode([1,2,2,3,3,4,5])
        expect(mode).toEqual([2,3])
    })
})