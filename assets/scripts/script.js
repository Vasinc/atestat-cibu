//consts & variables
const burgerMenu = document.querySelector('.burger-menu');
const backdrop = document.getElementById('backdrop');
const headerUl = document.getElementById('header-ul');
const headerLi = document.querySelectorAll('.header-ul__li');
const hackEffectTexts = document.querySelectorAll('.hack-effect__text');

const letters = "abcdefghijklmnopqrstuvwxyz"

let previousPage = 'Pagina-principală';

// functions
function toggleHeaderUl () {
    burgerMenu.classList.toggle('burger-active')
    backdrop.classList.toggle('display-block')
    headerUl.classList.toggle('display-flex')
    if(headerUl.classList.contains('display-flex')) {
        backdrop.scrollIntoView();
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'visible';
    }
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


    // changes sections and changes previousPage
    const liValue = event.target.dataset.value.split(' ').join('-');
    const previousSection = document.getElementById(`${previousPage}`);
    previousSection.classList.remove('display-block');
    const currentSection = document.getElementById(`${liValue}`);
    currentSection.classList.add('display-block');
    previousPage = liValue;

    // changes h1 html
    const sectionH1 = currentSection.querySelector('h1');
    const sectionH1Letters = sectionH1.innerText.split('');

    sectionH1.innerHTML = '';

    sectionH1Letters.forEach(letter => {
        sectionH1.innerHTML += `<span class="h1-letter">${letter}</span>`
    })
        
    const H1Letters = sectionH1.querySelectorAll('.h1-letter');
    
    console.log(H1Letters)

    let lettersIterations = 0;

    const interval = setInterval(() => {
        
        H1Letters[lettersIterations].classList.add('opacity-1')

        if(lettersIterations >= sectionH1Letters.length - 1) {
            clearInterval(interval);
        }

        lettersIterations += 1;

    }, 100);


    // updates Header UL visually
    headerLi.forEach(li => {
        if ( li  == event.target ) {
            li.classList.add('active-li');
        } else {
            li.classList.remove('active-li');
        }
    })
})

hackEffectTexts.forEach(hackEffectText => {
    ['mouseover', 'touchstart'].forEach(eventName => {
        hackEffectText.addEventListener(eventName, event => {
            let iterations = 0;
        
            const interval = setInterval(() => {
                event.target.innerText = event.target.innerText.split('')
                    .map((letter, index) => {
                        if(index < iterations) {
                            return event.target.dataset.value[index];
                        }
        
                        return letters[Math.floor(Math.random() * 26)]
                    })
                    .join("")
                    if (iterations >= event.target.dataset.value.length) {
                        clearInterval(interval)
                    }
        
                    iterations += 1 / 3;
            }, 30);
        });
    });
});

// hackEffectTexts.forEach(hackEffectText => {
//     hackEffectText.onmouseover = event => {
//         let iterations = 0;
    
//         const interval = setInterval(() => {
//             event.target.innerText = event.target.innerText.split('')
//                 .map((letter, index) => {
//                     if(index < iterations) {
//                         return event.target.dataset.value[index];
//                     }
    
//                     return letters[Math.floor(Math.random() * 26)]
//                 })
//                 .join("")
//                 if (iterations >= event.target.dataset.value.length) {
//                     clearInterval(interval)
//                 }
    
//                 iterations += 1 / 3;
//         }, 30);
    
//     }
// })