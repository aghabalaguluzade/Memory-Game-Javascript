let numbers = [];
let randomNumbers = [];
let images = [];
let memory = [0,0,0];
let fillMemory = [];

onload = () => {
	setTimeout(changeCover,2500);
	createNumbers();
	createGame();
}


const n = 4;

let createGame = () => {

	let view = '';

	for(let i = 0; i < n; i++) {
		view += `<tr>`;
		for(let j = 0; j < n; j++) {
			view += `<td onclick="clickGame(${i},${j})"><img src="img/${randomNumbers[i][j]}.png" /></td>`;
		}
		view += `</tr>`;
	}
	document.querySelector('table').innerHTML = view;
}


const createNumbers = () => {
	
	let k = 1;

	for(let i = 0; i < n*n; i++) {
		k = k > 8 ? 1 : k;
		numbers[i] = k++;
	}

	let x = 0;

	for(let i = 0; i < n; i++) {
		randomNumbers[i] = [];
		images[i] = [];
		fillMemory[i] = [];
		for(let j = 0; j < n; j++) {
			x = Math.floor(Math.random() * numbers.length);
			randomNumbers[i][j] = numbers[x];
			images[i][j] = numbers[x];
			numbers.splice(x,1);
		}
	}
}

const changeCover = () => {
	for(let i = 0; i < n; i++) {
		for(let j = 0; j < n; j++) {
			randomNumbers[i][j] = 0;
		}
	}
	createGame();
}

const clickGame = (i,j) => {

	if(fillMemory[i][j] != 1) {
		
	randomNumbers[i][j] = images[i][j];

	createGame();
	
	if(memory[2] == 1) { // two click
		if(randomNumbers[memory[0]][memory[1]] != randomNumbers[i][j]) {
			randomNumbers[i][j] = 0;
			randomNumbers[memory[0]][memory[1]] = 0;
			setTimeout(createGame,300);
		}else {
			fillMemory[i][j] = 1;
			fillMemory[memory[0]][memory[1]] = 1;
		}
		memory[0] = 0;
		memory[1] = 0;
		memory[2] = 0
	}else { // one click
		memory[0] = i;
		memory[1] = j;
		memory[2] = 1;
	}
	}
}