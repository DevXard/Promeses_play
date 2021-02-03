// let mockAjaxRequest = new Promise(function(resolve, reject) {
//     let probSuccess = 0.5;
//     let requestTimeout = 1000;

//     setTimeout(function() {
//         let randomTime = Math.random();

//         if (randomTime < probSuccess) {
//             let data = 'Here is your data';
//             resolve(data);
//         }else{
//             reject("Sorry, your request faild.");
//         }
//     }, requestTimeout); 
// })

// mockAjaxRequest
// .then( data => console.log(data))
// .catch(err => console.log(err))

let singleNumber = document.querySelector('#singleNum');
let singNumButton = document.querySelector('#NumButon');
let result = document.querySelector('#result');


singNumButton.addEventListener('click', function(e){
    e.preventDefault();

    axios.get(`http://numbersapi.com/${singleNumber.value}?json`)
        .then( data => {
            let numberFact = document.createElement('li')
            numberFact.innerHTML = `<span>Number ${data.data.number}</span>: ${data.data.text}`
            result.append(numberFact)
        })
        .catch( err => console.log(err))
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

    Promise.all(requestsArr)
        .then(numsData => (
            numsData.forEach(n => {
                let numberFact = document.createElement('li')
                numberFact.innerHTML = `<span>Number ${n.data.number}</span>: ${n.data.text}`
                result.append(numberFact)
            })
        ))
        .catch(err => console.log(err))
})