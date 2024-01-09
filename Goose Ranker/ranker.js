let songs = [
    { name: "(dawn)", rank: 0 },
    { name: "(satellite)", rank: 0 },
    { name: "726", rank: 0 },
    { name: "A Western Sun", rank: 0 },
    { name: "All I Need", rank: 0 },
    { name: "Animal", rank: 0 },
    { name: "Arcadia", rank: 0 },
    { name: "Arise", rank: 0 },
    { name: "Arrow", rank: 0 },
    { name: "Atlas Dogs", rank: 0 },
    { name: "Bingo Tour Theme", rank: 0 },
    { name: "Bob Don", rank: 0 },
    { name: "Borne", rank: 0 },
    { name: "Butter Rum", rank: 0 },
    { name: "Butterflies", rank: 0 },
    { name: "California Magic", rank: 0 },
    { name: "Creatures", rank: 0 },
    { name: "Doc Brown", rank: 0 },
    { name: "Doobie Song", rank: 0 },
    { name: "Dr. Darkness", rank: 0 },
    { name: "Dragonfly", rank: 0 },
    { name: "Dripfield", rank: 0 },
    { name: "Drive", rank: 0 },
    { name: "Earthling or Alien?", rank: 0 },
    { name: "Echo of a Rose", rank: 0 },
    { name: "Elizabeth", rank: 0 },
    { name: "Elmeg the Wise", rank: 0 },
    { name: "Everything Must Go", rank: 0 },
    { name: "Feel It Now", rank: 0 },
    { name: "Flodown", rank: 0 },
    { name: "Gone Gone Good", rank: 0 },
    { name: "Gringo", rank: 0 },
    { name: "Honeybee", rank: 0 },
    { name: "Hot Tea", rank: 0 },
    { name: "Hungersite", rank: 0 },
    { name: "Indian River", rank: 0 },
    { name: "Interlude I", rank: 0 },
    { name: "Into the Myst", rank: 0 },
    { name: "It Burns Within", rank: 0 },
    { name: "Jam", rank: 0 },
    { name: "Jeff Engborg", rank: 0 },
    { name: "Jive I", rank: 0 },
    { name: "Jive II", rank: 0 },
    { name: "Jive Lee", rank: 0 },
    { name: "Lead the Way", rank: 0 },
    { name: "Lead Up", rank: 0 },
    { name: "Life On The Shelf", rank: 0 },
    { name: "Lily's Tiger", rank: 0 },
    { name: "Loose Ends", rank: 0 },
    { name: "Madhuvan", rank: 0 },
    { name: "Mini Mall Rap", rank: 0 },
    { name: "Moby", rank: 0 },
    { name: "Moonrise", rank: 0 },
    { name: "Mr. Action", rank: 0 },
    { name: "Not Alone", rank: 0 },
    { name: "Pancakes", rank: 0 },
    { name: "Pinche Gringo", rank: 0 },
    { name: "Red Bird", rank: 0 },
    { name: "Rockdale", rank: 0 },
    { name: "Rosewood Heart", rank: 0 },
    { name: "Same Old Shenanigans", rank: 0 },
    { name: "Seekers On The Ridge Part I", rank: 0 },
    { name: "Seekers On The Ridge Part II", rank: 0 },
    { name: "Silver Rising", rank: 0 },
    { name: "Slow Ready", rank: 0 },
    { name: "So Ready", rank: 0 },
    { name: "Spirit of the Dark Horse", rank: 0 },
    { name: "Thatch", rank: 0 },
    { name: "The Empress of Organos", rank: 0 },
    { name: "The Labyrinth", rank: 0 },
    { name: "The Old Man's Boat", rank: 0 },
    { name: "The Whales", rank: 0 },
    { name: "This Old Sea", rank: 0 },
    { name: "Time to Flee", rank: 0 },
    { name: "Travelers", rank: 0 },
    { name: "Trevor Reads Poetry", rank: 0 },
    { name: "Tumble", rank: 0 },
    { name: "Turkish Hills", rank: 0 },
    { name: "Turned Clouds", rank: 0 },
    { name: "Welcome to Delta", rank: 0 },
    { name: "White Lights", rank: 0 },
    { name: "Wysteria Lane", rank: 0 },
    { name: "Yeti", rank: 0 },
    { name: "Your Ocean", rank: 0 }
];

let matchups = {};

function getRandomSongs() {
    let attempts = 0; // To prevent infinite loops
    while (attempts < 1000) {
        let index1 = Math.floor(Math.random() * songs.length);
        let index2;
        do {
            index2 = Math.floor(Math.random() * songs.length);
        } while (index1 === index2);

        let matchupKey = `${songs[index1].name}-${songs[index2].name}`;
        if (!matchups[matchupKey]) {
            matchups[matchupKey] = true; // Mark this matchup as occurred
            return [songs[index1], songs[index2]];
        }
        attempts++;
    }
    console.error("Unable to find a new matchup");
    return []; // or handle this case appropriately
}

function displayRandomSongs() {
    let randomSongs = getRandomSongs();
    document.getElementById('song1name').textContent = randomSongs[0].name;
    document.getElementById('song2name').textContent = randomSongs[1].name;

    // Store the indices of the current songs to use in voting
    document.getElementById('voteSong1').setAttribute('data-index', songs.indexOf(randomSongs[0]));
    document.getElementById('voteSong2').setAttribute('data-index', songs.indexOf(randomSongs[1]));
}


function voteForSong(winningIndex, losingIndex) {
    songs[winningIndex].rank += 1;
    songs[losingIndex].rank -= 1;
    saveToLocalStorage();
}

function displayRankings() {
    // Filter out songs with no votes
    let votedSongs = songs.filter(song => song.rank !== 0);
    votedSongs.sort((a, b) => b.rank - a.rank);
    let rankingsHTML = votedSongs.map(song => `${song.name}: ${song.rank}`).join('<br>');
    document.getElementById('rankings').innerHTML = rankingsHTML;
}


document.getElementById('voteSong1').addEventListener('click', function() {
    let winningIndex = this.getAttribute('data-index');
    let losingIndex = document.getElementById('voteSong2').getAttribute('data-index');
    voteForSong(winningIndex, losingIndex);
    displayRandomSongs();
    displayRankings(); // if you want to update rankings instantly
});

document.getElementById('voteSong2').addEventListener('click', function() {
    let winningIndex = this.getAttribute('data-index');
    let losingIndex = document.getElementById('voteSong1').getAttribute('data-index');
    voteForSong(winningIndex, losingIndex);
    displayRandomSongs();
    displayRankings(); // if you want to update rankings instantly
});

function saveToLocalStorage() {
    localStorage.setItem('songs', JSON.stringify(songs));
    localStorage.setItem('matchups', JSON.stringify(matchups));
}

document.addEventListener('DOMContentLoaded', function() {
    if (localStorage.getItem('songs')) {
        songs = JSON.parse(localStorage.getItem('songs'));
    }

    if (localStorage.getItem('matchups')) {
        matchups = JSON.parse(localStorage.getItem('matchups'));
    }

    displayRandomSongs();
    displayRankings();
});

function resetData() {
    localStorage.clear();
    // Reinitialize songs and matchups as per your initial setup
    // Then call displayRandomSongs() and displayRankings()
}

document.addEventListener('DOMContentLoaded', function() {
    displayRandomSongs();
});
