document.getElementById('addAccommodationForm').addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevent default form submission

    // Retrieve form values
    const name = document.getElementById('name').value;
    const type = document.getElementById('type').value;
    const source = document.getElementById('source').value;
    const destination = document.getElementById('destination').value;
    const travelDate = document.getElementById('travelDate').value;
    let availableSeats = document.getElementById('availableSeats').value;

    // Debugging: Log the values to see if they are being correctly retrieved
    console.log('Form Values:', { name, type, source, destination, travelDate, availableSeats });

    // Ensure availableSeats is a valid integer
    availableSeats = parseInt(availableSeats, 10);

    // Check if all required fields are filled and availableSeats is a valid number
    if (!name || !type || !source || !destination || !travelDate || isNaN(availableSeats)) {
        let missingFields = [];

        if (!name) missingFields.push('Accommodation Name');
        if (!type) missingFields.push('Type (Flight, Train, Car)');
        if (!source) missingFields.push('Source');
        if (!destination) missingFields.push('Destination');
        if (!travelDate) missingFields.push('Travel Date');
        if (isNaN(availableSeats)) missingFields.push('Available Seats (should be a valid number)');

        // If fields are missing, show an alert with the names of the missing fields
        alert(`Please fill in the following fields:\n- ${missingFields.join('\n- ')}`);
        return;
    }

    try {
        // Send data to backend
        const response = await fetch('/add-accommodation', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, type, source, destination, travelDate, availableSeats }),
        });

        if (response.ok) {
            const result = await response.json();
            alert('Accommodation added successfully!');
            document.getElementById('addAccommodationForm').reset(); // Reset form after submission
        } else {
            const errorData = await response.json();
            alert(`Error: ${errorData.message}`);
        }
    } catch (error) {
        console.error('Error adding accommodation:', error);
        alert('Failed to add accommodation. Please try again.');
    }
});
