// console.log("Hello world");

// declare variables for 2d array, score, row, and column
let board;
let score = 0;
let rows = 4;
let columns = 4;


// create a function to set the game
// start of set game
function setGame() {
    // initialize the 4x4 game board with all tiles set to 0 - 2d array
    board = [
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0]
    ];

    // create the gameboard on the html document
    // first loop is to create rows, second is for column
    // inner loop (r) will be executed before outer loop (c)
    for (let r = 0;r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            // console.log(`[r${r}-c${c}]`)

            // create div elements representing a tile
            let tile = document.createElement("div");

            // set a unique id for each tile based on its coordinate
            // + is use to concatenate values if dealing with string
            tile.id = r.toString() + "-" + c.toString();

            // get number for the board
            // wherein the board is currently set to 0
            let num = board[r][c];

            // update the tile appearance based on the value
            updateTile(tile, num);

            // place the tile inside the board (grid) in the right row and column
            document.getElementById("board").append(tile);
        }
    }

    // random tile
    setTwo();
    setTwo();
}


// end of setGame()

// start of updateTile()
function updateTile(tile, num) {
    // clear the tile text
    tile.innerText = "";

    // clear the classList to avoid multiple classes
    tile.classList.value = "";

    // add class named "tile" to the classList of the tile, for the styling
    tile.classList.add("tile");

    // to check if the current num is not zero
    if (num > 0) {
        // set the tile's text to the number based on the num value
        tile.innerText = num.toString();

        // example: num = 128, the class "x128" will be added to the tile
        if (num <= 4096) {
            tile.classList.add("x" + num.toString())
        }
        else {
            // if number is greater than 4096, a special class "x8192" will be added
            tile.classList.add("x8192");
        }
    }
}
// end of updateTile()

// start of window.onload
//event that triggers when a webpage finished loading
window.onload = function(){
    setGame();
};
// end of window.onload

// start of handleSlide()
// "e" represents the event objects, which contains info about the event occured
function handleSlide(e) {
    // check the keydown event
    console.log(e.code);

    // check if the pressed key's code is one of the arrow keys
    if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(e.code)) {
        // prevent default behavior, no scrolling
        e.preventDefault();

        if (e.code == "ArrowLeft") {
            slideLeft();
        }
        else if (e.code == "ArrowRight") {
            slideRight();
        }
        else if (e.code == "ArrowUp") {
            slideUp();
        }
        else if (e.code == "ArrowDown") {
            slideDown();
        }
    }
}



// when any key is pressed, the handleSlide() is called to handle keypress
document.addEventListener("keydown", handleSlide);
// end of handleSlide()

// start of filterZero()
// remove empty tiles
function filterZero(tiles){
    // create new array without the zeroes
    return tiles.filter(num => num != 0);
}
// end of filterZero()


// start of slide(tiles)
// for sliding and merging
function slide(tiles){
    tiles = filterZero(tiles);

    for (let i=0; i < tiles.length; i++){
        // if two adhacent numbers are equal
        if (tiles[i] == tiles[i+1]) {
            // merge them by diybling the first one
            tiles[i] *= 2
            //set the second one to zero
            tiles[i+1]=0;
        }
    }
    
    tiles = filterZero(tiles)

    while(tiles.length < 4){
        // add 0 at end of array
        tiles.push(0);
    }
    return tiles
}
// end of slide(tiles)

// start of slideleft()
function slideLeft() {
    for (let r = 0; r < rows; r++){

        let row = board[r]; // 0: [0,2,2,2]

        // slide() function will return a new value for spcific row
        row = slide(row);

        // updated value of row
        board[r] = row
        for (let c = 0; c < columns; c++) {
            let tile = document.getElementById(r.toString() + "-" +c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}
// end of slideLeft()

// start of slideRight()
function slideRight() {
    for (let r = 0; r < rows; r++){

        let row = board[r]; // 0: [0,2,2,2]
        
        // reverse the array row - r=0: [0,2,2,2] -> [2,2,2,0]
        row.reverse();

        // slide() function will return a new value for spcific row
        row = slide(row); // [4,2,0,0]
        row.reverse();// [0,0,2,4]

        // updated value of row
        board[r] = row
        for (let c = 0; c < columns; c++) {
            let tile = document.getElementById(r.toString() + "-" +c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}
// end of slideRight()

// start of slideUp()
function slideUp() {
    for (let c = 0; c < columns; c++){
        // create temporary array col that represents the column from top to bottom
        let col = [board[0][c], board[1][c], board[2][c], board[3][c]];

        col = slide(col);

        for (let r = 0; r < rows; r++) {
            // set the values of board array back to the values of the modified col
            board[r][c] = col[r];


            let tile = document.getElementById(r.toString() + "-" +c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}
// end of slideUp()

// start of slideDown()
function slideDown(){
	for(let c=0; c<columns; c++){

		// create a temporary array col that represents the column from top to bottom
		let col =[board[0][c], board[1][c], board[2][c], board[3][c]];

		col.reverse();
		col = slide(col);
		col.reverse();

		for(let r=0; r<rows; r++){
			// set the values of board array back to the values of the modified col.
			board[r][c] = col[r];

			let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
		}
	}
}
// end of slideDown()

// start of hasEmptyTile
// check whether game board contains any empty spacce (0) tiles
// return a boolean
function hasEmptyTile() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; r < columns; c++) {
            // check if current tile == 0, if yes it will return true
            if (board[r][c] == 0) {
                return true;
            }
        }
    }

    // no tile == 0
    return false;
}
// end of hasEmptyTile

// start of setTwo()
// add new randowm 2 tile in the game board
function setTwo() {
    // check if hasEmptyTile is false
    if(!hasEmptyTile){
        return;
    }


    // declare a value found tile
    let found = false;

    // will run until random empty tile is found
    while (!found){
        // Math.random() - generates random number based on condition

        let r = Math.floor(Math.random() * rows);
        let c = Math.floor(Math.random() * columns)


        // if the position values is 0, set the value to 2
        if (board[r][c] == 0){
            board[r][c] = 2;
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            tile.innerText = "2";
            tile.classList.add("x2");

            // set the found variable to true
            found = true;
        }
    }
}
// end of setTwo()