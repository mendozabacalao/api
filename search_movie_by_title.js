let pagina = 1;
const btnAnterior = document.getElementById('btnAnterior');
const btnSiguiente = document.getElementById('btnSiguiente');


btnSiguiente.addEventListener('click', () => {
    if (pagina < 1000) {
        pagina += 1;
        cargarPeliculas();
    }


});



btnAnterior.addEventListener('click', () => {
    if (pagina > 1) {
        pagina -= 1;
        cargarPeliculas();
    }


});


function getInputValue() {
    var inputVal = document.getElementById("myInput").value
    return inputVal
        ;
}

valor = getInputValue();
// console.log(valor);

//valor = 'nicolas'

// const respuesta = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=fd5e373641ded13be888fbabc64d709a&language=en-US&query=${demo}&page=1&include_adult=false${pagina}`);




/* Listening for a click event on the button with the id of BotonBuscar. When the button is clicked, it
calls the function cargarPeliculas. */
BotonBuscar.addEventListener('click', () => {
    cargarPeliculas();
});

myInput.addEventListener('keypress', () => {
    cargarPeliculas();
});

/*
myInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        cargarPeliculas();

    }
});
*/

const cargarPeliculas = async () => {
    try {

        valor = getInputValue()
        console.log(valor)

        respuesta = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=fd5e373641ded13be888fbabc64d709a&language=en-US&query=${valor}&lenguage=es-MX&page=${pagina}`);
        // const respuesta = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=fd5e373641ded13be888fbabc64d709a&language=en-US&query=harry`);


        console.log(respuesta);

        //si la respuesta es correcta
        if (respuesta.status === 200) {
            const datos = await respuesta.json();

            let peliculas = '';
            datos.results.forEach(pelicula => {
                peliculas += `
                <div class='pelicula'>
               <img class= 'poster' src='https://image.tmdb.org/t/p/w500/${pelicula.poster_path}'> 
               <h3class='titulo'>   ${pelicula.title}</h3>
                </div> 
                `;

            });

            document.getElementById('contenedor').innerHTML = peliculas;

        } else if (respuesta.status === 400) {
            console.log('Coloque mal la llave');
        } else if (respuesta.status === 404) {
            console.log('La pelicula no existe');
        } else {
            console.log('error no determinado');

        }
    } catch (error) {
        console.log(error);
    }

}

