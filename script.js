const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const selectMovie = document.getElementById('movie');
const count = document.getElementById('count');
const totalCount = document.getElementById('total');

populateUI();

let ticketPrice = +selectMovie.value;

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
})

updateSelectedSeats();