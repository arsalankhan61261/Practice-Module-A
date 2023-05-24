const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const selectMovie = document.getElementById('movie');
const count = document.getElementById('count');
const totalCount = document.getElementById('total');
const image = document.querySelector('.image');

populateUI();

let ticketPrice = +selectMovie.value;

const posters = ["./Images/ThePurge.jpg", "./Images/Fast9.jpg", "./Images/HarryPotter.jpg", "./Images/TheConjuring.jpg", "./Images/MIP.jpg"];
console.log(posters);

function updateSelectedSeats() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    console.log(selectedSeats);
    const selectedSeatIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));
    localStorage.setItem('selectedSeatIndex', JSON.stringify(selectedSeatIndex))
    count.innerText = selectedSeats.length;
    totalCount.innerText = selectedSeats.length * ticketPrice;
}

function changeMovie(movieIndex, moviePrice) {
    localStorage.setItem('movieIndex', movieIndex);
    localStorage.setItem('moviePrice', moviePrice);
}

function populateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeatIndex'))
    console.log(selectedSeats);
    if (selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach((seat, index) => {
            console.log(index);
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected');
            }
        })
    }
    const selectedMovie = localStorage.getItem('movieIndex');
    if (selectedMovie > -1) {
        selectMovie.selectedIndex = selectedMovie
    }
    if (selectedPoster !== null) {
        const selectedPoster = localStorage.getItem('moviePoster');
        image.src = selectedPoster;
        console.log(selectedPoster);
    } else {

    }
}

container.addEventListener('click', e => {
    if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
        e.target.classList.toggle('selected');
        updateSelectedSeats();
    }
})

selectMovie.addEventListener('change', e => {
    ticketPrice = +e.target.value;
    changeMovie(e.target.selectedIndex, e.target.value);
    updateSelectedSeats();
    const movieValue = selectMovie.options[selectMovie.selectedIndex].value;
    console.log(movieValue);
    switch (movieValue) {
        case "50":
            image.setAttribute('src', posters[0])
            break;
        case "35":
            image.setAttribute('src', posters[1])
            break;
        case "10":
            image.setAttribute('src', posters[2])
            break;
        case "20":
            image.setAttribute('src', posters[3])
            break;
        case "30":
            image.setAttribute('src', posters[4])
            break;
        default:
            break;
    }
    localStorage.setItem('moviePoster', image.src);
})

updateSelectedSeats();