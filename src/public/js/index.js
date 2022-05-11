const btnOpenSidebar = document.getElementById('btnOpenSidebar')
const sidebar = document.getElementById('sidebar')
const closeSidebar = document.getElementById('closeSidebar')
const bodySidebar = document.getElementById('bodySidebar')
const sidebarUsuario = document.getElementById('sidebarUsuario')

sidebarUsuario.addEventListener('click',e => {
    openModal('Usuario');
})

let jsonMenu = []

addEventListener('DOMContentLoaded', e => {
    cargarElementosSidebar()
    addEventSidebar()
    addCloseModalEvent();
})

const addEventSidebar = () => {
    const tareasMenu = document.getElementById('menu-element-1')
    const materiaMenu = document.getElementById('menu-element-2')
    const docenteMenu = document.getElementById('menu-element-3')
    const edificiosMenu = document.getElementById('menu-element-4')
    const aulasMenu = document.getElementById('menu-element-5')
    const addTareasMenu = document.getElementById('addButton1')
    const addMateriaMenu = document.getElementById('addButton2')
    const addDocenteMenu = document.getElementById('addButton3')
    const addEdificiosMenu = document.getElementById('addButton4')
    const addAulasMenu = document.getElementById('addButton5')


    console.log(tareasMenu);

    tareasMenu.addEventListener('click', e => {
        console.log('fue clicado: tareas');
    })
    materiaMenu.addEventListener('click', e => {
        console.log('fue clicado: materias');
    })
    docenteMenu.addEventListener('click', e => {
        console.log('fue clicado: docente');
    })
    edificiosMenu.addEventListener('click', e => {
        console.log('fue clicado: edificios');
    })
    aulasMenu.addEventListener('click', e => {
        console.log('fue clicado: aulas');
    })

    addTareasMenu.addEventListener('click', e => {
        openModal('Tareas');
    })
    addMateriaMenu.addEventListener('click', e => {
        openModal('Materias');
    })
    addDocenteMenu.addEventListener('click', e => {
        openModal('Docentes');
    })
    addEdificiosMenu.addEventListener('click', e => {
        openModal('Edificios')
    })
    addAulasMenu.addEventListener('click', e => {
        openModal('Aulas')
    })
}

const openModal = (modalName) => {
    console.log('fue clicado en ',modalName);
    const modal = document.querySelector('.divModales')
    const modalAddAula = document.querySelector('#modalAdd'+modalName)
    modal.classList.remove('no-visible')
    modalAddAula.classList.remove('no-visible')
    modalAddAula.classList.remove('animate__backOutUp')
    modalAddAula.classList.add('animate__backInDown')
}

const addCloseModalEvent = () => {
    let count = 0 
    const botones = document.querySelectorAll('.closeModal')
    const modalNames = ['Usuario','Tareas','Materias','Docentes','Edificios','Aulas']
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

const closeModal = (modalName) =>{
    const modal = document.querySelector('.divModales')
    const modalAddAula = document.querySelector('#modalAdd'+modalName)
    modalAddAula.classList.remove('animate__backInDown')
    modalAddAula.classList.add('animate__backOutUp')
    setTimeout(function () {
        modal.classList.add('no-visible')
        modalAddAula.classList.add('no-visible')
    }, 500);
}


btnOpenSidebar.addEventListener('click', e => {
    btnOpenSidebar.classList.add('no-visible')
    sidebar.classList.remove('animate__fadeOutLeft')
    sidebar.classList.add('animate__fadeInLeft')
    sidebar.classList.remove('no-visible')
})

closeSidebar.addEventListener('click', e => {
    sidebar.classList.remove('animate__fadeInLeft')
    sidebar.classList.add('animate__fadeOutLeft')
    setTimeout(function () {
        btnOpenSidebar.classList.remove('no-visible')
        sidebar.classList.add('no-visible')
    }, 500);
})

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
    jsonMenu.push(edificios)
    jsonMenu.push(aulas)
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
