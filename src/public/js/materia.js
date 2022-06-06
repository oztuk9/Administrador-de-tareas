//Elementos y variables default para todos los archivos .js

const inputNombre = document.getElementById('inputNombre')
const btnCloseModal = document.getElementById('btnCloseModal')
const btnSuccess = document.getElementById('btnSuccess')
const addNew = document.getElementById('addNew')
const nombreModal = 'Materias';
const textoTitulo = document.getElementById('textoTitulo')

//Unicos
/*Buttons*/

//Materia
const btnAddHorarioMateria = document.getElementById('addHorarioMateria')
const btnCloseFechaMateria = document.getElementById('closeFechaMateria')
const btnAgregarFechaHorario = document.getElementById('btnAgregarFechaHorario')
const btnEliminarFechaMateria = document.getElementById('eliminarFechaMateria')

/*Inputs*/
//Materia
const inputClaveMateria = document.getElementById('inputClaveMateria')
const inputColorMateria = document.getElementById('inputColorMateria')


/*Selects*/
//Materia
const selectHorario = document.getElementById('selectHorario')
const selectDiaFechaMateriaComienza = document.getElementById('selectDiaFechaMateriaComienza')
const selectHoraFechaMateriaComienza = document.getElementById('selectHoraFechaMateriaComienza')
const selectMinutoFechaMateriaComienza = document.getElementById('selectMinutoFechaMateriaComienza')
const selectDiaFechaMateriaTermina = document.getElementById('selectDiaFechaMateriaTermina')
const selectHoraFechaMateriaTermina = document.getElementById('selectHoraFechaMateriaTermina')
const selectMinutoFechaMateriaTermina = document.getElementById('selectMinutoFechaMateriaTermina')

//variables unicas
let finalArrayQueryMaterias = []
let fechaMateriaJSON = []
let arrayAulas = []
let arrayHorarios = []


//Funciones default para todos los archivos .js

var registroSeleccionado = ""

addEventListener('DOMContentLoaded', e => {
    addEventListenerOpenAndFillModal()
    fillSelectsDateSubjects()
    obtenerDatosSelectCargadoConDB()
    fillAulas()
    obtenerHorarios()
})

addNew.addEventListener('click', e => {
    textoTitulo.innerText = "Nueva Materia"
    btnSuccess.innerHTML = "Agregar"
    openModal(nombreModal);
})

const addEventListenerOpenAndFillModal = () => {
    const IDs = document.querySelectorAll('.elementos')
    console.log(IDs);
    IDs.forEach(e => {
        console.log(e.dataset);
        let id = e.id
        let nombre = e.dataset.nombre
        let color = e.dataset.color
        let clave = e.dataset.clave
        let ID_Docente = e.dataset.id_docente
        let ID_Aula = e.dataset.id_aula
        let ID_Edificio = e.dataset.id_edificio
        let data = {
            id,
            nombre,
            color,
            clave,
            ID_Docente,
            ID_Aula,
            ID_Edificio
        }
        console.log(data);
        const btnEditar = document.getElementById('modalEditar' + id)
        console.log(e);
        btnEditar.addEventListener('click', e => {
            registroSeleccionado = id
            inputNombre.value = nombre
            inputClaveMateria.value = clave
            inputColorMateria.value = color
            seleccionarDocente(ID_Docente)
            seleccionarEdificioAula(ID_Edificio)
            fillAulas()
            seleccionarAula(ID_Aula)
            textoTitulo.innerText = "Editar Materia"
            btnSuccess.innerHTML = "Guardar"
            openModal(nombreModal);
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

btnSuccess.addEventListener('click', e => {
    let formaData = {
        Id: registroSeleccionado,
        Nombre: inputNombre.value,
        Clave: inputClaveMateria.value,
        Color: inputColorMateria.value,
        ID_Docente: selectDocente.value,
        ID_Aula: selectAulaAddMateria.value
    }
    console.log(formaData);
    finalArrayQueryMaterias.push(formaData)
    fechaMateriaJSON.forEach(e => {
        finalArrayQueryMaterias.push(e)
    })
    console.log(finalArrayQueryMaterias);
    if (registroSeleccionado.length > 0) {
        sendUpdate(data)
    } else {
        sendAdd(finalArrayQueryMaterias)
    }
    closeModal(nombreModal)
    setTimeout(function () {
        window.location.href = "/materia"
    }, 500);

})



const sendUpdate = (data) => {
    var url = `http://localhost:3000/materia/update`;
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
    var url = 'http://localhost:3000/home/addMateria';
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


//Funciones unicas


btnAddHorarioMateria.addEventListener('click', e => {
    openSubModal(nombreModal, 'AddFechaMateria')
})

btnCloseFechaMateria.addEventListener('click', e => {
    closeSubModal(nombreModal, 'AddFechaMateria')
})

btnAgregarFechaHorario.addEventListener('click', e => {
    newFechaMateria = {
        Dia: selectDiaFechaMateriaComienza.value,
        HoraComienza: selectHoraFechaMateriaComienza.value + ":" + selectMinutoFechaMateriaComienza.value,
        HoraTermina: selectHoraFechaMateriaTermina.value + ":" + selectMinutoFechaMateriaTermina.value
    }
    fechaMateriaJSON.push(newFechaMateria)
    console.log(fechaMateriaJSON);
    console.log(JSON.stringify(fechaMateriaJSON));
    fillSelectHorario()
    closeSubModal(nombreModal, 'AddFechaMateria')
})


//Llenar selects fecha Materia

const fillSelectsDateSubjects = () => {
    let dia = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo']
    for (let i = 0; i < dia.length; i++) {
        var option = document.createElement("option");
        option.value = i;
        option.text = dia[i];
        selectDiaFechaMateriaComienza.add(option);
    }
    for (let i = 0; i < 24; i++) {
        var option = document.createElement("option");
        if (i <= 9) {
            option.value = '0' + i;
            option.text = '0' + i;
        } else {
            option.value = i;
            option.text = i;
        }
        selectHoraFechaMateriaComienza.add(option);
        var option2 = document.createElement("option");
        if (i <= 9) {
            option2.value = '0' + i;
            option2.text = '0' + i;
        } else {
            option2.value = i;
            option2.text = i;
        }
        selectHoraFechaMateriaTermina.add(option2);
    }

    for (let i = 0; i < 60; i++) {
        var option = document.createElement("option");
        if (i < 9) {
            option.value = '0' + i;
            option.text = '0' + i;
        } else {
            option.value = i;
            option.text = i;
        }
        selectMinutoFechaMateriaComienza.add(option);
        var option2 = document.createElement("option");
        if (i < 9) {
            option2.value = '0' + i;
            option2.text = '0' + i;
        } else {
            option2.value = i;
            option2.text = i;
        }
        selectMinutoFechaMateriaTermina.add(option2);
    }
}

//Agregar nueva fecha al select de horarios

const fillSelectHorario = () => {
    selectHorario.innerHTML = ''
    let count = 0
    fechaMateriaJSON.forEach(e => {
        let dia
        switch (e.Dia) {
            case "0":
                dia = "Lunes"
                break;
            case "1":
                dia = "Martes"
                break;
            case "2":
                dia = "Miercoles"
                break;
            case "3":
                dia = "Jueves"
                break;
            case "4":
                dia = "Viernes"
                break;
            case "5":
                dia = "Sabado"
                break;
            case "6":
                dia = "Domingo"
                break;
            default:
                break;
        }
        var option = document.createElement("option");
        option.value = count;
        option.text = dia + "-" + e.HoraComienza + "-" + e.HoraTermina;
        selectHorario.add(option)
        ++count
    })
}

btnEliminarFechaMateria.addEventListener('click', e => {
    console.log("Preciono eliminar");
    console.log(selectHorario.value);
    fechaMateriaJSON.splice(selectHorario.value, 1)
    fillSelectHorario()
})

//Rellenar select de aulas dependiendo que edificio seleccione
const obtenerDatosSelectCargadoConDB = () => {
    console.log(selectAulaAddMateria.length);
    for (let i = 0; i < selectAulaAddMateria.length; i++) {
        let aula = {
            "ID": selectAulaAddMateria.options[i].attributes[0].value,
            "ID_Edificio": selectAulaAddMateria.options[i].attributes[1].value,
            "Nombre": selectAulaAddMateria.options[i].attributes[2].value
        }
        console.log("ID: ", selectAulaAddMateria.options[i].attributes[0].value, " ID_Edificio: ", selectAulaAddMateria.options[i].attributes[1].value, " Nombre: ", selectAulaAddMateria.options[i].attributes[2].value);
        arrayAulas.push(aula)
    }
    console.log(arrayAulas);
}

const fillAulas = () => {
    selectAulaAddMateria.innerHTML = ""
    console.log(selectEdificioAddMateria.value);
    for (let i = 0; i < arrayAulas.length; i++) {
        if (arrayAulas[i].ID_Edificio == selectEdificioAddMateria.value) {
            console.log(arrayAulas[i]);
            console.log(arrayAulas[i].ID);
            console.log(arrayAulas[i].Nombre);
            var option = document.createElement("option");
            option.value = arrayAulas[i].ID;
            option.text = arrayAulas[i].Nombre;
            selectAulaAddMateria.add(option)
        }
    }
}

selectEdificioAddMateria.addEventListener('change', e => {
    fillAulas()
})

const seleccionarEdificioAula = (edificioSelect) => {
    for (var i, j = 0; i = selectEdificioAddMateria.options[j]; j++) {
        if (i.value == edificioSelect) {
            selectEdificioAddMateria.selectedIndex = j;
            break;
        }
    }
}

const seleccionarAula = (aulaSelect) => {
    for (var i, j = 0; i = selectAulaAddMateria.options[j]; j++) {
        if (i.value == aulaSelect) {
            selectAulaAddMateria.selectedIndex = j;
            break;
        }
    }
}

const seleccionarDocente = (docenteSelect) => {
    for (var i, j = 0; i = selectDocente.options[j]; j++) {
        if (i.value == docenteSelect) {
            selectDocente.selectedIndex = j;
            break;
        }
    }
}

const obtenerHorarios = ()=>{
    console.log(selectHorario.length);
    for (let i = 0; i < selectHorario.length; i++) {
        console.log(selectHorario.options[i].attributes);
        
        let horarios = {
            "ID": selectHorario.options[i].attributes[0].value,
            "Dia": selectHorario.options[i].attributes[1].value,
            "Comienza": selectHorario.options[i].attributes[2].value,
            "Termina" : selectHorario.options[i].attributes[3].value,
            "Id_materia" : selectHorario.options[i].attributes[4].value,
        }
        console.log(horarios);
        arrayHorarios.push(horarios)
    }
    console.log(arrayHorarios);
}

const fillSelectHorarioEspecificMateria = (materia)=>{

}