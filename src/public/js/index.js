/*Buttons*/

//Sidebar
const closeSidebar = document.getElementById('closeSidebar')
const btnOpenSidebar = document.getElementById('btnOpenSidebar')

/*Frames/Modales*/
const sidebar = document.getElementById('sidebar')
const bodySidebar = document.getElementById('bodySidebar')
 

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

/*Modales*/

const openModal = (modalName) => {
    console.log('fue clicado en ', modalName);
    const modalContenedor = document.querySelector('.divModales')
    const modal = document.querySelector('#modal' + modalName)
    modalContenedor.classList.remove('no-visible')
    modal.classList.remove('no-visible')
    modal.classList.remove('animate__backOutUp')
    modal.classList.add('animate__backInDown')
}

const openSubModal = (modalName, subModalName) => {
    const modal = document.querySelector('#modal' + modalName)
    const subModal = document.querySelector('#subModal' + subModalName)
    modal.classList.remove('animate__backInDown')
    modal.classList.add('animate__backOutUp')
    setTimeout(function () {
        modal.classList.add('no-visible')
        subModal.classList.remove('no-visible')
        subModal.classList.remove('animate__backOutUp')
        subModal.classList.add('animate__backInDown')
    }, 500);
}

const closeModal = (modalName) => {
    const modal = document.querySelector('.divModales')
    const modalAddAula = document.querySelector('#modal' + modalName)
    modalAddAula.classList.remove('animate__backInDown')
    modalAddAula.classList.add('animate__backOutUp')
    setTimeout(function () {
        modal.classList.add('no-visible')
        modalAddAula.classList.add('no-visible')
    }, 500);
}

const closeSubModal = (modalName, subModalName) => {
    const modal = document.querySelector('#modal' + modalName)
    const subModal = document.querySelector('#subModal' + subModalName)
    subModal.classList.remove('animate__backInDown')
    subModal.classList.add('animate__backOutUp')
    setTimeout(function () {
        subModal.classList.add('no-visible')
        modal.classList.remove('no-visible')
        modal.classList.remove('animate__backOutUp')
        modal.classList.add('animate__backInDown')
    }, 500);
}