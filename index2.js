(function () {

const buttonNext = document.querySelector('.realgame');
const chanceButtonsContainer = document.querySelector('.find__chance-container');
const chanceButtonsContainerClone = chanceButtonsContainer.cloneNode(true);
const buttonVariant = document.querySelector('.find__variant');
// const buttonVariant2 = buttonVariant;

const scoreTable = document.querySelector('#score');
const timeTable = document.querySelector('#time');
const startButton = document.querySelector('#buttonStart');

const resultTable = document.querySelector('.find__result');
const buttonOneMoreTime = document.querySelector('.find__omt');
const resultNumber = document.querySelector('#score-result');

//переключение между слоями
const buttonNextLayer = document.querySelector('.info-screen__goals-button');
const firstLayer = document.querySelector('.info-screen');
const secondLayer = document.querySelector('.start-screen');
const timerNumber = document.querySelector('.timer-screen__number');

const readyLayer = document.querySelector('.timer-screen');


let timer;
let time = 10;
timeTable.textContent = `00:${time}`;


let maxvalue = 8; // верхний предел цифр, которые могут быть написаны в кнопках.
let countResult = 0; // счёт игры, добавление очков, если ответ правильный
let CountGoodCallsOfNextValue = 0; //переменная для того чтобы считать чётность-нечетность правильных ответов и в зависимости от этого идти
//в ветку условия добавления новых кнопок

let widthButton; // переменная чтобы менять ширину каждой кнопки в зависимости от их количества.
let reverseNumber = 3; // обратный отсчет
let reverseNumberTimer;




function startGame() {
    maxvalue = 8;
    time= 10;
    countResult = 0;
    scoreTable.textContent = countResult;
    timer = setInterval(countdownTime, 1000);
    setTime(time); 
}

//обратный отсчет времени игры
function countdownTime() {
    if( time === 0) {
        clearInterval(timer)
        finishGame();
        resultTable.classList.add('find__result_visible');
        resultNumber.textContent = countResult;
    }
    else {
        let current = --time;
            if(current < 10) {
                current = `0${current}`;
            }
            setTime(current);
    }
}

function setTime(value) {
    timeTable.textContent = `00:${value}`
}


function finishGame() {
    timeTable.textContent = 'Stop'; 
    chanceButtonsContainer.replaceChildren();
    // chanceButtonsContainer.classList.add('find__chance-container_hidden');
}




function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


//функция добавления очков в зависимости от количества кнопок на экране.
function addPoints() {
    if(chanceButtonsContainer.children.length > 25) {
        return countResult+=10
    }
    
    else if(chanceButtonsContainer.children.length > 16) {
        return countResult+=5
    }

    else if(chanceButtonsContainer.children.length > 12) {
        return countResult+=2
    }
    else return countResult++;
}


//функция клика по кнопке ответа
function nextValue(event) {  
    if(event.target.textContent == buttonNext.textContent) {
        goodClick()
    }
    else {
        CountGoodCallsOfNextValue = 0;
    }

    let arrayOfRandomNumbers = []

    for(item of chanceButtonsContainer.children) {
        item.textContent = getRndInteger(1, maxvalue)
        arrayOfRandomNumbers.push(item.textContent);
        item.style.width = `${widthButton}%`
    }

    var rand = Math.floor(Math.random() * arrayOfRandomNumbers.length);
    buttonNext.textContent = arrayOfRandomNumbers[rand];
}


//действия при правильном ответе
function goodClick() {
    maxvalue +=50;
    addPoints();
    addNewButtons();
    scoreTable.textContent = countResult;
    CountGoodCallsOfNextValue++;
}


// добавление кнопок на каждый второй успешный ответ.
function addNewButtons() {
    let countOfNewButtons = 0;
    
    //если это второй правильный ответ подряд, то тогда добавить новые кнопки
    if(CountGoodCallsOfNextValue % 2) {


        // console.log('добавить кнопки')
        if (chanceButtonsContainer.children.length >= 34) {
            countOfNewButtons = 0; 
        }
       
        else if (chanceButtonsContainer.children.length >= 20) {
            countOfNewButtons = countOfNewButtons + 11;
            // console.log('kol-vo elements' + chanceButtonsContainer.children.length)
            console.log('сколько кнопок добавить: ' + countOfNewButtons)
            widthButton = 15.5;
            chanceButtonsContainer.style.gap = '6.5px';
        }
       
        else if(chanceButtonsContainer.children.length >= 16) {
            countOfNewButtons = countOfNewButtons + 9;
            // console.log('kol-vo elements' + chanceButtonsContainer.children.length)
            console.log('сколько кнопок добавить: ' + countOfNewButtons)
            widthButton = 19;
            chanceButtonsContainer.style.gap = '6px'
        }

        else {
            countOfNewButtons = countOfNewButtons + 4;
            // console.log('сколько кнопок добавить: ' + countOfNewButtons);
        }        
    }


    //если это первый, третий, пятый и т.д. правильный ответ подряд, то тогда не добавлять новые кнопки.
    else {
        console.log('не добавлять кнопки')
        console.log('сколько кнопок добавить: ' + countOfNewButtons)
    }


    // сюда передаем количество кнопок, которое нужно добавить.
    for (let i = 0; i < countOfNewButtons; i++) {
        let newButtonVariant = buttonVariant.cloneNode(true);
        chanceButtonsContainer.append(newButtonVariant);
    }
}






//переключение между слоями
function hideFirstLayer() {
    firstLayer.classList.add('info-screen_hidden');
    secondLayer.classList.add('start-screen_visible')
}

function hideSecondLayer() {
    secondLayer.classList.remove('start-screen_visible');
    readyLayer.classList.add('timer-screen_active');
    readyProcessFunc();
    setTimeout(hideReadyLayer, 3000);
    setTimeout(startGame, 3000);
}


function hideReadyLayer() {
    readyLayer.classList.remove('timer-screen_active');
}


//обратный отсчет 3-2-1
function readyProcessFunc() {
    reverseNumberTimer = setInterval(changeReverseNumber, 1000);
    setReverseNumber(reverseNumber);
}

function changeReverseNumber() {
    if( reverseNumber === 1) {
        clearInterval(reverseNumberTimer);
    }
    else {
        let current = --reverseNumber;
        setReverseNumber(current);
    }
}

function setReverseNumber(value) {
    timerNumber.textContent = value
}


function playAgain() {
    firstLayer.classList.remove('info-screen_hidden');
    reverseNumber = 3;
    resultTable.classList.remove('find__result_visible');
    chanceButtonsContainer.replaceChildren(...chanceButtonsContainerClone.children);
    buttonNext.textContent = 5;
}

buttonOneMoreTime.addEventListener('click', playAgain);
chanceButtonsContainer.addEventListener('click', nextValue);
buttonNextLayer.addEventListener('click', hideFirstLayer);
secondLayer.addEventListener('click', hideSecondLayer);

})();
