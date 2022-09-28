document.querySelector('button').addEventListener('click', getCocktail)

function getCocktail() {
    while (document.contains(document.querySelector('.carousel-cell'))) {
        document.querySelector('.carousel-cell').remove()
    }
    let flkty = new Flickity('.carousel')

    let cocktail = encodeURIComponent(document.querySelector('input').value)
    const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${cocktail}`
    let carouselSlides = document.querySelector(".flickity-slider")

    fetch(url)
        .then(res => res.json())
        .then(data => {
            for (let i = 0; i < data.drinks.length; i++) {
                let drink = data.drinks[i]

                let carouselCell = document.createElement('section')
                carouselCell.classList.add('carousel-cell')
                let drinkName = document.createElement('h2')
                let drinkImage = document.createElement('img')
                let drinkInstructions = document.createElement('h3')

                carouselCell.append(drinkName, drinkImage, drinkInstructions)
                carouselSlides.appendChild(carouselCell)

                drinkName.innerText = drink.strDrink
                drinkImage.src = drink.strDrinkThumb
                drinkInstructions.innerText = drink.strInstructions
            }

            document.querySelector('.carousel').style.visibility = "visible"
            flkty.reloadCells()
            flkty.resize()
        })
        .catch(err => {
            console.log(`error ${err}`)
        })
}