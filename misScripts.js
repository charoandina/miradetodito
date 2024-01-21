//VARIABLES
let selector = document.getElementById("seleccionarTipo");
let archivo = 'peliculas.json'
let input = document.getElementById("miInput");
let botonBuscar = document.getElementById("botonBuscar");
let lista = document.getElementById("miListado");

//ESCUCHADORES DE EVENTOS
selector.addEventListener('change', cambiarArchivo);
input.addEventListener('keydown', buscarListado);
botonBuscar.addEventListener('click', buscarRecomendacion);


//FUNCIONES
function cambiarArchivo(){
    archivo = selector.value;
    let evento = new CustomEvent('cambioModo');
    selector.dispatchEvent(evento);
}

function buscarListado(evento){
    if ((evento.keyCode < 65 || evento.keyCode > 90) && evento.keyCode !=  8 && evento.keyCode != 32) {
        evento.preventDefault();   
    }
}

function buscarRecomendacion (){
    lista.innerHTML = "";

    fetch(archivo)
    .then(respuesta => respuesta.json())
    .then((salida) => {
        for (let items of salida.data) {
            if (items.nombre.startsWith(input.value.toUpperCase())) {
                let p = document.createElement('p');
                p.id = items.nombre;
                p.innerHTML = items.sinopsis;
                p.style.display = 'none';

                let li = document.createElement('li');
                li.innerHTML = items.nombre;

                let img = document.createElement('img');
                img.src = items.imagen;
                img.style.display = 'none';
                img.classList.add('centrada-horizontalmente');
                
                li.addEventListener('mouseover', function(){
                    let p = document.getElementById(items.nombre);
                    let img = document.getElementById(items.nombre + "-img");
                    p.style.display = 'block';
                    img.style.display= 'block';
                });

                li.addEventListener('mouseout', function () {
                    let p = document.getElementById(items.nombre);
                    let img = document.getElementById(items.nombre + "-img");
                    p.style.display = 'none';
                    img.style.display = 'none';
                });

                li.appendChild(p);
                lista.appendChild(li);
                img.id = items.nombre + "-img";
                lista.appendChild(img);
                }
        }
    })
    .catch(function (error){
        console.log(error);
    })
}

//FUNCIONES CAROUSEL IMG

document.addEventListener("DOMContentLoaded", function() {
    const carouselWrapper = document.getElementById("carouselWrapper");
    let currentIndex = 0;
    const totalImages = carouselWrapper.children.length;
  
    // Clona 100img y las agrega al final del carrusel
    for (let i = 0; i < 100; i++) {
      const clone = carouselWrapper.children[i].cloneNode(true);
      carouselWrapper.appendChild(clone);
    }
  
    function nextSlide() {
      currentIndex = (currentIndex + 1) % totalImages;
      updateCarousel();
    }
  
    function updateCarousel() {
      const translateValue = currentIndex * -100;
      carouselWrapper.style.transform = `translateX(${translateValue}%)`;
    }
  
    // Configura el intervalo para cambiar automáticamente las imágenes cada cierto tiempo
    let interval = setInterval(nextSlide, 4000);
  
    // Pausa el intervalo cuando el mouse entra al carrusel y lo reanuda cuando sale
    carouselWrapper.addEventListener("mouseenter", function() {
      clearInterval(interval);
    });
  
    carouselWrapper.addEventListener("mouseleave", function() {
      interval = setInterval(nextSlide, 4000);
    });
  });