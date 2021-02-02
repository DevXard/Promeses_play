let button = document.querySelector('#button')
let table = document.querySelector('#table')
let decId;

button.addEventListener('click', function(e){
    e.preventDefault()

    
    console.log(decId)
    if(!decId){
        axios.get(`https://deckofcardsapi.com/api/deck/new/draw/?count=1`)
            .then(data => {
            console.log(data.data.cards[0].image)
            decId = data.data.deck_id
            let img = document.createElement('img')
            img.setAttribute('src', data.data.cards[0].image)
            img.setAttribute('class', 'card')
            table.append(img)
            })
            .catch(err => console.log(err))
    }else{
        axios.get(`https://deckofcardsapi.com/api/deck/${decId}/draw/?count=1`)
            .then(data => {
                
                let img = document.createElement('img')
                img.setAttribute('src', data.data.cards[0].image)
                img.setAttribute('class', 'card')
                table.append(img)
            })
            .catch(err => console.log(err))
    }
    
})