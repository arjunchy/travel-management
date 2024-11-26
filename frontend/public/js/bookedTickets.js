// bookedTickets.js

document.addEventListener('DOMContentLoaded', fetchBookings);

async function fetchBookings() {
    try {
        const response = await fetch('/api/bookings');
        const bookings = await response.json();

        const ticketsDiv = document.getElementById('tickets');
        ticketsDiv.innerHTML = '';

        if (bookings.length > 0) {
            bookings.forEach(booking => {
                const div = document.createElement('div');
                div.innerHTML = `
                    <p>Name: ${booking.name} | Phone: ${booking.phone}</p>
                    <p>${booking.type} - ${booking.source} to ${booking.destination}</p>
                    <p>Date: ${booking.travelDate}</p>
                `;
                ticketsDiv.appendChild(div);
            });
        } else {
            ticketsDiv.innerHTML = '<p>No booked tickets available.</p>';
        }
    } catch (error) {
        console.error('Error fetching bookings:', error);
        alert('Failed to fetch booked tickets. Please try again.');
    }
}
