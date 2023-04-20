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
const questionsAnswered = document.getElementById('questionsAnswered');
const questionsText = document.getElementById('questionText');
const answersContainer = document.querySelector('.answers-container');
const answers = document.querySelectorAll('.answer');
const answerButton = document.getElementById('answerButton');
const pointsText = document.getElementById('points');
const gradeText = document.getElementById('grade');
const exitButton = document.getElementById('exitButton');
const scoreText = document.getElementById('score-text');

let readPages = {
    "Percepția": {"wasRead": false},
    "Învățarea": {"wasRead": false},
    "Psihologia cognitivă": {"wasRead": false},
    "Inteligența": {"wasRead": false},
    "Neuropsihologia": {"wasRead": false}
}

const questions = [
    'În momentele de tensiune reușesc să rămân calm și relaxat.',
    'Reușesc să identific sentimentele negative fără a deveni supărat.',
    'Atunci când trebuie să rezolv o problemă rămân concentrat - nu mă pierd în detalii și nu amân.',
    'Recunosc din proprie inițiativă atunci când am greșit.',
    'Sunt sensibil la emoțiile și stările celorlalți.',
    'Pot să accept criticile fără a deveni defensiv.',
    'Mă calmez repede atunci când sunt nervos sau supărat.',
    'Reușesc să-mi comunic necesitățile și sentimentele cu sinceritate.',
    'Reușesc să `mă adun` repede după un eșec.',
    'Îmi dau seama de modul în care comportamentul meu îi afecteaza pe ceilalți.',
    'Ascult cu atenție înainte de a trage concluziile.',
    'Îmi rezerv timp frecvent - o data la 2-4 săptămâni - pentru a reflecta la locul meu în lume și la viziunea asupra vieții.',
    'Aproximativ 10% din slujba mea este mai dificil decât restul lucrurilor pe care le fac.',
    'Evit aproximativ 10% din slujba mea, deoarece mi se pare a fi mai dificil.',
    'Dacă nu ar trebui să fac aproximativ 10% din slujba mea, locul de muncă ar fi mult mai plăcut.',
    'Nu fac cu prea mare plăcere partea cea mai dificilă a slujbei mele (aproximativ 10%), însă atunci când termin sunt mandru și încrezator.'
];

let leftQuestions = questions.slice();

const letters = "abcdefghijklmnopqrstuvwxyz"

let previousPage = 'Pagina-principală';

let numberOfPagesRead = 0;

let numberOfQuestionsAnswered = 1;

let totalScore = 0;

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

function handleQuestion () {
    const selectedAnswer = document.querySelector('.selected-answer')
    const valueOfSelectedAnswer = parseInt(selectedAnswer.dataset.value);

    totalScore += valueOfSelectedAnswer;
    
    if(answerButton.innerText == 'Termină testul') {
        let grade = (( totalScore / 80) * 10).toFixed(1)
        questionsSection.classList.remove('display-block');
        pointsText.innerText = `${totalScore}`;
        gradeText.innerText = grade;
        scoreSection.classList.add('display-block');
        selectedAnswer.classList.remove('selected-answer');

        if(totalScore < 32) {
            scoreText.innerHTML = `Sinceritatea ta este demnă de laudă. Este posibil să fii un tehnician de geniu sau să ai un 
            coeficient de inteligență peste medie, însă cu inteligența emoțională nu stai prea bine. Se 
            pare că mai ai mult de muncă. Acest scor indică faptul că ai izbucniri dese în fața celorlalți, 
            ești deprimat, sau ai pierdut din vedere care este rostul tău în viață.
            <br>
            <br>
            Te simți dominat de reacțiile emoționale? Te lași în voia sorții și nu îți asumi răspunderea pentru
            direcția în viață? Ești temător și nesigur în fața provocărilor vieții, în loc să fii pasionat și
            motivat? Nu dispera însă. Poți învăța să-ți îmbunătățești inteligența emoțională. În viață 10% 
            constă în lucrurile care ni se întâmplă și 90% se află în puterea noastră de a schimba lucrurile.
            `;
        } else if( totalScore >= 32 && totalScore < 48) {
            scoreText.innerHTML = `Daca ai obținut acest scor înseamnă că ai izbucniri dese în fata colegilor și a prietenilor. 
            Se pare că ai o capacitate scăzută de adaptare la schimbări, stres si dificultăți. Este posibil 
            să ai și simptome depresive sau să simți că ești pierdut pe calea vieții. Te lași în voia sorții 
            și nu îți asumi răspunderea pentru direcția în viață? Ești temător și nesigur în fața provocărilor
            vieții, în loc să fii pasionat și motivat? Poți învăța să-ți îmbunătățești inteligența emoțională.
            <br>
            <br>
            Studii desfășurate pe angajații companiilor de top arată că inteligența emoțională este de două 
            ori mai importantă decât coeficientul de inteligență plus aptitudinile tehnice. Mai ai de lucru 
            în următoarele domenii: începe cu autocunoașterea - întreabă-te "Care sunt situațiile în care devin
             stresat și tensionat? Cum fac față acestor situații?"; "Ce gânduri negative îmi trec prin minte 
            în mod frecvent? Reprezintă acestea o imagine obiectivă a realității?"; "Îmi este frică să îmi 
            dezvălui sentimentele și nevoile celor din jur? Acest lucru se întâmplă pentru că sunt obișnuit 
            să am eu grijă de ceilalți, sau pentru că vreau să par dur?".
            <br>
            <br>
            În situația în care nu ne putem exprima și punem necesitățile altora înaintea alor noastre, 
            există posibilitatea să ne simțim cu sufletul gol, deprimați sau ostili. Nu lăsa să ți se întâmple
            așa ceva. Trebuie să ai grijă de tine. Exprimă-ți necesitățile esențiale, chiar dacă este greu la 
            început. Acesta este un pas de bază în construirea unei inteligențe emoționale. Vei fi mai fericit
            și cei din jur te vor înțelege mai bine. Nu uita că lucrurile pe care nu le putem controla ocupă 
            doar 10% din viața noastră și că avem la dispoziție 90% pentru a ne construi viața așa cum dorim.
            `;
        } else if (totalScore >= 48 && totalScore < 64) {
            scoreText.innerHTML = `Ai un nivel de inteligența emoțională ușor peste medie, ceea ce înseamnă că este loc și 
            de mai bine. Cel mai probabil că ești sensibil la emoțiile celor din jurul tău - prieteni, 
            colegi, membri ai familiei, clienți. Ești conștient de efectul comportamentului tău asupra 
            celorlalți însă, în timp ce ai grijă la nevoile celorlalți, trebuie să ai grijă și de propriile 
            necesități. Nu te teme să comunici cu sinceritate atunci când ești ân dificultate. Nimeni nu are
            nevoie să fii martir.
            <br>
            <br>
            Gândește-te și la pasiunea pentru muncă, sau la orice lucru care ocupă un rol major în viața ta - 
            să-i conduci pe alții, să îndeplinești anumite însărcinări, să ai grijă de necesitățile clienților,
             etc. De multe ori petrecem foarte mult timp îndeplinind aceste roluri, fără plăcere sau satisfacție
            . În tot acest timp riscăm să devenim "amorțiți", rătăciți în detalii și ne complacem în trivial. 
            Bineînțeles că fiecare dintre noi trebuie ăa facem toate aceste treburi mărunte, însă trebuie să 
            știm să ne oprim din când în când și să ne amintim de lucrurile care ne fac fericiți și împliniți. 
            În caz contrar devenim ostili și cinici. Ne pierdem scopul în viață și astfel nu suntem eficienți, 
            relaxați și împliniți.
            <br>
            <br>
            Mai ai de lucru în următoarele domenii: începe cu autocunoșsterea - întreabă-te "Care sunt 
            situațiile în care devin stresat și tensionat? Cum fac față acestor situații?"; "Ce gânduri 
            negative îmi trec prin minte în mod frecvent? Reprezintă acestea o imagine obiectivă a realității?";
             "Îmi este frică să îmi dezvălui sentimentele și nevoile celor din jur? Acest lucru se întâmplă 
            pentru că sunt obișnuit să am eu grijă de ceilalți, sau pentru că vreau să par dur?"; "Care sunt 
            cele 3 lucruri care mă fac să mă simt cel mai împlinit în viață?". Străduindu-te să ai o imagine 
            clară asupra acestor aspecte vei face primul pas în a beneficia de întreg potențialul tău și în a 
            găsi fericirea în viață. Fiecare dintre noi beneficiază de un potențial imens în viață, de care 
            nici nu ne dăm seama.`;
        } else if (totalScore >= 64 && totalScore < 72) {
            scoreText.innerHTML = `
            Felicitări! Beneficiezi de un nivel foarte ridicat de inteligență emoțională. Studii 
            desfășurate pe angajații companiilor de top arată că inteligența emoțională este de doua 
            ori mai importantă decât coeficientul de inteligență plus aptitudinile tehnice. Inteligența 
            emoțională îți este de mare ajutor în carieră.
            <br>
            <br>
            Mai ai de lucru în urmatoarele domenii: Chiar dacă stai foarte bine la acest capitol, oprește-te 
            din când în când din activitățile zilnice pentru a-ți aminti de lucrurile cele mai importante 
            pentru tine și care te fac fericit și împlinit în viață. Altfel riști să te pierzi în detalii și
             să te complaci în trivial. Întradevăr, termenele trebuie să fie respectate și obiectivele trebuie
             să fie îndeplinite însa, dacă alergăm după obiective care nu sunt conform valorilor esențiale în
             viața noastră, riscăm să devenim ostili și cinici și să ne pierdem scopul în viață. Cu alte 
            cuvinte, ne vom pierde bucuria ți entuziasmul în viață și la locul de muncă. Fiecare dintre noi 
            beneficiază de un potențial imens în viață, de care nici nu ne dăm seama.
            `;
        } else if (totalScore >= 72) {
            scoreText.innerHTML = `Sunt impresionat! Tot ceea ce faci reprezintă un sanctuar pentru sufletul tău. Felicitaăi 
            pentru punctajul mare obținut. Acest scor poate fi însa înșelător - poți avea o inteligență
             emoțională ori extrem de ridicată, ori extrem de scăzută. Cum este posibil? Acest rezultat 
            reflectă un nivel ridicat de auto-cunoaștere sau lipsa totală a auto-cunoașterii, de vreme ce 
            trebuie să fii conștient de reacțiile pe care le ai pentru a te putea evalua cu acuratețe. Acesta
             este motivul pentru care auto-cunoașterea este fundamentul inteligenței emoționale. Dacă nu ești 
            sigur, cere părerea unei persoane apropiate pentru a verifica dacă ai răspuns corect la întrebările testului.
            `;
        }
        return;
    }

    
    if(leftQuestions.length >= 2) {
        const randomNumber = Math.floor(Math.random() * leftQuestions.length);
        questionsText.innerText = leftQuestions[randomNumber];
        leftQuestions.splice(randomNumber, 1);
        numberOfQuestionsAnswered += 1;
        questionsAnswered.innerText = `${numberOfQuestionsAnswered}`;
        selectedAnswer.classList.remove('selected-answer')
        deactivateButton();
    } else {
        answerButton.innerText = 'Termină testul';
        questionsText.innerText = leftQuestions[0];
        leftQuestions.pop();
        numberOfQuestionsAnswered += 1;
        questionsAnswered.innerText = `${numberOfQuestionsAnswered}`;
        selectedAnswer.classList.remove('selected-answer')
        deactivateButton()
        return;
    }
    
    

}

function deactivateButton () {
    answerButton.style.cursor = 'not-allowed';
    answerButton.style.background = '#333';
}

function activateButton () {
    answerButton.style.cursor = 'pointer'
    answerButton.style.background = '#8c2b13';
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
    questionsSection.classList.add('display-block');
    
    const randomNumber = Math.floor(Math.random() * leftQuestions.length);
    questionsText.innerText = leftQuestions[randomNumber];

    leftQuestions.splice(randomNumber, 1);

    deactivateButton();
})

answersContainer.addEventListener('click', event => {
    if (event.target.className != 'answer') return;

    activateButton();

    answers.forEach(answer => {
        if (answer == event.target) {
            answer.classList.add('selected-answer');
        } else {
            answer.classList.remove('selected-answer');
        }
    })
})

answerButton.addEventListener('click', () => {
    if (answerButton.style.cursor != 'pointer') return;
    handleQuestion();
})

exitButton.addEventListener('click', () => {
    scoreSection.classList.remove('display-block');
    leftQuestions = questions.slice();
    numberOfQuestionsAnswered = 1;
    questionsAnswered.innerText = `${numberOfQuestionsAnswered}`;
    totalScore = 0;
    answerButton.innerText = 'Răspunde';
    buttonsSection.classList.add('display-block')
})