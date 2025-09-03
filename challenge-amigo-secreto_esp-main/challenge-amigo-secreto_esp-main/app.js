// El principal objetivo de este desafío es fortalecer tus habilidades en lógica de programación. Aquí deberás desarrollar la lógica para resolver el problema.

let amigos = []
let nombreAmigoSecreto = ''
let amigoSorteado = null;

function agregarAmigo() {
    let nombreAmigoSecreto = document.getElementById('amigo').value;
    if (nombreAmigoSecreto === '') {
        alert('Por favor, inserte un nombre.');
        return;
    }
    if (amigos.includes(nombreAmigoSecreto)) {
        alert('El nombre ya fue ingresado, por favor ingrese otro nombre.');
        return;
    }
    if (!/^\s*\S+\s+\S+/.test(nombreAmigoSecreto)) {
        alert('Por favor, ingrese nombre y apellido.');
        return;
    } else {
        amigos.push(nombreAmigoSecreto);
        let ul = document.getElementById('listaAmigos');
        ul.innerHTML = '';
        amigos.forEach(function(amigo) {
        let li = document.createElement('li');
        li.textContent = amigo;
        let botonEliminar = document.createElement('button');
        botonEliminar.textContent = 'x';
        botonEliminar.id = 'eliminar-button';
        ul.appendChild(li);
        li.appendChild(botonEliminar);
        });
    }
    console.log(amigos);
    limpiarCampo();
}

function eliminarAmigo() {
    let ul = document.getElementById('listaAmigos');    
    ul.addEventListener('click', function(event) {
        if (event.target.tagName === 'BUTTON' && event.target.id === 'eliminar-button') {
            let nombre = event.target.parentElement.firstChild.textContent;
            amigos = amigos.filter(amigo => amigo !== nombre);
            event.target.parentElement.remove();
        }
    });
}
eliminarAmigo();

function limpiarCampo() {
    document.querySelector('#amigo').value = '';
}

function reiniciarAmigos() {
    amigos = [];
    document.getElementById('listaAmigos').innerHTML = '';
    document.getElementById('resultado').innerHTML = '';
    limpiarCampo();
}

function sortearAmigo () {
    if (amigos.length === 0) {
        amigoSorteado = null;
        alert('Por favor, ingrese al menos un nombre para sortear.');
        return;
    }
    if (amigos.length === 1) {
        alert('No se puede sortear, ingrese al menos dos nombres.');
        return;
    }
    amigoSorteado = amigos[Math.floor(Math.random() * amigos.length)];
    let ul = document.getElementById('resultado');
    ul.innerHTML = '';
    let li = document.createElement('li');
    li.textContent = amigoSorteado;
    ul.appendChild(li);
    document.getElementById('button-draw').disabled = true;
    
}
// al eliminar los amigos tambien se debe eliminar el nombre del amigo sorteado
// el boton de sortear debe deshabilitarse despues de sortear y habilitarse al reiniciar