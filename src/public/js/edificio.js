const nombreEdificio = document.getElementById('nombreEdificio')
const closeModalEdificios = document.getElementById('closeModalEdificios')

addEventListener('DOMContentLoaded', e => {
    addEventListenerOpenAndFillModal()
})

const addEventListenerOpenAndFillModal = () =>{
    const idEdificio = document.querySelectorAll('.elementos')
    console.log(idEdificio);
    idEdificio.forEach(e=>{
        console.log(e);
        console.log(e.id);
        console.log(e.dataset.nombre);
            let id = e.id
            let nombre = e.dataset.nombre
            const btnEditar = document.getElementById('modalEditar'+id)
            console.log(btnEditar);
            btnEditar.addEventListener('click',e =>{
                console.log(id);
                nombreEdificio.value=nombre
                openModal('AddEdificios');
            })
    })
}

closeModalEdificios.addEventListener('click',e=>{
    closeModal('AddEdificios')
})