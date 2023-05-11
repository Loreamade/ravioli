// Entrega Final
// Alumna: Lorena Muñoz


// Creador cards
const mostrarMiniRecetas = document.querySelector('#carousel-recipes-container');

fetch('https://www.ronetto.dev/ravioli/recipes')
  .then(response => response.json())
  .then(recipes => {
    crearCarouselCards(recipes)
    generarCarousel()
    likeStatus()
  });




