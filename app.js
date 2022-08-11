import { getGames, createGame } from './fetch-utils.js';
import { renderGame } from './render-utils.js';

const currentGameEl = document.getElementById('current-game-container');
const pastGamesEl = document.getElementById('past-games-container');


const nameForm = document.getElementById('name-form');
const teamOneAddButton = document.getElementById('team-one-add-button');
const teamTwoAddButton = document.getElementById('team-two-add-button');
const teamOneSubtractButton = document.getElementById('team-one-subtract-button');
const teamTwoSubtractButton = document.getElementById('team-two-subtract-button');
const finishGameButton = document.getElementById('finish-game-button');
const teamOneLabel = document.getElementById('team-one-name');
const teamTwoLabel = document.getElementById('team-two-name');

// checkAuth();

let name1 = '';
let name2 = '';
let score1 = 0;
let score2 = 0;

let pastGames = [];

let currentGame = {
    name1: '',
    name2: '',
    score1: 0,
    score2: 0
};

nameForm.addEventListener('submit', (e) => {
    // don't forget to prevent the default form behavior!
    e.preventDefault();
    // get the name data from the form
    const formData = new FormData(nameForm);
    
    const name1 = formData.get('team-one');
    const name2 = formData.get('team-two');
    // set the state to this data from the form
    currentGame.name1 = name1;
    currentGame.name2 = name2;
    console.log(currentGame);
    displayCurrentGameEl();

    // reset the form values
    nameForm.reset();

    
});

teamOneAddButton.addEventListener('click', () => {
    // increment the current state for team one's score
    score1++;
    currentGame.score1 = score1;
    console.log(currentGame);
    displayCurrentGameEl();
});

teamTwoAddButton.addEventListener('click', () => {
    // increment the current state for team two's score
    score2++;
    currentGame.score2 = score2;
    console.log(currentGame);
    displayCurrentGameEl();
});

teamOneSubtractButton.addEventListener('click', () => {
    // decrement the current state for team one's score
    score1--;
    currentGame.score1 = score1;
    displayCurrentGameEl();
});

teamTwoSubtractButton.addEventListener('click', () => {
    // decrement the current state for team two's score
    score2--;
    currentGame.score2 = score2;
    displayCurrentGameEl();
});

finishGameButton.addEventListener('click', async () => {
    // create a new game using the current game state


    await createGame(currentGame);

    pastGames.push(currentGame);

    console.log(pastGames);

    // after creating this new game, re-fetch the games to get the updated state and display them (hint: call displayAllGames())

    displayAllGames();

    name1 = '';
    name2 = '';
    score1 = 0;
    score2 = 0;

    displayCurrentGameEl();
});

// on load . . .
window.addEventListener('', async () => {
    // display all past games (hint: call displayAllGames())
    displayAllGames();
});

function displayCurrentGameEl() {
    // clear out the current game div
    currentGameEl.textContent = '';
    // change the label to show team one's name;s
    teamOneLabel.textContent = currentGame.name1;
    // change the label to show team two's name;
    teamTwoLabel.textContent = currentGame.name2;
    // call the render game function to create a game element
    const renderedGame = renderGame(currentGame);
    // append the element to the cleared out current game div
    currentGameEl.append(renderedGame);
    
}

async function displayAllGames() {
    // clear out the past games list in the DOM
    pastGamesEl.textContent = '';
    // FETCH ALL GAMES from supabase
    const games = await getGames();
    // loop through the past games
    for (let game of games) {
        const pastGame = renderGame(game);
        pastGamesEl.append(pastGame);
    }
    // render and append a past game for each past game in state
}

displayCurrentGameEl();
