//Libreria HystModal
// hyst modal

const myModal = new HystModal({
    linkAttributeName: "data-hystmodal",
	//settings (optional). see API
})



//Creador de carrusel
function crearCarouselCards (recipes) {
    for (let i = 0; i < recipes.length; i++) {
        const recipe = recipes[i];
        
        const carouselItem = document.createElement('div');
        carouselItem.className = 'carousel-item';
        const cardCol = document.createElement('div');
        cardCol.className = 'col-md-3';

        const card = crearCard(recipe)
        
        carouselItem.appendChild(cardCol) 
        cardCol.appendChild(card)     
        mostrarMiniRecetas.appendChild(carouselItem);
      }
}


//Creador de card

function crearCard(recipe){
     
    const card = document.createElement('div');
    card.className = 'receta-card';


    card.onclick = () => { 
        abrirModal(recipe.uuid)
    }

    const cardInfo = document.createElement('div');
    cardInfo.className = 'receta-info';

    const cardStatus = document.createElement('div');
    cardStatus.className = 'receta-status';
    cardStatus.innerHTML = '<i class="fa fa-heart-o" aria-hidden="true"></i>';

    const cardTitle = document.createElement('div');
    cardTitle.className = 'receta-title';

    const title = document.createElement('h3');
    title.className = 'nombreRecetaMini';
    title.textContent = recipe.name;

    const cardImage = document.createElement('div');
    cardImage.className = 'receta-img';

    const image = document.createElement('img');
    image.src = "https://ravioliapp.s3.amazonaws.com/cardPlaceholder.jpg"
    if (recipe.image != "" && recipe.image != undefined){
      image.src = recipe.image;
    }
  

    const tags = document.createElement('ul');
    tags.className = 'receta-tags';

    recipe.tags.forEach(tag => {
      const tagType = document.createElement('li');
    tagType.textContent = tag.name
      if (tag.type == "type") {
      tagType.className = 'tag tag-tipo';
       } if (tag.type == "diet") {
      tagType.className = 'tag tag-dieta';
       } if (tag.type == "time") {
      tagType.className = 'tag tag-tiempo';
      }
      tags.appendChild(tagType);
    });


    
      card.appendChild(cardImage)
      cardImage.appendChild(image);
      
      card.appendChild(cardInfo)
      cardInfo.appendChild(cardStatus)
      cardInfo.appendChild(cardTitle)
      cardTitle.appendChild(title);
      cardInfo.appendChild(tags);

      return card
}

// Generador del carrusel Bootstrap

function generarCarousel() {
    $('.carousel .carousel-item').each(function () {
        var minPerSlide = 4;
        var next = $(this).next();
        if (!next.length) {
        next = $(this).siblings(':first');
        }
    
        next.children(':first-child').clone().appendTo($(this));
        
        for (var i = 0; i < minPerSlide; i++) { next=next.next(); if (!next.length) { next=$(this).siblings(':first'); } next.children(':first-child').clone().appendTo($(this)); } 
    });

}

//Like a recetas

function likeStatus() {
    const likeStatus = document.querySelectorAll('.receta-status');
    likeStatus.forEach(element => {
        element.addEventListener('click', function handleClick() {
            if (element.innerHTML.includes('<i class="fa fa-heart-o" aria-hidden="true"></i>')){
                element.innerHTML = '<i class="fa fa-heart" aria-hidden="true"></i>';
            } else {
                element.innerHTML = '<i class="fa fa-heart-o" aria-hidden="true"></i>';
            }
        })  
    })

    const likeStatusBig = document.querySelectorAll('.rd-status');
    likeStatusBig.forEach(element => {
        element.addEventListener('click', function handleClick() {
            if (element.innerHTML.includes('<i class="fa fa-heart-o" aria-hidden="true"></i>')){
                element.innerHTML = '<i class="fa fa-heart" aria-hidden="true"></i>';
            } else {
                element.innerHTML = '<i class="fa fa-heart-o" aria-hidden="true"></i>';
            }
        })  
    })
}


//Abrir el modal de la receta especifica

function abrirModal(id) {
    fetch('http://34.202.241.96/recipe/' + id)
    .then(response => response.json())
    .then(recipe => {
      modalReceta(recipe)
    });
}

//Creador del modal

function modalReceta(recipe){
    document.getElementById("rd-title").innerHTML = recipe.name;
    document.getElementById("rd-desc").innerHTML = recipe.description;
    const image = document.getElementById("rd-image")
    image.src = "https://ravioliapp.s3.amazonaws.com/cardPlaceholder.jpg"
     if (recipe.image != "" && recipe.image != undefined){
      image.src = recipe.image;
    };
    const tags = document.getElementById("rd-tags") 
    tags.innerHTML = "";
    recipe.tags.forEach(tag => {
        const tagType = document.createElement('li');
      tagType.textContent = tag.name
        if (tag.type == "type") {
        tagType.className = 'tag tag-tipo';
         } if (tag.type == "diet") {
        tagType.className = 'tag tag-dieta';
         } if (tag.type == "time") {
        tagType.className = 'tag tag-tiempo';
        }
        tags.appendChild(tagType);
      });
    const instructions = document.getElementById("rd-instructions") 
    instructions.innerHTML = "";
    recipe.instructions.forEach(instruction => {
        const liInstruction = document.createElement('li');
        liInstruction.textContent = instruction
        liInstruction.className = 'rd-single-intruction';
        instructions.appendChild(liInstruction);
      });
    const ingredients = document.getElementById("rd-ingredients") 
    ingredients.innerHTML = "";
    recipe.ingredients.forEach(ingredient => {
          const liIngredient = document.createElement('li');
          liIngredient.textContent = ingredient
          liIngredient.className = 'rd-single-ingredient';
          ingredients.appendChild(liIngredient);
        });
    myModal.open("#myModal")
    setBotonAgregarAlCarrito(recipe)
}

//  Buscador de recetas

function searchRecipe(etiqueta) {
    fetch('http://34.202.241.96/recipes')
    .then(response => response.json())
    .then(recipes => {
        const filteredRecipes = recipes.filter(recipe => {
            return recipe.tags.some(tag => tag.name === etiqueta);
        });
        const recipe = filteredRecipes[getRandomInt(filteredRecipes.length)]
        modalReceta(recipe)
     })
}

//Numero random en cierto rango, para receta random
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

// Enviar mail
function alertaMail() {
    const mail = document.getElementById("correoLista").value;
    localStorage.setItem('correo', mail);
    document.getElementById("correolc").textContent = mail;
    myModal.open("#alertaMailModal") 
}

function getCarrito() {
    let recetasEnCarrito = localStorage.getItem("recetasEnCarrito");
    if (recetasEnCarrito === null) {
        return []
    }
    return JSON.parse(recetasEnCarrito)
}

function borrarListeners(elementoOriginal) {
    const elementoClonado = elementoOriginal.cloneNode(true);
    elementoOriginal.parentNode.replaceChild(elementoClonado, elementoOriginal);
    return elementoClonado
}

// Agregar a la lista
function setBotonAgregarAlCarrito(recipe) {
    console.log("SET")
    const carrito = getCarrito()

    let botonCart = document.getElementById("rd-cart");
    botonCart.innerHTML = '<i class="fa fa-cart-plus" aria-hidden="true"></i>';
    botonCart = borrarListeners(botonCart)

    console.log("CARRITO", carrito)
    console.log("RECIPE", recipe)
    const existe = carrito.some(recipeCarrito => recipeCarrito.uuid === recipe.uuid )
    if (!existe) {
        console.log("NO EXISTE")
        botonCart.addEventListener('click', function handleClick() {
            botonCart.innerHTML = '<i class="fa fa-check-circle-o" aria-hidden="true"></i>';
            carrito.push(recipe);
            localStorage.setItem("recetasEnCarrito", JSON.stringify(carrito));
            botonCart = borrarListeners(botonCart)
        })
    } else {
        console.log("EXISTE")
        botonCart.innerHTML = '<i class="fa fa-check-circle-o" aria-hidden="true"></i>';
    }
}

function borrarDelCarrito() {
    
}
