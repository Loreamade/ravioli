// Entrega Final
// Alumna: Lorena Muñoz


// Creador cards
const mostrarMiniRecetas = document.querySelector('#carousel-recipes-container');

fetch('/JS/recipes.json')
  .then(response => response.json())
  .then(recipes => {
    crearCarouselCards(recipes)
    generarCarousel()
    likeStatus()
  });




