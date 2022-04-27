
let overlay = document.querySelector(".overlay")
let start = document.querySelector(".overlay span")
let Name = document.querySelector(".name span")
let timer = document.querySelector(".timer span")
let tries = document.querySelector(".tries span")
let imageContainer = document.querySelector(".image-container")
let cards = Array.from(imageContainer.children) 

let mood = "succes"
let data;
if(window.localStorage.getItem("user")){
    data = JSON.parse(window.localStorage.getItem("user"))
} else {
    data = [];
}

start.onclick = function(){
    document.querySelector("#start").play()
    let helloMessage = prompt("what is your name ?")
    if(helloMessage == null || helloMessage == ""){
        Name.innerHTML = "Unknown"
    } else {
        Name.innerHTML = helloMessage
    }
    overlay.remove()
    window.scroll({
        top:65,
        behavior:"smooth"
    })
    setTimeout(() => {
        cards.forEach((card) => {
            card.classList.add("done")
        })
    },500);
    setTimeout(() => {
        cards.forEach((card) => {
            card.classList.remove("done")
        })
        let timerstop = setInterval(() => {
            timer.innerHTML++;
            let choiseArray = cards.filter(function(card){
                return card.classList.contains("choise")
            })
            if(tries.innerHTML === "10") {
                clearInterval(timerstop)
                mood = "fail"
                readData()
                gameOver()
            } else if (choiseArray.length === cards.length){
                clearInterval(timerstop)
                mood = "succes"
                succesfuct()
                readData()
            }
        },1000)
    }, 2500);
}
let cradsIndex = [...cards.keys()]
shuffle(cradsIndex)

cards.forEach(function(card,index){
    card.style.order = cradsIndex[index]
    card.addEventListener("click",function(){
        doneCard(card)
    })
})

// shuffle fuction 
function shuffle(cradsIndex){
    let current = cards.length,  //20
        temp,
        random;
    while(current > 0) {
        random = Math.floor(Math.random() * current)
        current--
        temp = cradsIndex[current]
        cradsIndex[current] = cradsIndex[random]
        cradsIndex[random] = temp
    }
    return cradsIndex
}

// read data 
function readData(){
    let userInfo = {
        Name : Name.innerHTML,
        time: timer.innerHTML,
        tries: tries.innerHTML,
        complete: "pass",
        history: new Date().toDateString()
    }
    if(mood === "succes"){
        userInfo.complete = "succeeded"
    } else {
        userInfo.complete = "failure"
    }
    data.push(userInfo)
    window.localStorage.setItem("user", JSON.stringify(data))
    showData()
}

// show data 
function showData(){
    let tbody = document.getElementById("tbody")
    tbody.innerHTML =""
    for(let i = 0; i < data.length; i++){
        tbody.innerHTML += `
        <tr>
            <td>${data[i].Name}</td>
            <td>${data[i].time}</td>
            <td>${data[i].tries}</td>
            <td>${data[i].complete}</td>
            <td>${data[i].history}</td>
        </tr>
        `
    }
}
showData()
// done card funtion 
function doneCard(card){
    card.classList.add("done")
    let doneArray = cards.filter(function(cardDone){
        return cardDone.classList.contains("done")
    })
    if(doneArray.length === 2) {
        block()
        matched(doneArray[0],doneArray[1])
    }
}

// block fuction
function block(){
    imageContainer.classList.add("block")
    setTimeout(() => {
        imageContainer.classList.remove("block")
    },2000)
}

// matched fuction
function matched(firstElement,secondElement){
    if(firstElement.dataset.member === secondElement.dataset.member){
        firstElement.classList.add("choise")
        secondElement.classList.add("choise")
        firstElement.classList.remove("done")
        secondElement.classList.remove("done")
        let choiseArray = cards.filter(function(card){
            return card.classList.contains("choise")
        })
        if(choiseArray.length === cards.length){
            mood = "succes"
            succesfuct()
            readData()
        }
        document.getElementById("bravo").play()
    } else {
        setTimeout(() => {
            firstElement.classList.remove("done")
            secondElement.classList.remove("done")
            tries.innerHTML++
        }, 1000);
    }
}

//  game over 
function gameOver(){
    imageContainer.classList.add("block")
    overlay.style.display = "none"
    let gameOver = document.querySelector(".gameover").style.display = "flex"
    let tryAgin = document.querySelector("#try")
    document.querySelector("#start").remove()
    document.querySelector("#lose").play()
    tryAgin.onclick = function(){
        window.location.reload()
    }
}
// succes fuction
function succesfuct(){
    imageContainer.classList.add("block")
    let winner = document.querySelector(".winner").style.display = "flex"
    document.querySelector("#start").remove()
    let win = document.querySelector("#win").play()
    let palyAgain = document.querySelector(".winner button");
    palyAgain.onclick = function(){
        window.location.reload()
    }
}



















// const nums = new Set();
// while (nums.size !== 20) {
//   nums.add(Math.floor(Math.random() * 20) + 1);
// }

// console.log(Array.from(nums));