//Steps in Javascript:
//1.Validation
//2.Add Cards
//3.Add Event on buttons
//4.Sorting of Cards
//5.Date and time (current)

activateButtons();
document.querySelector("form").addEventListener("submit",(e)=>{
    e.preventDefault();
    
    let firstname = e.target.children[0].value,
    lastname = e.target.children[1].value,
    country = e.target.children[2].value,
    score = e.target.children[3].value;

    errorPrompter = document.querySelector(".main_error-prompter");
    errorPrompter.style.display = "none";

    if(firstname == "" || lastname == "" || country == "" || score == ""){
        return (errorPrompter.style.display = "block");
    }

    let mainContainerScoreboard = document.querySelector(".main-scoreboard-container");
    
    let scoreBoardElement = document.createElement("div");
    scoreBoardElement.classList.add("main-scoreboard");
    scoreBoardElement.innerHTML = 
    `<div class="main-scoreboard>
        <div>
            <p class="main_player-name">${firstname} ${lastname}</p>
            <p class="main_time-stamp">${generateDateAndTime()}</p>
        </div>
        <p class="main_player-country">${country}</p>
        <p class="main_player-score">${score}</p>
        <div class="main_scoreboard-btn-container">
            <button>&#x1f5d1;</button>
            <button>+5</button>
            <button>-5</button>
        </div>
    </div>
    `
    mainContainerScoreboard.appendChild(scoreBoardElement);
    sortScoreBoard();
    activateButtons();
});

function activateButtons(){
    document.querySelectorAll(".main_scoreboard-btn-container").forEach((e)=>{
        e.addEventListener("click",(e)=>{
            let buttonClicked = e.target.textContent;
            let scoreOfPlayer = e.target.parentElement.parentElement.children[2];

            if(buttonClicked === '🗑'){
                e.target.parentElement.parentElement.remove();
            }
            else if(buttonClicked === "+5"){
                scoreOfPlayer.innerText = parseInt(scoreOfPlayer.innerText) + 5;
            }else{
                scoreOfPlayer.innerText = parseInt(scoreOfPlayer.innerText) - 5;
            }
            sortScoreBoard();
        });
    });
}

function sortScoreBoard(){
    let scoreboardcontainer = document.querySelector(".main-scoreboard-container");
    let scoreboard = document.querySelectorAll(".main-scoreboard");

    let elementsInArray = [];
    scoreboard.forEach((el)=> elementsInArray.push(el));

    console.log(elementsInArray);
    let sortedElements = elementsInArray.map((el)=>{
        return el;
    })
    .sort((a,b)=>{
        let numA = parseInt(a.children[2].textContent),
        numB = parseInt(b.children[2].textContent)

        if(numA > numB) return -1;
        if(numA < numB) return 1;
    });

    sortedElements.forEach((el)=>{
        scoreboardcontainer.append(el);
    })
}

function generateDateAndTime(){
    let dateObj = new Date();
    let month = dateObj.toLocaleString("default",{month:"short"});
    // console.log(month);
    day = dateObj.getDate();
    year = dateObj.getFullYear();
    time = dateObj.toLocaleTimeString().slice(0,8);
    // console.log(time);

    let result = `${month} ${year}: ${time}`
    return result;
}