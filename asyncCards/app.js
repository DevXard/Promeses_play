let button = document.querySelector('#button')
let table = document.querySelector('#table')
let decId;

button.addEventListener('click', async function(e){
    e.preventDefault()

    
    
    if(!decId){
        let res = await axios.get(`https://deckofcardsapi.com/api/deck/new/draw/?count=1`)
            
            console.log(res.data.cards[0].image)
            decId = res.data.deck_id
            let img = document.createElement('img')
            img.setAttribute('src', res.data.cards[0].image)
            img.setAttribute('class', 'card')
            table.append(img)
            
    }else{
        let res = await axios.get(`https://deckofcardsapi.com/api/deck/${decId}/draw/?count=1`)
                
                let img = document.createElement('img')
                img.setAttribute('src', res.data.cards[0].image)
                img.setAttribute('class', 'card')
                table.append(img)
    }
    
})