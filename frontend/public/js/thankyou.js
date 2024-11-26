document.getElementById('bookingForm').addEventListener('submit', bookTravel);

function bookTravel(e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const type = document.getElementById('type').value;
    const source = document.getElementById('source').value;
    const destination = document.getElementById('destination').value;
    const date = document.getElementById('date').value;

    const booking = {
        name,
        phone,
        type,
        source,
        destination,
        date
    };

    // Send the booking details to the backend
    fetch('/api/bookings', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(booking)
    })
    .then(response => response.json())
    .then(data => {
        if (data.message) {
            // Redirect to thank you page
            window.location.href = 'thankyou.html';
        }
    })
    .catch(error => console.error('Error:', error));
}
