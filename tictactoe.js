window.onload = setup; // Calling setup function at program start

/* Globals */
const classes=["e","b","w"];
var turns=[];
var title = document.getElementById("title");
var board = document.getElementById("board");
var rows = document.getElementById("rows");

var winner = false;
var coordinates = [];
var validTurn = false;

var listCounter = 1;

function setup() {
	title.innerHTML = "Tic Tac Toe!";
	boardReset("Click on an empty circle to play... \n After the game is finished click on the board to restart!");
	newBoard();
}

/* Main */
function main() {
  document.getElementById("status").innerHTML = "...";

  if(winner==false && fullBoard()==false){
    while (rows.hasChildNodes()) {
      rows.removeChild(rows.firstChild);
    }
    if(winner==false && fullBoard()==false){
      players_turn();
      winner = didIWin(turns);
    }
    if(winner==false && fullBoard()==false && validTurn!=false){
      cpuTurn();
      winner = didIWin(turns);
    }
    
    if(winner==true){
      document.getElementById("status").innerHTML = "Winner!";
    }
      buildBoard();
  }
  else {
	  // Reload page or something
    location.reload();
  }
}

function newBoard() {
  turns=[];
  // 1-d array, so []
  for (let row=0;row<3;row++){
    turns.push([]);
    // push 3 1-d row arrays into turns, so: [[],[],[]]
    for (let col=0;col<3;col++){
      //let turnVal=Math.floor(Math.random()*3); MAKES IT SO TURNS ARRAY IS FILLED WITH RANDOM VALUES
      let turnVal=0;
      let turnClass=classes[turnVal];
      turns[row].push(turnClass);
      // push the classes into each row, so [["e","e","e"],["e","e","e"],["e","e","e"]]
      }
    }
    console.log(turns);
}

function validateTurn(x,y) {
  if (x<=2 && x>=0 && y<=2 && y>=0) {
    return true;
  }
  else {
    return false;
  }
}

function clickyFunction(x){
  var indexingList = [[0,0],[0,1],[0,2],[1,0],[1,1],[1,2],[2,0],[2,1],[2,2]];
  coordinates = indexingList[x-1];

  main();
}

function players_turn() {
  x_input = coordinates[0];
  y_input = coordinates[1];

  if (turns[x_input][y_input] == "e") {
    turns[x_input][y_input] = classes[2];
    validTurn=true;
    }
  else {
    document.getElementById("status").innerHTML = "Taken";
    validTurn = false;
  }
}

function cpuTurn(){
  var testingTurns = turns;
  var proxyWinner = false;
  var turnCount = 0;

  // SOMETHING THAT REPLACES MOVE THING
  for(let row=0;row<3;row++){
    for(let col=0;col<3;col++){
      if(testingTurns[row][col]=="e"){
        testingTurns[row][col] = classes[1];
		proxyWinner = didIWin(testingTurns);
        if(proxyWinner==true && turnCount==0){
          turns[row][col] = classes[1];
          console.log(turns);
		  turnCount++;
          break; // So the Col for loop stops
        }
        else{
          testingTurns[row][col] = classes[0];
        }
      }
    }
    if(proxyWinner==true){ //So the Row for loop stops
      break;
    }
  }
  // This for loop is to make sure white doesn't win
  for(let row=0;row<3;row++){
    for(let col=0;col<3;col++){
      if(testingTurns[row][col]=="e"){
        testingTurns[row][col] = classes[2];
		proxyWinner = didIWin(testingTurns);
        if(proxyWinner==true && turnCount==0){
          turns[row][col] = classes[1];
          console.log(turns + "Winning move");
		  turnCount++;
          break; // So the Col for loop stops
        }
        else{
          testingTurns[row][col] = classes[0];
        }
      }
    }
  }
  
  if(proxyWinner==false && turnCount==0){
	  randomCPU();
  }
}

function randomCPU(){
  var randomCPU_x = Math.floor(Math.random()*3);
  var randomCPU_y = Math.floor(Math.random()*3);

  while (turns[randomCPU_x][randomCPU_y]!=classes[0]){
    randomCPU_x = Math.floor(Math.random()*3);
    randomCPU_y = Math.floor(Math.random()*3);
  }
  turns[randomCPU_x][randomCPU_y] = classes[1];

  //var randomCPU_array = [randomCPU_x,randomCPU_y];
  //return randomCPU_array;
}

function buildBoard(){
  listCounter = 1;
	for (let row=0;row<3;row++){
    var rowNode = document.createElement("ul");
    rowNode.className = "row";
    rows.appendChild(rowNode);
    for (let col=0;col<3;col++){
      // count turns
      // find last UL (row)
      var newRow = rows.lastChild;
      // prepare LI for row
      var turnNode = document.createElement("li");
      // look up and add class
      turnNode.setAttribute("class", turns[row][col]);
      turnNode.setAttribute("onclick", "clickyFunction(" + listCounter + ")")
      listCounter++;
      // add LI to row
	    newRow.appendChild(turnNode);
	  }
	}
}

function fullBoard(){
	var counter=0;
	for(let row=0;row<3;row++){
		for(let col=0;col<3;col++){
			if(turns[row][col]=="e"){
				counter++;
			}
		}
	}
	if(counter==0){
		return true;
	}
	else {
		return false;
	}	
}

// ADD BOOLEAN GLOBAL THAT EXITS GAME IF WINNER
function didIWin(array){
	var proxyWinner = false;
  for (let row=0;row<3;row++){
    for (let col=0;col<3;col++){
      if (array[row][0]==array[row][1]&&array[row][1]==array[row][2]&&array[row][col]!="e"||array[0][0]==array[1][1]&&array[1][1]==array[2][2]&&array[1][1]!="e"){
        if (array[row][col]=="b") console.log("Black won!");
        else console.log("White won!");
        console.log(row + "row wins!" + array);
        proxyWinner=true;
        break;
      }
      if (array[0][col]==array[1][col]&&array[1][col]==array[2][col]&&array[row][col]!="e"||array[0][2]==array[1][1]&&array[1][1]==array[2][0]&&array[1][1]!="e"){
        if (array[row][col]=="b") console.log("Black won!");
        else console.log("White won!");
        console.log(col + "column wins!" + array);
        proxyWinner=true;
        break;
      }
    }
    if(proxyWinner==true){
      break;
    }
  }
  return proxyWinner;
}

function boardReset(message){
  board.removeChild(board.childNodes[2]);
  var messageArea = document.createElement("p");
  messageArea.innerHTML=message;
  board.appendChild(messageArea);
}
