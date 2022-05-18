const goRegister = document.querySelector('#goRegister')
const goLogin = document.querySelector('#goLogin')
const cardLogin = document.querySelector('#cardLogin')
const cardRegister = document.querySelector('#cardRegister')


goRegister.addEventListener('click', e => {
    cardLogin.classList.remove('animate__flipInY')
    cardRegister.classList.remove('animate__flipOutY')
    cardLogin.classList.add('animate__flipOutY')
    setTimeout(function () {
        cardLogin.classList.add('no-visible')
        cardRegister.classList.remove('no-visible')
        cardRegister.classList.add('animate__flipInY')
    }, 500);
})

goLogin.addEventListener('click', e => {
    cardLogin.classList.remove('animate__flipOutY')
    cardLogin.classList.remove('animate__flipInY')
    cardRegister.classList.add('animate__flipOutY')
    setTimeout(function () {
        cardLogin.classList.remove('no-visible')
        cardRegister.classList.add('no-visible')
        cardLogin.classList.add('animate__flipInY')
    }, 500);
})