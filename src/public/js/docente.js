const inputNombre = document.getElementById('inputNombre')
const btnCloseModal = document.getElementById('btnCloseModal')
const btnSuccess = document.getElementById('btnSuccess')
const addNew = document.getElementById('addNew')
const nombreModal = 'Docentes';
const textoTitulo = document.getElementById('textoTitulo')

var registroSeleccionado = ""

addEventListener('DOMContentLoaded', e => {
    addEventListenerOpenAndFillModal()
})

addNew.addEventListener('click',e=>{
    textoTitulo.innerText="Nuevo Docente"
    btnSuccess.innerHTML="Agregar"
    openModal(nombreModal);
})

const addEventListenerOpenAndFillModal = () =>{
    const IDs = document.querySelectorAll('.elementos')
    console.log(IDs);
    IDs.forEach(e=>{
            let id = e.id
            let nombre = e.dataset.nombre
            const btnEditar = document.getElementById('modalEditar'+id)
            console.log(btnEditar);
            btnEditar.addEventListener('click',e =>{
                console.log(id);
                inputNombre.value=nombre
                registroSeleccionado = id
                textoTitulo.innerText="Editar Docente"
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
    data = {
        id : registroSeleccionado,
        nombre :  inputNombre.value
    }
    if (registroSeleccionado.length>0) {
        sendUpdate(data)
    }else{
        sendAdd(data)
    }
    closeModal(nombreModal)
    setTimeout(function () {
        window.location.href = "/docente"
    }, 500);

})

const sendUpdate = (data) => {
    var url = `http://localhost:3000/docente/update`;
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
    var url = 'http://localhost:3000/home/addDocente';
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