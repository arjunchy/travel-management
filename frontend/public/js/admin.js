document.getElementById('accommodation-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const formData = new FormData(this);
  const accommodationData = {
    name: formData.get('name'),
    location: formData.get('location'),
    price: formData.get('price'),
    description: formData.get('description'),
    date: formData.get('date')
  };

  // Send data to the backend
  fetch('/addaccommodation', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(accommodationData)
  })
  .then(response => response.json())
  .then(data => {
    alert('Accommodation added successfully!');
    console.log(data);
  })
  .catch(error => {
    alert('Failed to add accommodation');
    console.error(error);
  });
});
