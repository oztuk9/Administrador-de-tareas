//Elementos y variables default para todos los archivos .js

const inputNombre = document.getElementById('inputNombre')
const btnCloseModal = document.getElementById('btnCloseModal')
const btnSuccess = document.getElementById('btnSuccess')
const addNew = document.getElementById('addNew')
const nombreModal = 'Aulas';
const textoTitulo = document.getElementById('textoTitulo')

//Unicos

const selectEdificio = document.getElementById('selectEdificio')



//Funciones default para todos los archivos .js

var registroSeleccionado = ""

addEventListener('DOMContentLoaded', e => {
    addEventListenerOpenAndFillModal()
})

addNew.addEventListener('click',e=>{
    textoTitulo.innerText="Nuevo Aula"
    btnSuccess.innerHTML="Agregar"
    openModal(nombreModal);
})

const addEventListenerOpenAndFillModal = () =>{
    const IDs = document.querySelectorAll('.elementos')
    console.log(IDs);
    IDs.forEach(e=>{
        console.log(e.dataset);
            let id = e.id
            let nombre = e.dataset.nombre
            let ID_Edificio = e.dataset.ID_Edificio
            const btnEditar = document.getElementById('modalEditar'+id)
            console.log(e);
            btnEditar.addEventListener('click',e =>{
                registroSeleccionado = id
                inputNombre.value=nombre
                seleccionarEdificioAula(ID_Edificio)
                textoTitulo.innerText="Editar Aula"
                btnSuccess.innerHTML="Guardar"
                openModal(nombreModal);
            })
    })
}

btnCloseModal.addEventListener('click',e=>{
    registroSeleccionado = ""
    closeModal(nombreModal)
    setTimeout(function () {
        inputNombre.value =""
    }, 500);
})

btnSuccess.addEventListener('click',e=>{
    if (registroSeleccionado.length>0) {
        let data = {
            id : registroSeleccionado,
            nombre :  inputNombre.value,
            ID_Edificio : selectEdificio.value
        }
        sendUpdate(data)
    }else{
        let data = {
            nombre :  inputNombre.value,
            ID_Edificio : selectEdificio.value
        }
        sendAdd(data)
    }
    closeModal(nombreModal)
    setTimeout(function () {
        window.location.href = "/aula"
    }, 500);

})

const sendUpdate = (data) => {
    var url = `http://localhost:3000/aula/update`;
    console.log(url);
    console.log(data);
        fetch(url, {
        method: 'POST', // or 'PUT'
        body: JSON.stringify(data), // data can be `string` or {object}!
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => {res.json()})
        .catch(error => console.error('Error:', error))
        .then(response => console.log('Success:', response));
}

const sendAdd = (data) => {
    var url = 'http://localhost:3000/home/addAula';
    fetch(url, {
        method: 'POST', // or 'PUT'
        body: JSON.stringify(data), // data can be `string` or {object}!
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => {res.json()})
        .catch(error => console.error('Error:', error))
        .then(response => console.log('Success:', response));
}


//Funciones unicas

const seleccionarEdificioAula = (edificioSelect)=>{
    for(var i, j = 0; i = selectEdificio.options[j]; j++) {
        if(i.value == edificioSelect) {
            selectEdificio.selectedIndex = j;
            break;
        }
    }
}