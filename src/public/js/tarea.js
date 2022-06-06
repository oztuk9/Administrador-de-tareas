const inputNombre = document.getElementById('inputNombre')
const btnCloseModal = document.getElementById('btnCloseModal')
const btnSuccess = document.getElementById('btnSuccess')
const addNew = document.getElementById('addNew')
const nombreModal = 'Tareas';
const textoTitulo = document.getElementById('textoTitulo')
const btnCloseModalStatusTarea = document.getElementById('btnCloseModalStatusTarea')
const btnFinished = document.getElementById('btnFinished')

var registroSeleccionado = ""

//Tareas
const buttonAddSubtarea = document.getElementById('buttonAddSubtarea')
const closeSubtarea = document.getElementById('closeSubtarea')
const btnAgregarSubtarea = document.getElementById('btnAgregarSubtarea')
const eliminarSubtarea = document.getElementById('eliminarSubtarea')
const btnCrearTarea = document.getElementById('btnCrearTarea')



/*Inputs*/

//Tareas
const inputNombreSubtarea = document.getElementById('inputNombreSubtarea')
const inputDescripcionSubtarea = document.getElementById('inputDescripcionSubtarea')
const inputNombreTarea = document.getElementById('inputNombreTarea')
const inputColorTarea = document.getElementById('inputColorTarea')
const inputFechaTarea = document.getElementById('inputFechaTarea')


/*Selects*/

//Tareas
const selectHorario = document.getElementById('selectHorario')
const selectDocente = document.getElementById('selectDocente')
const selectAulaAddMateria = document.getElementById('selectAulaAddMateria')
const selectEdificioAddMateria = document.getElementById('selectEdificioAddMateria')
const selectMateria = document.getElementById('selectMateria')
const selectImportanciaTrea = document.getElementById('selectImportanciaTrea')

/*TextAreas*/

const textAreaDescripcionSubtarea = document.getElementById('textAreaDescripcionSubtarea')

const textAreadescripcionTarea = document.getElementById('textAreadescripcionTarea')

//Tareas
const selectSubtareas = document.getElementById('selectSubtareas')

//Texto
const textoNombreTarea = document.getElementById('textoNombreTarea')
const textoNombreFecha = document.getElementById('textoNombreFecha')
const textoNombreImportancia = document.getElementById('textoNombreImportancia')
const textoNombreMateria = document.getElementById('textoNombreMateria')
const textoNombreDescripcion = document.getElementById('textoNombreDescripcion')

var registroSeleccionado = ""

addEventListener('DOMContentLoaded', e => {
    addEventListenerOpenAndFillModal()
    addEventListenerOpenTarea()
})

addNew.addEventListener('click', e => {
    textoTitulo.innerText = "Nuevo Edificio"
    btnSuccess.innerHTML = "Agregar"
    openModal(nombreModal);
})

const addEventListenerOpenAndFillModal = () => {
    const IDs = document.querySelectorAll('.elementos')
    console.log(IDs);
    IDs.forEach(e => {
        let id = e.id
        let nombre = e.dataset.nombre
        const btnEditar = document.getElementById('modalEditar' + id)
        console.log(btnEditar);
        btnEditar.addEventListener('click', e => {
            openModal(nombreModal);
        })
    })
}

const addEventListenerOpenTarea = () => {
    const IDs = document.querySelectorAll('.elementos')
    console.log(IDs);
    IDs.forEach(e => {
        let importancia
        switch (e.dataset.importancia) {
            case '1':
                importancia = "Poco Importante"
                break;
            case '2':
                importancia = "Importante"
                break;
            case '3':
                importancia = "Muy Importante"
                break;
            case '4':
                importancia = "Finalizada"
                break;

            default:
                break;
        }
        console.log(e.dataset);
        console.log(e);
        let id= e.id
        let nombre = e.dataset.nombre
        let descripcion = e.dataset.descripcion
        let fecha = new Date(e.dataset.fecha)
        let nombre_materia = e.dataset.nombre_materia
        const tarea = document.getElementById(id)
        console.log(tarea);
        tarea.addEventListener('click', e => {
            registroSeleccionado = id
            textoNombreTarea.innerText = nombre
            textoNombreDescripcion.innerText = descripcion
            textoNombreFecha.innerText = fecha.toLocaleString('en-GB', { timeZone: 'UTC' })
            textoNombreMateria.innerText = nombre_materia
            textoNombreImportancia.innerText = importancia
            if (importancia=="Finalizada") {
                btnFinished.classList.add('no-visible')
            }else{
                btnFinished.classList.remove('no-visible')
            }
            openModal('StatusTarea');
        })
    })
}

btnCloseModal.addEventListener('click', e => {
    registroSeleccionado = ""
    closeModal(nombreModal)
    setTimeout(function () {
        inputNombre.value = ""
    }, 500);
})

btnCloseModalStatusTarea.addEventListener('click', e => {
    closeModal('StatusTarea')
})

btnSuccess.addEventListener('click', e => {
    data = {
        Id: registroSeleccionado,
        Nombre: inputNombre.value,
        Descripcion: textAreadescripcionTarea.value,
        Color: inputColorTarea.value,
        Fecha: inputFechaTarea.value,
        Importancia: selectImportanciaTrea.value,
        ID_Materia: selectMateria.value
    }
    finalArrayQueryTareas.push(formaData)
    arraySubtareas.forEach(e => {
        finalArrayQueryTareas.push(e)
    })
    console.log(finalArrayQueryTareas);
    if (registroSeleccionado.length > 0) {
        sendUpdate(data)
    } else {
        sendAdd(data)
    }
    closeModal(nombreModal)
    setTimeout(function () {
        window.location.href = "/tarea"
    }, 500);

})


const sendUpdate = (data) => {
    var url = `http://localhost:3000/edificio/update`;
    console.log(url);
    console.log(data);
    fetch(url, {
        method: 'POST', // or 'PUT'
        body: JSON.stringify(data), // data can be `string` or {object}!
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => { res.json() })
        .catch(error => console.error('Error:', error))
        .then(response => console.log('Success:', response));
}

const sendAdd = (data) => {
    var url = 'http://localhost:3000/home/addEdificio';
    fetch(url, {
        method: 'POST', // or 'PUT'
        body: JSON.stringify(data), // data can be `string` or {object}!
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => { res.json() })
        .catch(error => console.error('Error:', error))
        .then(response => console.log('Success:', response));
}

/*Nueva tarea*/

buttonAddSubtarea.addEventListener('click', e => {
    openSubModal(nombreModal, 'AddSubTarea')
})

closeSubtarea.addEventListener('click', e => {
    closeSubModal(nombreModal, 'AddSubTarea')
})

btnAgregarSubtarea.addEventListener('click', e => {
    newSubtarea = {
        Nombre: inputNombreSubtarea.value,
        Descripcion: inputDescripcionSubtarea.value
    }
    arraySubtareas.push(newSubtarea)
    console.log(arraySubtareas);
    console.log(JSON.stringify(arraySubtareas));
    fillSelectSubtareas()
    textAreaDescripcionSubtarea.value = arraySubtareas[selectSubtareas.value].Descripcion
    closeSubModal('AddTareas', 'AddSubTarea')
    console.log("Se tienen que limpiar los inputs");
    inputNombreSubtarea.value = ""
    inputDescripcionSubtarea.value = ""
})

const fillSelectSubtareas = () => {
    selectSubtareas.innerHTML = ''
    let count = 0
    arraySubtareas.forEach(e => {
        var option = document.createElement("option");
        option.value = count;
        option.text = e.Nombre;
        selectSubtareas.add(option)
        ++count
    })
}

selectSubtareas.addEventListener('change', e => {
    console.log(e);
    textAreaDescripcionSubtarea.value = arraySubtareas[selectSubtareas.value].Descripcion
})

eliminarSubtarea.addEventListener('click', e => {
    console.log("Preciono eliminar");
    console.log(selectSubtareas.value);
    arraySubtareas.splice(selectSubtareas.value, 1)
    fillSelectSubtareas()
    textAreaDescripcionSubtarea.value = ""
})

selectImportanciaTrea.addEventListener('click', e => {
    console.log(selectImportanciaTrea.value);
})

const sendFormWithJSONTarea = () => {
    var url = 'http://localhost:3000/home/addTarea';

    fetch(url, {
        method: 'POST', // or 'PUT'
        body: JSON.stringify(finalArrayQueryTareas), // data can be `string` or {object}!
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => { res.json() })
        .catch(error => console.error('Error:', error))
        .then(response => console.log('Success:', response));
}


btnFinished.addEventListener('click', e => {
    console.log(registroSeleccionado);
    end = {
        id: registroSeleccionado,
        Importancia: "4"
    }
    closeModal(nombreModal)
    finished(end)
    setTimeout(function () {
        window.location.href = "/tarea"
    }, 500);
})

const finished = (data) => {
    var url = `http://localhost:3000/tarea/finished`;
    console.log(url);
    console.log(data);
    fetch(url, {
        method: 'POST', // or 'PUT'
        body: JSON.stringify(data), // data can be `string` or {object}!
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => { res.json() })
        .catch(error => console.error('Error:', error))
        .then(response => console.log('Success:', response));
}
