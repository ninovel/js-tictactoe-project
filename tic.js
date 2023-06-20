// VARIABLES
// player marker constants
const p_x = "X"; const p_o = "O"; const markers = new Set([p_x, p_o]);

// current player marker
let player_is = p_x;

// cell element ids
const cell_name = ["b1", "b2", "b3", "b4", "b5", "b6", "b7", "b8", "b9"]; 

// board elements dictionary, key is the cell_name/element id, value is the element
const board_elements = new Object();

// board value array, also contains cell elements <- this is actually board elements, should make another one of just board values?
const board_value = [
	["","",""],
	["","",""],
	["","",""],
];

// FUNCTIONS
// setup board_elements and board_value
function game_setup() {
	for (const c_name of cell_name) {
		board_elements[c_name] = document.getElementById(c_name); // go through cell_name list and use that to assign elements to board_elements dictionary. key = id, value = cell element reference
		//alert(c_name);
	};

	let num = 0

	for (let x = 0; x < 3; x++) {
		for (let y = 0; y < 3; y++) {
			board_value[x][y] = board_elements[cell_name[num]] // assign the same elements to their corresponding coordinates in the board_value 2d array
			num += 1
		};
	};
}

// Order should be: check if move is valid, execute move and disable element, check if moving player has won, check for ties, then toggle player marker
 function move(id) {

	// check if cell has does not contain a player marker
	if (!(board_elements[id].value in markers)) {
		
		// execute move
		board_elements[id].value = player_is // applies marker
		board_elements[id].disabled = true // disable the cell

		// check for victory - should return true/false
		if (check_victory()) {
			// execute victory stuff if true

			// change the content of the 'print' paragraph to announce the winner
			document.getElementById("print").innerHTML = player_is + " won!"
			
			// disable all cells
			for (const cell_id of cell_name) {
				board_elements[cell_id].disabled = true
			}

		} else {
			// check for tie first - are all cells disabled?
			if (is_tie()) {
				document.getElementById("print").innerHTML = "Game is tied!"
			} else {
				// switch player marker if no victory or tie
				player_is = toggle(player_is)
			}
		}
	} else {
		alert("Active cell has a player marker?!")
	};
 }

// returns the opposite marker of the one passed
function toggle(mark) {
	if (mark == p_x) {
		mark = p_o
	} else {
		mark = p_x
	}
	return mark
}

// is the game tied? returns true/false. does this by checking if all cells are disabled
function is_tie() {
	for (cname of cell_name) {
		//alert(cname + " " + board_elements[cname] + " " + board_elements[cname].disabled)
		if (!board_elements[cname].disabled) {
			return false
		}
	}

	return true
}

// returns true/false
function check_victory() {
	// check horizontal
	let row;
	for (let x = 0; x < 3; x++) {
		row = [board_value[x][0].value, board_value[x][1].value, board_value[x][2].value]
		if (row.includes(toggle(player_is)) || row.includes("")) {
			// do nothing
			// alert("No horizontal win")
		} else {
			// alert("Horizontal win!")
			board_value[x][0].style.color = "red"
			board_value[x][1].style.color = "red"
			board_value[x][2].style.color = "red"
			return true
		}
	}

	// check vertical
	let column;
	for (let x = 0; x <3; x++) {
		column = [board_value[0][x].value, board_value[1][x].value, board_value[2][x].value]
		if (column.includes(toggle(player_is)) || column.includes("")) {
			// do nothing
			//alert("No vertical win")
		} else {
			// alert("Vertical win!")
			board_value[0][x].style.color = "red"
			board_value[1][x].style.color = "red"
			board_value[2][x].style.color = "red"
			return true
		}
	}
	
	// check diagonals
	// so 0,0 1,1 2,2 and 2,0, 1,1 0,2
	let diagonal;
	diagonal = [board_value[0][0].value, board_value[1][1].value, board_value[2][2].value]
	if (diagonal.includes(toggle(player_is)) || diagonal.includes("")) {
		// do nothing
	} else {
		board_value[0][0].style.color = "red"
		board_value[1][1].style.color = "red"
		board_value[2][2].style.color = "red"
		return true
	}

	diagonal = [];
	diagonal = [board_value[2][0].value, board_value[1][1].value, board_value[0][2].value]
	if (diagonal.includes(toggle(player_is)) || diagonal.includes("")) {
		// do nothing
	} else {
		board_value[2][0].style.color = "red"
		board_value[1][1].style.color = "red"
		board_value[0][2].style.color = "red"
		return true
	}

	return false
}

// resets game
function reset() {
	location.reload();
}
