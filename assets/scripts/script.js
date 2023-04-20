//consts & variables
const burgerMenu = document.querySelector('.burger-menu');
const backdrop = document.getElementById('backdrop');
const headerUl = document.getElementById('header-ul');
const headerLi = document.querySelectorAll('.header-ul__li');
const hackEffectTexts = document.querySelectorAll('.hack-effect__text');
const infoSection = document.getElementById('test-section__info');
const buttonsSection = document.getElementById('test-section__buttons');
const questionsSection = document.getElementById('test-section__questions');
const scoreSection = document.getElementById('test-section__score');
const startButton = document.getElementById('startButton');
const progressContent = document.getElementById('progress-content');

let readPages = {
    "Percepția": {"wasRead": false},
    "Învățarea": {"wasRead": false},
    "Psihologia cognitivă": {"wasRead": false},
    "Inteligența": {"wasRead": false},
    "Neuropsihologia": {"wasRead": false}
}

const letters = "abcdefghijklmnopqrstuvwxyz"

let previousPage = 'Pagina-principală';

let numberOfPagesRead = 0;

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
onload = () => {
    if(localStorage.getItem('readPagesData')) {
        readPages = JSON.parse(localStorage.getItem('readPagesData'));
        numberOfPagesRead = parseInt(JSON.parse(localStorage.getItem('numberOfPagesReadData')));
        const percentage = (numberOfPagesRead / 5) * 100;
        progressContent.style.width = `${percentage}%`
        if (numberOfPagesRead == 5) {
            infoSection.classList.remove('display-block');
            buttonsSection.classList.add('display-block')
        }
        for (const liValue in readPages) {
            if (Object.hasOwnProperty.call(readPages, liValue)) {
                const liValueBoolean = readPages[liValue].wasRead;
                if(liValueBoolean) {
                   const pageLeftDiv = document.querySelector(`.page-left[data-value = "${liValue}"]`);
                   pageLeftDiv.remove();
                }
            }
        }
    }
}

burgerMenu.addEventListener('click', toggleHeaderUl)

backdrop.addEventListener('click', toggleHeaderUl)

headerUl.addEventListener('click', event => {
    if (event.target.tagName != 'LI') return;

    const defaultLiValue = event.target.dataset.value;

    const pageLeftDiv = document.querySelector(`.page-left[data-value = "${defaultLiValue}"]`)

    switch (defaultLiValue) {
        case "Percepția":
            if (!readPages.Percepția.wasRead) {
                readPages.Percepția.wasRead = true;
                numberOfPagesRead += 1 ;
                const percentage = (numberOfPagesRead / 5) * 100;
                progressContent.style.width = `${percentage}%`
                pageLeftDiv.remove();
                localStorage.setItem('readPagesData', JSON.stringify(readPages))
                localStorage.setItem('numberOfPagesReadData', JSON.stringify(numberOfPagesRead))
                console.log(readPages)
            }
            break;
    
        case "Învățarea":
            if (!readPages.Învățarea.wasRead) {
                readPages.Învățarea.wasRead = true;
                numberOfPagesRead += 1 ;
                const percentage = (numberOfPagesRead / 5) * 100;
                progressContent.style.width = `${percentage}%`
                pageLeftDiv.remove();
                localStorage.setItem('readPagesData', JSON.stringify(readPages))
                localStorage.setItem('numberOfPagesReadData', JSON.stringify(numberOfPagesRead))
                console.log(readPages)
            }
            break;
        
        case "Psihologia cognitivă":
            if (!readPages["Psihologia cognitivă"].wasRead) {
                readPages["Psihologia cognitivă"].wasRead = true;
                numberOfPagesRead += 1 ;
                const percentage = (numberOfPagesRead / 5) * 100;
                progressContent.style.width = `${percentage}%`
                pageLeftDiv.remove();
                localStorage.setItem('readPagesData', JSON.stringify(readPages))
                localStorage.setItem('numberOfPagesReadData', JSON.stringify(numberOfPagesRead))
                console.log(readPages)
            }
            break;

        case "Inteligența":
            if (!readPages.Inteligența.wasRead) {
                readPages.Inteligența.wasRead = true;
                numberOfPagesRead += 1 ;
                const percentage = (numberOfPagesRead / 5) * 100;
                progressContent.style.width = `${percentage}%`
                pageLeftDiv.remove();
                localStorage.setItem('readPagesData', JSON.stringify(readPages))
                localStorage.setItem('numberOfPagesReadData', JSON.stringify(numberOfPagesRead))
                console.log(readPages)
            }
            break;

        case "Neuropsihologia":
            if (!readPages.Neuropsihologia.wasRead) {
                readPages.Neuropsihologia.wasRead = true;
                numberOfPagesRead += 1 ;
                const percentage = (numberOfPagesRead / 5) * 100;
                progressContent.style.width = `${percentage}%`
                pageLeftDiv.remove();
                localStorage.setItem('readPagesData', JSON.stringify(readPages))
                localStorage.setItem('numberOfPagesReadData', JSON.stringify(numberOfPagesRead))
                console.log(readPages)
            }
            break;
    }

    if (numberOfPagesRead == 5) {
        infoSection.classList.remove('display-block');
        buttonsSection.classList.add('display-block')
    }

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
    ['touchstart', 'mouseover'].forEach(eventName => {
      hackEffectText.addEventListener(eventName, event => {
        let iterations = 0;
        let interval;
  
        const stopAnimation = () => {
          clearInterval(interval);
        };
  
        const startAnimation = () => {
          stopAnimation();
          event.target.innerText = event.target.dataset.value;
          interval = setInterval(() => {
            event.target.innerText = event.target.innerText.split('')
              .map((letter, index) => {
                if(index < iterations) {
                  return event.target.dataset.value[index];
                }
                return letters[Math.floor(Math.random() * 26)]
              })
              .join("");

            if (iterations >= event.target.dataset.value.length) {
                stopAnimation();
            }
  
            iterations += 1 / 3;
  
            if (eventName === 'touchstart' && event.target.innerText.length > event.target.dataset.value.length) {
              stopAnimation();
              iterations = 0;
              event.target.innerText = event.target.dataset.value;
              startAnimation();
            }
          }, 30);
        };
  
        startAnimation();
      });
    });
  });

startButton.addEventListener('click', () => {
    buttonsSection.classList.remove('display-block');
    questionsSection.classList.add('display-block')
})