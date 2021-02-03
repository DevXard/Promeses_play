
let pokeButton = document.querySelector('#pokemon')
let container = document.querySelector('#pokInfo')

pokeButton.addEventListener('click', async function(e){
    e.preventDefault();

    for(let i = 0; i < 3; i++){
        let pok = new Pokemon
        await pok.getPokemon()
        let pCard = document.createElement('div')
        pCard.innerHTML = `
            <h2>${pok.info.name}</h2>
            <img src="${pok.info.info.pokemonImg}">
            <p>${pok.info.info.pokemonInfo}</p>
        `
        container.append(pCard)
    }
    // let pok = new Pokemon

    // await pok.getPokemon()
    // console.log(pok.info)
})

class Pokemon{
    constructor(){
        this.arr;
        this.info;
    }
    async getPokemon(){
        let res = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=1000`)
        let data = res.data.results
        console.log(res)

            this.info = {
            name: data[this.randNumber(1000)].name,
            info : await this.onePokemon(data[this.randNumber(1000)].name)
            }

    }

    randNumber(num){
        let ranNum = Math.floor(Math.random() * num)
        return ranNum
    }
    
    async onePokemon(name){
        let res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
        let specInfo = await axios.get(res.data.species.url)
        let flavText = this.getEnFlavText(specInfo.data.flavor_text_entries)
        
        return {
            pokemonInfo: flavText.flavor_text,
            pokemonImg: res.data.sprites.front_default
        }
    }

    getEnFlavText(arr){
        for(let text of arr){
            if(text.language.name === 'en'){
                return text
            }
        }
    }
}