// Entrega Final
// Alumna: Lorena Muñoz


// Creador cards
const mostrarMiniRecetas = document.querySelector('#carousel-recipes-container');

fetch('https://34.202.241.96/recipes')
  .then(response => response.json())
  .then(recipes => {
    crearCarouselCards(recipes)
    generarCarousel()
    likeStatus()
  });




