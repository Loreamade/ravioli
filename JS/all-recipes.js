const contenedorCard = document.querySelector('#c-cards');

fetch('/JS/recipes.json')
  .then(response => response.json())
  .then(recipes => {
    for (let i = 0; i < recipes.length; i++) {
        const recipe = recipes[i];
        const card = crearCard(recipe)
        contenedorCard.appendChild(card)
      }
      
    likeStatus()
  });

