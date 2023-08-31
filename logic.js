// Defining constant
const foodSound = new Audio("/food.mp3");
const gameoverSound = new Audio("/gameover.mp3");
const moveSound = new Audio("/move.mp3");
const musicSound = new Audio("/music.mp3");
let lastpaint = 0;
let snakepos = [{x:12, y:10}];
let scoreValue = 0;
let speed = 8;
let increase=0;
let board = document.getElementsByClassName("board")[0];
let scoreBoard=document.getElementById("scoreboard");
let highscoreBoard=document.getElementById("highscore");
let left=document.getElementById("left");
let right=document.getElementById("right");
let topi=document.getElementById("top");
let bottom=document.getElementById("bottom");
let inputdir={x:0,y:0};
 foodpos = { x: 12, y: 2 };

let hiscoreval=0;

//creating food
let hiscore = localStorage.getItem("hiscore");
if(hiscore === null){
    hiscoreval = 0;
  //  highscoreBoard.innerHTML = "HiScore: " + hiscore;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
}
else{
    hiscoreval = JSON.parse(hiscore);
    highscoreBoard.innerHTML = "HIGHSCORE: " + hiscoreval;
}

function isCollide(snakepos)
{
    if(snakepos[0].x<=0 || snakepos[0].y<=0 ||snakepos[0].x>=18 || snakepos[0].y>=18)
    {
        return true;
    }
    let a=snakepos[0].x;
    let b=snakepos[0].y;
    for(let i=1;i<snakepos.length;i++)
    {
        if(a==snakepos[i].x && b==snakepos[i].y)
            return true;

    }
    
    return false;
}







///writing main logic..
function gameEngine() {
    if (isCollide(snakepos)) {
        gameoverSound.play();
        inputdir={x:0,y:0};
        snakepos = [{x:12, y:10}];
        foodpos = { x: 12, y: 2 };
        scoreValue = 0;
        increase=0.1;
        scoreBoard.innerHTML="SCORE: 0";
    
     //   scoreBoard.innerHTML="SCORE: 0";
        // musicSound.play();
        localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
        alert("Game Over!");
    }
   // console.log(snakepos[0].,"  " ,snakepos[0].y );
    if(snakepos[0].x===foodpos.y && snakepos[0].y===foodpos.x)
    {
       foodSound.play();
       scoreValue+=1;
       scoreBoard.innerHTML="SCORE: "+scoreValue;
       increase+=.1;
       if(scoreValue>hiscoreval)
       {
            hiscoreval=scoreValue;
            highscoreBoard.innerHTML="HIGHSCORE: "+hiscoreval;
       }
    
      snakepos.unshift({x:snakepos[0].x+inputdir.x,y:snakepos[0].y+inputdir.y});
       let a=2;
       let b=16;
       foodpos={x:(Math.round(a+(b-a)*Math.random())),y:(Math.round(a+(b-a)*Math.random()))};
    }
    for(let i=snakepos.length-2;i>=0;i--)
    {
        snakepos[i+1]={...snakepos[i]};
    }
    snakepos[0].x+=inputdir.x;
    snakepos[0].y+=inputdir.y;
    board.innerHTML="";
    snakepos.forEach((e,index) =>
    {

        let headElement = document.createElement('div');
        headElement.style.gridRowStart = e.y;
        headElement.style.gridColumnStart =e.x;
        
        if(index===0)
        {
            
            headElement.classList.add("head")
        }
        else
        {
            headElement.classList.add("snake");
            
        }
        board.appendChild(headElement);

    }
    );

    foodElement = document.createElement("div");
    foodElement.style.gridRowStart = foodpos.x;
    foodElement.style.gridColumnStart = foodpos.y;
    foodElement.classList.add("food")
    board.appendChild(foodElement);



    //creating snkae

}
//musicSound.play();
function main(ctime) {

    window.requestAnimationFrame(main);
    // console.log("hellow bai");
    if ((ctime - lastpaint) / 1000 < 1 / (speed+increase)) {
        return;
    }
    // alert("hellow");
    lastpaint = ctime;
    //console.log( speed+(increase));
    gameEngine();

}




window.requestAnimationFrame(main);

left.addEventListener("click",()=>{
    inputdir={x:-1,y:0};

});

right.addEventListener("click",()=>{
    inputdir={x:1,y:0};

});

topi.addEventListener("click",()=>{
    inputdir={x:0,y:-1};

});

bottom.addEventListener("click",()=>{
    inputdir={x:0,y:1};

});
window.addEventListener("keydown", e => {
     inputdir = { x: 0, y: 0 };

    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp ");
            inputdir.x = 0;
            inputdir.y = -1;
            break;
        case "ArrowDown":
            console.log("ArrowDown ");
            inputdir.x = 0;
            inputdir.y = 1;
            break;
        case "ArrowLeft":
            console.log("ArrowLeft ");
            inputdir.x = -1;
            inputdir.y = 0;
            break;
        case "ArrowRight":
            console.log("ArrowRight ");
            inputdir.x = +1;
            inputdir.y = 0;
            break;
    }

})
