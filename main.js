let canvas=document.getElementById("gameBoad");//define canvas
let gameDiv=document.getElementById("game");
let startButton=document.querySelector("#startButton");//start button
let shadowPaper=document.querySelector("#shadowPaper");// shadowpaper
let informationBoxDiv=document.querySelector("#informationBox");//informationBox div,use for display informations
let startDiv=document.querySelector("#start");//start div
let context = canvas.getContext("2d");
let policeStationImage=new Image();//define police station Image
let houseImage=new Image();//define house Image
let stoneRoadImage=new Image();//define stone road Image
let stoneRoadLevelImage=new Image();//define stone Road Level Image
let stoneRoadVerticalImage=new Image();//define stone Road Vertical Image
let restaurantImage=new Image();//define restaurant Image
let gameStartBool=false;//define game start state is false
policeStationImage.src="images/police_station.png";//link police station Image 
houseImage.src= "images/house.png";//link house Image
stoneRoadImage.src="images/stone_road_cross.png";//link stone road Image
stoneRoadLevelImage.src="images/stone_road_level.png";//link stone Road Level Image
stoneRoadVerticalImage.src="images/stone_road_vertical.png";//link stone Road Vertical Image
restaurantImage.src="images/restaurant.png";//link restaurant Image
let imagewidth=100;//set image width


let map=[// init map value 0 is cross shone road,1 is house, 2 is police station, 3 is level stone road, 4 is vertical stone road, 5 is restaurant
    [0,4,4,0,4,0,4,0],//row 1
    [3,1,1,3,5,3,1,3],//row 2
    [0,4,4,0,4,0,4,0],//row 3
    [3,5,1,3,1,3,1,3],//row 4
    [3,1,2,3,1,3,5,3],//row 5
    [0,4,4,0,4,0,4,0],//row 6
    [3,1,1,3,5,3,1,3],//row 7
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
                case 5://restaurant
                    context.drawImage(restaurantImage,j*imagewidth,i*imagewidth);
                    break;
            default:
                alert("errors!");
            }
        }
    }
}

let gameObejects=[//player and police map. 9 is player, 8 is police
    [0,0,0,0,0,0,0,7],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,8,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [9,0,0,0,0,0,0,0],
];
//house, restaurant, police station event handle;
let eventObject={
    policeStationEvent:()=>{
        thirdEnding();
    },
    houseEvent:()=>{
        let randomNumber=Math.floor(Math.random()*11)-5;//get a random number between -5 to 5
        if(randomNumber>0){//get money
            informationBoxDiv.innerHTML+="You get $"+randomNumber+" from a empty house"+"<br/>";
            playerState.money=playerState.money+randomNumber;
        }
        else if(randomNumber<0){//lost money
            if(randomNumber+playerState.money<0){
                informationBoxDiv.innerHTML+="When you is trying find some money, the house owner show up and kick your ass. You lost all your money!"+"<br/>";
                playerState.money=0;
            }
            else{
                informationBoxDiv.innerHTML+="When you is trying find some money, the house owner show up and kick your ass. You lost $"+Math.abs(randomNumber)+"."+"<br/>";
                playerState.money=playerState.money+randomNumber;
            }
        }
        else{//nothing happen
            informationBoxDiv.innerHTML+="You get nothing from this empty house"+"<br/>";
        }
    },
    restaurantEvent:()=>{
        if(playerState.money==0){//nothing happen
            informationBoxDiv.innerHTML+="No money, no food."+"<br/>";
            return;
        }
        else{//buy food
        let randomNumber=Math.floor(Math.random()*playerState.money)+1;
        playerState.money=playerState.money-randomNumber;
        playerState.food=playerState.food+randomNumber;
        }
    },
}
//player state object and start state
let playerState={
    food:10,
    money:5,
}

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
playerImage.src="images/criminal.png";
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
policeImage.src="images/police.png";
gameDiv.appendChild(policeImage);
policeImage.style.top=policeRow*imagewidth+"px";
policeImage.style.left=policeColumn*imagewidth+"px";
//get car location row and column
let carRow,carColumn;
for(let i=0;i<gameObejects.length;i++){
    for(let j=0;j<gameObejects.length;j++){
        if(gameObejects[i][j]==7){
            carRow=i;
            carColumn=j;
            break;
        }
    }
}
//display car's image by car position
let carImage=document.createElement("img");
carImage.setAttribute("class","cellImage");
carImage.src="images/car.png";
gameDiv.appendChild(carImage);
carImage.style.top=carRow*imagewidth+"px";
carImage.style.left=carColumn*imagewidth+"px";

//move animation function
let moveAnimation=(object,x,y)=>{
    //playerImage
    let tl3=new TimelineMax({repeat:0});
    tl3.to(object,.5,{top:x*imagewidth,left:y*imagewidth},'0');
}
//validate all directions can move
let validPoliceDirections=()=>{

    let validDirectionArray=[];//define a return array for save validated directions data
    //validate up and down direction 
    if(policeRow==0){
        if(map[policeRow+1][policeColumn]!=1){//check down direction, is there house?
            validDirectionArray.push("down");
        }
    }
    else if(policeRow==7){
        if(map[policeRow-1][policeColumn]!=1){//check up direction, is there house?
            validDirectionArray.push("up");
        }
    }
    else{
        if(map[policeRow+1][policeColumn]!=1){//check down direction, is there house?
            validDirectionArray.push("down");
        }
        if(map[policeRow-1][policeColumn]!=1){//check up direction, is there house?
            validDirectionArray.push("up");
        }
    }
    //validate left and right direction 
    if(policeColumn==0){
        if(map[policeRow][policeColumn+1]!=1){//check right direction, is there house?
            validDirectionArray.push("right");
        }
    }
    else if(policeColumn==7){
        if(map[policeRow][policeColumn-1]!=1){//check left direction, is there house?
            validDirectionArray.push("left");
        }
    }
    else{
        if(map[policeRow][policeColumn+1]!=1){//check right direction, is there house?
            validDirectionArray.push("right");
        }
        if(map[policeRow][policeColumn-1]!=1){//check left direction, is there house?
            validDirectionArray.push("left");
        }
    }
    return validDirectionArray;//return all direction can move in a array
}

//police move action decide
let policeMoveActionDecide=()=>{
    let policeMoveDirections=validPoliceDirections();//get directions police can move

    if(policeRow==playerRow&policeColumn==playerColumn+1){//police just on player's left
        return "left";
    }
    if(policeRow==playerRow&policeColumn==playerColumn-1){//police just on player's right
        return "right";
    }
    if(policeRow==playerRow+1&policeColumn==playerColumn){//police just on player's up
        return "up";
    }
    if(policeRow==playerRow-1&policeColumn==playerColumn){//police just on player's down
        return "down";
    }

    let randomNumber=Math.floor(Math.random() * policeMoveDirections.length);//random number start form 0 less than policeMoveDirections.length
    return policeMoveDirections[randomNumber];//random move one direction in policeMoveDirections
}

//key control
let upKey=38;
let downKey=40;
let rightKey=39;
let leftKey=37;
let keydownHander=(e)=>{// keydown hander function
    if(!gameStartBool){//if game not start, end function
        return;
    }
    if(e.keyCode==upKey||e.keyCode==downKey||e.keyCode==rightKey||e.keyCode==leftKey){

        //player move part
        let saveRow=playerRow;//container for playerRow data now;
        let saveColumn=playerColumn;//container for playerColumn data now;
        switch(e.keyCode){
            case upKey://handle up key
            console.log("up");
            if(playerRow!=0){//if now position is not first row
                playerRow=playerRow-1;
            }
            else{
                //alert("You can not move up!");
                informationBoxDiv.innerHTML+="Warning:You can not move up!"+"<br/>"
                return;//end function
            }
            break;
            case downKey:
            console.log("down");
            if(playerRow!=7){//if now position is not last row
                playerRow=playerRow+1;
            }
            else{
                //alert("You can not move down!");
                informationBoxDiv.innerHTML+="Warning:You can not move down!"+"<br/>"
                return;//end function
            }
            break;
            case rightKey:
            console.log("right");
            if(playerColumn!=7){//if now position is not last column
                playerColumn=playerColumn+1;
            }
            else{
                //alert("You can not move right!");
                informationBoxDiv.innerHTML+="Warning:You can not move right!"+"<br/>"
                return;//end function
            }
            break;
            case leftKey:
            console.log("left");
            if(playerColumn!=0){//if now position is not first column
                playerColumn=playerColumn-1;
            }
            else{
                //alert("You can not move left!");
                informationBoxDiv.innerHTML+="Warning:You can not move left!"+"<br/>"
                return;//end function
            }
            break;
        }
        // change player location in display and game object
        gameObejects[saveRow][saveColumn]=0; 
        gameObejects[playerRow][playerColumn]=9; 
        moveAnimation(playerImage,playerRow,playerColumn);   
        playerState.food=playerState.food-1;//lost one food every move;
        eventHappen();//run event happen this location
        displayState();
        validateEnding();//validate ending

        //police move part
        let savePoliceRow=policeRow//container for policeRow data now;
        let savePoliceColumn=policeColumn//container for policeColumn data now;
        let policeMove=policeMoveActionDecide();//get police move direction
        switch(policeMove){
            case "up"://handle police move up
                policeRow=policeRow-1;
            break;
            case "down"://handle police move down
                policeRow=policeRow+1;
            break;
            case "left"://handle police move left
                policeColumn=policeColumn-1;
            break;
            case "right"://handle police move right
                policeColumn=policeColumn+1;
            break;
        }
        // change police location in display and game object
        gameObejects[savePoliceRow][savePoliceColumn]=0; 
        gameObejects[policeRow][policeColumn]=8; 
        moveAnimation(policeImage,policeRow,policeColumn);
        validateEnding();

    }
};
let displayState=()=>{
    let displayStateBox=document.querySelector('#states');
    displayStateBox.innerHTML="Food:"+playerState.food+"<br/>"+"Money:$"+playerState.money;
}
//handle location event
let eventHappen=()=>{
    if(map[playerRow][playerColumn]==1){//player located at house
        eventObject.houseEvent();
    }
    else if(map[playerRow][playerColumn]==2){//player located at police station
        eventObject.policeStationEvent();
    }
    else if(map[playerRow][playerColumn]==5){//player located at restaurant
        eventObject.restaurantEvent();
    }
}
//game rule for end
let validateEnding=()=>{
    if(!gameStartBool){
        return;
    }
    if(policeColumn==playerColumn&policeRow==playerRow){//police catch you
        console.log('lost');
        informationBoxDiv.innerHTML+="You are catched by the police."+"<br/>"
        lostEnding();
        return;
    }
    if(playerColumn==carColumn&playerRow==carRow){// player arrived at the car location
        console.log('win');
        winEnding();
        return;
    }
    if(playerState.food==0){//player's food is zero
        informationBoxDiv.innerHTML+="You are out of food."+"<br/>"
        lostEnding();
        return;
    }
}
//ending for lost the game
let lostEnding=()=>{
    let textInformation="You are catched by the police.";//end text
    if(playerState.food==0){
        textInformation="You are out of food.";//end text change when food is 0;
    }
    let endMessage=document.querySelector("#endMessage");//select the id="endMessage" div
        endMessage.style.display="block";//change display style form 'none' to 'block'
        let endMessageText=document.createElement('p');//create p element
        endMessageText.setAttribute("class","endText")// add class attribute for the p element
        endMessage.appendChild(endMessageText);// insert element in endMessage
        endMessageText.innerHTML="You Lost!";//insert text
        let endMessageDetail=document.createElement('p');//create p element
        endMessageDetail.setAttribute("class","endDetail");// add class attribute for the p element
        endMessage.appendChild(endMessageDetail);// insert element in endMessage
        endMessageDetail.innerHTML=textInformation;//insert text
        gameStartBool=false;//change game state
}
//ending for win the game
let winEnding=()=>{
    let endMessage=document.querySelector("#endMessage");
        endMessage.style.display="block";
        let endMessageText=document.createElement('p');
        endMessageText.setAttribute("class","endText")
        endMessage.appendChild(endMessageText);
        endMessageText.innerHTML="You Win!";
        let endMessageDetail=document.createElement('p');
        endMessageDetail.setAttribute("class","endDetail");
        endMessage.appendChild(endMessageDetail);
        endMessageDetail.innerHTML="You drive the car out of this place.<br/>Your points is "+(playerState.money+playerState.food)+".";
        gameStartBool=false;
}
//third ending for give yourself up.
let thirdEnding=()=>{
    let endMessage=document.querySelector("#endMessage");
        endMessage.style.display="block";
        let endMessageText=document.createElement('p');
        endMessageText.setAttribute("id","thirdEnd")
        endMessage.appendChild(endMessageText);
        endMessageText.innerHTML="You surrender yourself to the police department. Nice choice!";
        gameStartBool=false;
}
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
displayState();//display player state
window.addEventListener("load",loadMap,false);//after loading run draw map function
startButton.addEventListener("click",startGame,false);//click start button event
window.addEventListener("keydown",keydownHander,false);// add event for key down
