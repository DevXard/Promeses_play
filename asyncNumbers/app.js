
let singleNumber = document.querySelector('#singleNum');
let singNumButton = document.querySelector('#NumButon');
let result = document.querySelector('#result');


singNumButton.addEventListener('click', async function(e){
    e.preventDefault();
    let res = await axios.get(`http://numbersapi.com/${singleNumber.value}?json`)

    let numberFact = document.createElement('li')
    numberFact.innerHTML = `<span>Number ${res.data.number}</span>: ${res.data.text}`
    result.append(numberFact)
       
})


let number = document.querySelector('#multyNums')
let addNumButton = document.querySelector('#addNum')
let getNumsButton = document.querySelector('#getNums')
let numList = document.querySelector('#numbers')

let numsArr = []

addNumButton.addEventListener('click', function(e){
    e.preventDefault()

    let num = document.createElement('span')
    num = number.value + ', '
    numList.append(num)
    numsArr.push(number.value)
})

getNumsButton.addEventListener('click', function(e){
    e.preventDefault()

    let requestsArr = [];

    for(let num of numsArr ){
        requestsArr.push(
            axios.get(`http://numbersapi.com/${num}?json`)
        )
    }

    requestsArr.forEach( async (n) => {
        let numberFact = document.createElement('li')
        let numb = await n
        numberFact.innerHTML = `<span>Number ${numb.data.number}</span>: ${numb.data.text}`
        result.append(numberFact)
    })

})