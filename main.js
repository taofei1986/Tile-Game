let canvas=document.getElementById("gameBoad");//define canvas
let gameDiv=document.getElementById("game");
let startButton=document.querySelector("#startButton");//start button
let shadowPaper=document.querySelector("#shadowPaper");// shadowpaper
let startDiv=document.querySelector("#start");//start div
let context = canvas.getContext("2d");
let policeStationImage=new Image();//define police station Image
let houseImage=new Image();//define house Image
let stoneRoadImage=new Image();//define stone road Image
let stoneRoadLevelImage=new Image();//define stone Road Level Image
let stoneRoadVerticalImage=new Image();//define stone Road Vertical Image
let gameStartBool=false;//define game start state is false
policeStationImage.src="police_station.png";//link police station Image 
houseImage.src= "house.png";//link house Image
stoneRoadImage.src="stone_road_cross.png";//link stone road Image
stoneRoadLevelImage.src="stone_road_level.png";//link stone Road Level Image
stoneRoadVerticalImage.src="stone_road_vertical.png";//link stone Road Vertical Image
let imagewidth=100;//set image width
let map=[// init map value
    [0,4,4,0,4,0,4,0],//row 1
    [3,1,1,3,1,3,1,3],//row 2
    [0,4,4,0,4,0,4,0],//row 3
    [3,1,1,3,1,3,1,3],//row 4
    [3,1,2,3,1,3,1,3],//row 5
    [0,4,4,0,4,0,4,0],//row 6
    [3,1,1,3,1,3,1,3],//row 7
    [0,4,4,0,4,0,4,0],//row 8
];

let loadMap=()=>{//draw the map
    for(let i=0;i<map.length;i++){
        for(let j=0;j<map[i].length;j++){
            switch(map[i][j]){
                case 0://cross shone road
                    context.drawImage(stoneRoadImage,j*imagewidth,i*imagewidth);
                    break;
                case 1://house
                    context.drawImage(houseImage,j*imagewidth,i*imagewidth);
                    break;
                case 2://police station
                    context.drawImage(policeStationImage,j*imagewidth,i*imagewidth);
                    break;
                case 4://vertical stone road
                    context.drawImage(stoneRoadLevelImage,j*imagewidth,i*imagewidth);
                    break;
                case 3://level stone road
                    context.drawImage(stoneRoadVerticalImage,j*imagewidth,i*imagewidth);
                    break;
            default:
                alert("errors!");
            }
        }
    }
}

let gameObejects=[//player and police map 9 is player, 8 is police
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,8,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [9,0,0,0,0,0,0,0],
];
//get player location row and column
let playerRow, playerColumn;
for(let i=0;i<gameObejects.length;i++){
    for(let j=0;j<gameObejects.length;j++){
        if(gameObejects[i][j]==9){
            playerRow=i;
            playerColumn=j;
            break;
        }
    }
}
//display player's image by player position
let playerImage=document.createElement("img");
playerImage.setAttribute("class","cellImage");
playerImage.src="criminal.png";
gameDiv.appendChild(playerImage);
playerImage.style.top=playerRow*imagewidth+"px";
playerImage.style.left=playerColumn*imagewidth+"px";
//get police location row and column
let policeRow,policeColumn;
for(let i=0;i<gameObejects.length;i++){
    for(let j=0;j<gameObejects.length;j++){
        if(gameObejects[i][j]==8){
            policeRow=i;
            policeColumn=j;
            break;
        }
    }
}
//display police's image by police position
let policeImage=document.createElement("img");
policeImage.setAttribute("class","cellImage");
policeImage.src="police.png";
gameDiv.appendChild(policeImage);
policeImage.style.top=policeRow*imagewidth+"px";
policeImage.style.left=policeColumn*imagewidth+"px";
//key control
let upKey=38;
let downKey=40;
let rightKey=39;
let leftKey=37;
let keydownHander=(e)=>{// keydown hander function
    if(!gameStartBool){//if game not start, end function
        return;
    }
    let saveRow=playerRow;//container for playerRow data now;
    let saveColumn=playerColumn;//container for playerColumn data now;
    switch(e.keyCode){
        case upKey://handle up key
        console.log("up");
        if(playerRow!=0){//if now position is not first row
            playerRow=playerRow-1;
        }
        else{
            alert("You can not move up!");
            return;//end function
        }
        break;
        case downKey:
        console.log("down");
        if(playerRow!=7){//if now position is not last row
            playerRow=playerRow+1;
        }
        else{
            alert("You can not move down!");
            return;//end function
        }
        break;
        case rightKey:
        console.log("right");
        if(playerColumn!=7){//if now position is not last column
            playerColumn=playerColumn+1;
        }
        else{
            alert("You can not move right!");
            return;//end function
        }
        break;
        case leftKey:
        console.log("left");
        if(playerColumn!=0){//if now position is not first column
            playerColumn=playerColumn-1;
        }
        else{
            alert("You can not move left!");
            return;//end function
        }
        break;
    }
    // change player location in display and game object
    gameObejects[saveRow][saveColumn]=0; 
    gameObejects[playerRow][playerColumn]=9;
    playerImage.style.top=playerRow*imagewidth+"px";
    playerImage.style.left=playerColumn*imagewidth+"px";
};

let startGame=()=>{
    //animation for invisible welcome area
    let tl2=new TimelineMax({repeat:0});
    tl2.to("#shadowPaper",.5,{opacity:0},'0')//let shadow paper div invisible
       .to("#shadowPaper",.5,{display:"none"},'0')//let shadow paper div display none
       .to("#start",.5,{opacity:0},'0')//let start div invisible
       .to("#start",.5,{display:"none"},'0');//let start div display none
    gameStartBool=true;//change game start state to true;
}

//animation for welcome text
(function(){
	let tl1=new TimelineMax({repeat:-1});
    tl1.to('#welcomeText',.4,{opacity:1})
       .from('#welcomeText',2,{rotation:10,ease:Power0.easeOut},'0')
       .to('#welcomeText',2,{rotation:-10,ease:Power0.easeOut},'2')
       .from('#welcomeText',4,{rotation:-10,ease:Power0.easeOut},'4');
}());

addEventListener("load",loadMap,false);//after loading run draw map function
startButton.addEventListener("click",startGame,false);//click start button event
window.addEventListener("keydown",keydownHander,false);// add event for key down
