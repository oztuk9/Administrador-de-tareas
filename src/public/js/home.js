/*Buttons*/

//Materia
const btnAddHorarioMateria = document.getElementById('addHorarioMateria')
const btnCloseFechaMateria = document.getElementById('closeFechaMateria')
const btnAgregarFechaHorario = document.getElementById('btnAgregarFechaHorario')
const btnEliminarFechaMateria = document.getElementById('eliminarFechaMateria')
const btnCreateMateria = document.getElementById('btnCreateMateria')

//Tareas
const buttonAddSubtarea = document.getElementById('buttonAddSubtarea')
const closeSubtarea = document.getElementById('closeSubtarea')
const btnAgregarSubtarea = document.getElementById('btnAgregarSubtarea')
const eliminarSubtarea = document.getElementById('eliminarSubtarea')
const btnCrearTarea = document.getElementById('btnCrearTarea')



/*Inputs*/
//Materia
const inputNombreMateria = document.getElementById('inputNombreMateria')
const inputClaveMateria = document.getElementById('inputClaveMateria')
const inputColorMateria = document.getElementById('inputColorMateria')

//Tareas
const inputNombreSubtarea = document.getElementById('inputNombreSubtarea')
const inputDescripcionSubtarea = document.getElementById('inputDescripcionSubtarea')
const inputNombreTarea = document.getElementById('inputNombreTarea')
const inputColorTarea = document.getElementById('inputColorTarea')
const inputFechaTarea = document.getElementById('inputFechaTarea')



/*Selects*/
const selectDiaFechaMateriaComienza = document.getElementById('selectDiaFechaMateriaComienza')
const selectHoraFechaMateriaComienza = document.getElementById('selectHoraFechaMateriaComienza')
const selectMinutoFechaMateriaComienza = document.getElementById('selectMinutoFechaMateriaComienza')
const selectDiaFechaMateriaTermina = document.getElementById('selectDiaFechaMateriaTermina')
const selectHoraFechaMateriaTermina = document.getElementById('selectHoraFechaMateriaTermina')
const selectMinutoFechaMateriaTermina = document.getElementById('selectMinutoFechaMateriaTermina')


const selectHorario = document.getElementById('selectHorario')
const selectDocente = document.getElementById('selectDocente')
const selectAulaAddMateria = document.getElementById('selectAulaAddMateria')
const selectEdificioAddMateria = document.getElementById('selectEdificioAddMateria')
const selectMateria = document.getElementById('selectMateria')
const selectImportanciaTrea = document.getElementById('selectImportanciaTrea')

/*TextAreas*/

const textAreaDescripcionSubtarea = document.getElementById('textAreaDescripcionSubtarea')

const textAreadescripcionTarea = document.getElementById('textAreadescripcionTarea')


const sidebarUsuario = document.getElementById('sidebarUsuario')

         

/*Sidebar*/

sidebarUsuario.addEventListener('click', e => {
    openModal('Usuario');
})  

//Tareas
const selectSubtareas = document.getElementById('selectSubtareas')


/*Frames/Modales*/
const modalAddFechaMateria = document.getElementById('modalAddFechaMateria')

/*Variables globales */
let fechaMateriaJSON = []
let arrayAulas = []
let finalArrayQueryMaterias = []
let arraySubtareas = []
let finalArrayQueryTareas = []


addEventListener('DOMContentLoaded', e => {
    cargarElementosSidebar()
    addEventSidebar()
    addCloseModalEvent();
    fillSelectsDateSubjects()
    obtenerDatosSelectCargadoConDB()
    fillAulas()
})

/*Eventos*/

const addEventSidebar = () => {
    const tareasMenu = document.getElementById('menu-element-1')
    const materiaMenu = document.getElementById('menu-element-2')
    const docenteMenu = document.getElementById('menu-element-3')
    const aulasMenu = document.getElementById('menu-element-4')
    const edificiosMenu = document.getElementById('menu-element-5')
    const addTareasMenu = document.getElementById('addButton1')
    const addMateriaMenu = document.getElementById('addButton2')
    const addDocenteMenu = document.getElementById('addButton3')
    const addAulasMenu = document.getElementById('addButton4')
    const addEdificiosMenu = document.getElementById('addButton5')


    console.log(tareasMenu);

    tareasMenu.addEventListener('click', e => {
        console.log('fue clicado: tareas');
        window.location.href = "/tarea"
    })
    materiaMenu.addEventListener('click', e => {
        console.log('fue clicado: materias');
        window.location.href = "/materia"
    })
    docenteMenu.addEventListener('click', e => {
        console.log('fue clicado: docente');
        window.location.href = "/docente"
    })
    edificiosMenu.addEventListener('click', e => {
        console.log('fue clicado: edificios');
        window.location.href = "/edificio"
    })
    aulasMenu.addEventListener('click', e => {
        console.log('fue clicado: aulas');
        window.location.href = "/aula"
    })

    addTareasMenu.addEventListener('click', e => {
        openModal('AddTareas');
    })
    addMateriaMenu.addEventListener('click', e => {
        openModal('AddMaterias');
    })
    addDocenteMenu.addEventListener('click', e => {
        openModal('AddDocentes');
    })
    addEdificiosMenu.addEventListener('click', e => {
        openModal('AddEdificios')
    })
    addAulasMenu.addEventListener('click', e => {
        openModal('AddAulas')
    })
}

const addCloseModalEvent = () => {
    let count = 0
    const botones = document.querySelectorAll('.closeModal')
    const modalNames = ['Usuario', 'AddTareas', 'AddMaterias', 'AddDocentes', 'AddEdificios', 'AddAulas']
    console.log(botones);
    botones.forEach(e => {
        console.log(e);
        let name = modalNames[count]
        console.log(name);
        e.addEventListener('click', () => {
            console.log(name);
            closeModal(name)
        })
        ++count
    })
}


const llenarArrayElementosMenu = () => {
    jsonMenu = []
    let tareas = `                
    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor"
    class="bi bi-card-checklist" viewBox="0 0 16 16">
    <path
        d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z" />
    <path
        d="M7 5.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm-1.496-.854a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0zM7 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm-1.496-.854a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 0 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0z" />
    </svg>
    <span class="letasMenu">Tareas</span>`

    let materia = `                
    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor"
        class="bi bi-journal-bookmark-fill" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M6 1h6v7a.5.5 0 0 1-.757.429L9 7.083 6.757 8.43A.5.5 0 0 1 6 8V1z" />
        <path
            d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2z" />
        <path
            d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1z" />
    </svg>
    <span class="letasMenu">Materias</span>`

    let docente = `
    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor"
        class="bi bi-person-video3" viewBox="0 0 16 16">
        <path
            d="M14 9.5a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm-6 5.7c0 .8.8.8.8.8h6.4s.8 0 .8-.8-.8-3.2-4-3.2-4 2.4-4 3.2Z" />
        <path
            d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h5.243c.122-.326.295-.668.526-1H2a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v7.81c.353.23.656.496.91.783.059-.187.09-.386.09-.593V4a2 2 0 0 0-2-2H2Z" />
    </svg>
    <span class="letasMenu">Docentes</span>`

    let edificios = `
    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor"
    class="bi bi-building" viewBox="0 0 16 16">
    <path fill-rule="evenodd"
        d="M14.763.075A.5.5 0 0 1 15 .5v15a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5V14h-1v1.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V10a.5.5 0 0 1 .342-.474L6 7.64V4.5a.5.5 0 0 1 .276-.447l8-4a.5.5 0 0 1 .487.022zM6 8.694 1 10.36V15h5V8.694zM7 15h2v-1.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5V15h2V1.309l-7 3.5V15z" />
    <path
        d="M2 11h1v1H2v-1zm2 0h1v1H4v-1zm-2 2h1v1H2v-1zm2 0h1v1H4v-1zm4-4h1v1H8V9zm2 0h1v1h-1V9zm-2 2h1v1H8v-1zm2 0h1v1h-1v-1zm2-2h1v1h-1V9zm0 2h1v1h-1v-1zM8 7h1v1H8V7zm2 0h1v1h-1V7zm2 0h1v1h-1V7zM8 5h1v1H8V5zm2 0h1v1h-1V5zm2 0h1v1h-1V5zm0-2h1v1h-1V3z" />
    </svg>
    <span class="letasMenu">Edificios</span>`

    let aulas = `
    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor"
    class="bi bi-door-open-fill" viewBox="0 0 16 16">
    <path
        d="M1.5 15a.5.5 0 0 0 0 1h13a.5.5 0 0 0 0-1H13V2.5A1.5 1.5 0 0 0 11.5 1H11V.5a.5.5 0 0 0-.57-.495l-7 1A.5.5 0 0 0 3 1.5V15H1.5zM11 2h.5a.5.5 0 0 1 .5.5V15h-1V2zm-2.5 8c-.276 0-.5-.448-.5-1s.224-1 .5-1 .5.448.5 1-.224 1-.5 1z" />
    </svg>
    <span class="letasMenu">Aulas</span>`
    jsonMenu.push(tareas)
    jsonMenu.push(materia)
    jsonMenu.push(docente)
    jsonMenu.push(aulas)
    jsonMenu.push(edificios)
    return jsonMenu
}

const cargarElementosSidebar = () => {
    let count = 0
    bodySidebar.innerHTML = ''
    let jsonMenu = llenarArrayElementosMenu();
    jsonMenu.forEach(e => {
        ++count;
        const elemento = `        
        <div class="div-elementos">
            <div id="menu-element-${count}" class="elentos">
                ${e}
            </div>
            <button id="addButton${count}" class="btn btn-outline-success add-button">
                <svg xmlns="http://www.w3.org/2000/svg" width="30"
                height="30" fill="currentColor" class="bi bi-plus-square-fill" viewBox="0 0 16 16">
                <path
                d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0z" />
                </svg>
            </button>
        </div>`

        bodySidebar.innerHTML += `${elemento}`
    });

}

/*Nueva materia*/

btnAddHorarioMateria.addEventListener('click', e => {
    openSubModal('AddMaterias', 'AddFechaMateria')
})

btnCloseFechaMateria.addEventListener('click', e => {
    closeSubModal('AddMaterias', 'AddFechaMateria')
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
    closeSubModal('AddMaterias', 'AddFechaMateria')
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

//Agregar nueva fecha al 

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


btnCreateMateria.addEventListener('click',e=>{
    let formaData = {
        Nombre : inputNombreMateria.value,
        Clave : inputClaveMateria.value,
        Color : inputColorMateria.value,
        ID_Docente : selectDocente.value,
        ID_Aula : selectAulaAddMateria.value
    } 
    console.log(formaData);
    finalArrayQueryMaterias.push(formaData)
    fechaMateriaJSON.forEach(e =>{
        finalArrayQueryMaterias.push(e)
    })
    console.log(finalArrayQueryMaterias);
    sendFormWithJSONMateria();
    window.location.href = "/home"
})

const sendFormWithJSONMateria = () => {
    var url = 'http://localhost:3000/home/addMateria';

    fetch(url, {
        method: 'POST', // or 'PUT'
        body: JSON.stringify(finalArrayQueryMaterias), // data can be `string` or {object}!
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => {res.json()})
        .catch(error => console.error('Error:', error))
        .then(response => console.log('Success:', response));
}

/*Nueva tarea*/

buttonAddSubtarea.addEventListener('click', e => {
    openSubModal('AddTareas', 'AddSubTarea')
})

closeSubtarea.addEventListener('click', e => {
    closeSubModal('AddTareas', 'AddSubTarea')
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

selectSubtareas.addEventListener('change',e =>{
    console.log(e);
    textAreaDescripcionSubtarea.value = arraySubtareas[selectSubtareas.value].Descripcion
}) 

eliminarSubtarea.addEventListener('click',e=>{
    console.log("Preciono eliminar");
    console.log(selectSubtareas.value);
    arraySubtareas.splice(selectSubtareas.value, 1)
    fillSelectSubtareas()
    textAreaDescripcionSubtarea.value=""
})

selectImportanciaTrea.addEventListener('click',e=>{
    console.log(selectImportanciaTrea.value);
})

btnCrearTarea.addEventListener('click',e=>{
    let formaData = {
        Nombre : inputNombreTarea.value,
        Descripcion : textAreadescripcionTarea.value,
        Color : inputColorTarea.value,
        Fecha : inputFechaTarea.value,
        Importancia : selectImportanciaTrea.value,
        ID_Materia : selectMateria.value
    } 
    console.log(formaData);
    finalArrayQueryTareas.push(formaData)
    arraySubtareas.forEach(e =>{
        finalArrayQueryTareas.push(e)
    })
    console.log(finalArrayQueryTareas);
    sendFormWithJSONTarea();
    closeModal('AddTareas')
    setTimeout(function () {
        window.location.href = "/home"
    }, 500);
})

const sendFormWithJSONTarea = () => {
    var url = 'http://localhost:3000/home/addTarea';

    fetch(url, {
        method: 'POST', // or 'PUT'
        body: JSON.stringify(finalArrayQueryTareas), // data can be `string` or {object}!
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => {res.json()})
        .catch(error => console.error('Error:', error))
        .then(response => console.log('Success:', response));
}