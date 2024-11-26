// booking.js

document.getElementById('bookingForm').addEventListener('submit', searchAccommodations);

async function searchAccommodations(e) {
    e.preventDefault();

    const type = document.getElementById('type').value;
    const source = document.getElementById('source').value;
    const destination = document.getElementById('destination').value;
    const travelDate = document.getElementById('date').value;

    try {
        const response = await fetch(`/api/accommodations?type=${type}&source=${source}&destination=${destination}&travelDate=${travelDate}`);
        const accommodations = await response.json();

        const resultsDiv = document.getElementById('results');
        resultsDiv.innerHTML = '';

        if (accommodations.length > 0) {
            accommodations.forEach(accommodation => {
                const div = document.createElement('div');
                div.innerHTML = `
                    <p>${accommodation.type} - ${accommodation.source} to ${accommodation.destination}</p>
                    <p>Date: ${accommodation.travelDate} | Seats: ${accommodation.availableSeats}</p>
                    <button onclick="bookTicket(${accommodation.id})">Book</button>
                `;
                resultsDiv.appendChild(div);
            });
        } else {
            resultsDiv.innerHTML = '<p>No accommodations found for the selected criteria.</p>';
        }
    } catch (error) {
        console.error('Error searching accommodations:', error);
        alert('Failed to fetch accommodations. Please try again.');
    }
}

async function bookTicket(accommodationId) {
    const name = prompt('Enter your name:');
    const phone = prompt('Enter your phone number:');

    if (!name || !phone) {
        alert('Name and phone are required.');
        return;
    }

    try {
        const response = await fetch('/api/bookings', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ accommodationId, name, phone })
        });

        const result = await response.json();
        if (response.ok) {
            alert('Ticket booked successfully!');
            window.location.href = 'thankyou.html';
        } else {
            alert(`Error: ${result.message}`);
        }
    } catch (error) {
        console.error('Error booking ticket:', error);
        alert('Failed to book ticket. Please try again.');
    }
}
// Fetch available accommodations based on selected dates
function fetchAccommodations(fromDate, toDate) {
    fetch(`/get-accommodations?fromDate=${fromDate}&toDate=${toDate}`)
        .then(response => response.json())
        .then(data => {
            if (data.message) {
                // Handle the case when no accommodations are available
                alert(data.message);
                return;
            }

            // Process and display available accommodations
            let accommodationsList = document.getElementById('accommodation-list');
            accommodationsList.innerHTML = '';

            data.forEach(accommodation => {
                let accommodationItem = document.createElement('div');
                accommodationItem.classList.add('accommodation');
                accommodationItem.innerHTML = `
                    <h3>${accommodation.type}</h3>
                    <p>Location: ${accommodation.location}</p>
                    <p>Price: $${accommodation.price}</p>
                    <p>Available from: ${accommodation.available_from}</p>
                    <p>Available to: ${accommodation.available_to}</p>
                `;
                accommodationsList.appendChild(accommodationItem);
            });
        })
        .catch(error => {
            console.error('Error fetching accommodations:', error);
            alert('Failed to fetch accommodations');
        });
}

// Event listener to trigger fetch on date selection (example)
document.getElementById('searchButton').addEventListener('click', () => {
    let fromDate = document.getElementById('fromDate').value;
    let toDate = document.getElementById('toDate').value;

    fetchAccommodations(fromDate, toDate);
});

