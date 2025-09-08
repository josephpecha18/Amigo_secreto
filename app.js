// El principal objetivo de este desafío es fortalecer tus habilidades en lógica de programación. Aquí deberás desarrollar la lógica para resolver el problema.

let amigos = []
let nombreAmigoSecreto = ''
let amigoSorteado = null;
document.getElementById('button-refre').disabled = true;
document.getElementById('button-refre').className = "button-disabled";
document.getElementById('button-sort').disabled = true;
document.getElementById('button-sort').className = "button-disabled";

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
    if (!/^[A-Z][a-z]+ [A-Z][a-z]+$/.test(nombreAmigoSecreto)) {
        alert('Por favor, ingrese nombre y apellido, ambas palabras con la inicial en mayúscula.');
        return;
    }
    amigos.push(nombreAmigoSecreto);
    let ul = document.getElementById('listaAmigos');
    ul.innerHTML = '';
    amigos.forEach(function(amigo) {
        let li = document.createElement('li');
        li.textContent = amigo;
        let botonEliminar = document.createElement('button');
        botonEliminar.textContent = 'x';
        botonEliminar.className = 'eliminar-button';
        botonEliminar.id = 'eliminar-button';
        ul.appendChild(li);
        li.appendChild(botonEliminar);
    });
    if (amigos.length >= 2) {
        document.getElementById('button-sort').disabled = false;
        document.getElementById('button-sort').className = "button-draw";
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
    document.getElementById('button-sort')
    document.getElementById('button-sort').disabled = true;
    document.getElementById('button-sort').className = "button-draw";
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
    disabledButtons();
}

function disabledButtons() {
    if (document.getElementById('button-sort')){
        document.getElementById('button-sort').disabled = true;
        document.getElementById('button-sort').className = "button-disabled";
    }
    if (document.getElementById('button-refre')){
        document.getElementById('button-refre').disabled = false;
        document.getElementById('button-refre').className = "button-refresh";
    }
    if (document.getElementById('button-add-id')) {
        document.getElementById('button-add-id').disabled = true;
        document.getElementById('button-add-id').className = "button-add-disabled";
    }
    document.querySelectorAll('.eliminar-button').forEach(button => {
        button.disabled = true;
        button.className= "button-disabled-ul";
    });
}
