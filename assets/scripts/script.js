//consts & variables
const burgerMenu = document.querySelector('.burger-menu');
const backdrop = document.getElementById('backdrop');
const headerUl = document.getElementById('header-ul');
const headerLi = document.querySelectorAll('.header-ul__li');
const hackEffectTexts = document.querySelectorAll('.hack-effect__text');

const letters = "abcdefghijklmnopqrstuvwxyz"

// functions
function toggleHeaderUl () {
    burgerMenu.classList.toggle('burger-active')
    backdrop.classList.toggle('display-block')
    headerUl.classList.toggle('display-flex')
    setTimeout(() => {
        headerUl.classList.toggle('width-70')
    }, 1);

    setTimeout(() => {
        headerLi.forEach(li => {
            li.classList.toggle('opacity-1')
        })
    }, 200);
}

// event listeners
burgerMenu.addEventListener('click', toggleHeaderUl)

backdrop.addEventListener('click', toggleHeaderUl)

headerUl.addEventListener('click', event => {
    if (event.target.tagName != 'LI') return;

    toggleHeaderUl();
})

hackEffectTexts.forEach(hackEffectText => {
    hackEffectText.onmouseover = event => {
        let iterations = 0;
    
        const interval = setInterval(() => {
            event.target.innerText = event.target.innerText.split('')
                .map((letter, index) => {
                    if(index < iterations) {
                        return event.target.dataset.value[index];
                    }
    
                    return letters[Math.floor(Math.random() * letters.length)]
                })
                .join("")
                if (iterations >= event.target.dataset.value.length) {
                    clearInterval(interval)
                }
    
                iterations += 1 / 3;
        }, 30);
    
    }
})