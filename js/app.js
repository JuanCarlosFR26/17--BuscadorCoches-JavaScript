// Variables
const marca = document.querySelector('#marca');
const year = document.querySelector('#year');
const minimo = document.querySelector('#minimo');
const maximo = document.querySelector('#maximo');
const puertas = document.querySelector('#puertas');
const transmision = document.querySelector('#transmision');
const color = document.querySelector('#color');

// Contenedor para los resultados
const resultado = document.querySelector('#resultado');


const max = new Date().getFullYear();
const min = max - 10;

// Generar un objeto con la búsqueda ( se almacena la búsqueda )
const datosBusqueda = {
    marca : '',
    year : '',
    minimo : '',
    maximo: '',
    puertas: '',
    transmision : '',
    color : ''
}



// Eventos
document.addEventListener('DOMContentLoaded', () => {
    // Muestra los coches al cargar
    mostrarCoches(coches);

    // Llena las opciones del año
    llenarSelect();

})

// Event Listener para los select de búsqueda
marca.addEventListener('change', e => {
    datosBusqueda.marca = e.target.value;  // Se introduce en el objeto en marca

    filtrarCoche();
});

year.addEventListener('change', e => {
    datosBusqueda.year = e.target.value;  // Se introduce en el objeto en year

    filtrarCoche();
});

minimo.addEventListener('change', e => {
    datosBusqueda.minimo = e.target.value;  // Se introduce en el objeto en minimo

    filtrarCoche();
});

maximo.addEventListener('change', e => {
    datosBusqueda.maximo = e.target.value;  // Se introduce en el objeto en maximo

    filtrarCoche();
});

puertas.addEventListener('change', e => {
    datosBusqueda.puertas = parseInt( e.target.value );  // Se introduce en el objeto en puertas

    filtrarCoche();
});

transmision.addEventListener('change', e => {
    datosBusqueda.transmision = e.target.value;  // Se introduce en el objeto en transmision

    filtrarCoche();
});

color.addEventListener('change', e => {
    datosBusqueda.color = e.target.value;  // Se introduce en el objeto en color

    filtrarCoche();

    console.log(datosBusqueda); // Se muestra el objeto lleno con los datos escogidos en select
});


// Funciones
function mostrarCoches(coches) {

    limpiarHTML(); // Elimina el HTML previo
    coches.forEach( coche => {

        const { marca, modelo, year, puertas, transmision, precio, color } = coche;
        const cocheHTML = document.createElement('p');

        cocheHTML.textContent = `
            ${marca} ${modelo} - ${year} - ${puertas} Puertas - Transmisión: ${transmision} - Precio: ${precio} - Color: ${color}
        `;


        // Insertar en el HTMl
        resultado.appendChild(cocheHTML);
    })
}

// Limpiar HTML por el appendChild()
function limpiarHTML() {
    while(resultado.firstChild) {
        resultado.removeChild(resultado.firstChild)
    }
}

// Genera los años del select
function llenarSelect() {

    for( let i = max; i >= min; i--) {
        const opcion = document.createElement('option');
        opcion.value = i;
        opcion.textContent = i;
        year.appendChild(opcion); // Agrega las opciones de año al select
    }

}


// Función que filtra en base a la búsqueda. Funciones de alto nivel
function filtrarCoche() {
    const resultado = coches.filter( filtrarMarca).filter( filtrarYear ).filter( filtrarMinimo ).filter( filtrarMaximo ).filter( filtrarPuertas ).filter( filtrarTransmision ).filter( filtrarColor );

    if( resultado.length ) {
        mostrarCoches(resultado);
    } else {
        noResultado();
    }
}

function noResultado() {

    limpiarHTML();
    
    const noResultado = document.createElement('div');
    noResultado.classList.add('alerta', 'error');
    noResultado.textContent = 'No hay resultados para su búsqueda';
    resultado.appendChild(noResultado);
}

function filtrarMarca(coche) {
    if( datosBusqueda.marca ) {
        return coche.marca === datosBusqueda.marca;
    }
    return coche;
}

function filtrarYear(coche) {
    if( datosBusqueda.year ) {    // Los datos de select son strings, hay que pasarlos a int
        return coche.year === parseInt(datosBusqueda.year);
    }
    return coche;
}

function filtrarMinimo(coche) {
    const { minimo } = datosBusqueda;
    if( minimo ) {    
        return coche.precio >= minimo;
    }
    return coche;
}

function filtrarMaximo(coche) {
    const { maximo } = datosBusqueda;
    if( maximo ) {   
        return coche.precio <= maximo;
    }
    return coche;
}

function filtrarPuertas(coche) {
    const { puertas } = datosBusqueda;
    if( puertas ) {   
        return coche.puertas === puertas;
    }
    return coche;
}

function filtrarTransmision(coche) {
    const { transmision } = datosBusqueda;
    if( transmision) {
        return coche.transmision === transmision;
    }
    return coche;
}

function filtrarColor(coche) {
    const { color } = datosBusqueda;
    if( color ) {
        return coche.color === color;
    }
    return coche;
}

// Mostrar mensaje al no concordar el resultado con los filtros de búsqueda:
function mostrarMensaje() {

}