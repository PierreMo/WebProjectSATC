function estimateTransport(){
    // Estimation for transport price
    document.querySelector('#transportFieldset input[type="button"]').addEventListener('click', function() {
        const distance = parseFloat(document.getElementById('distanceTransport').value) || 0;
        const weight = parseFloat(document.getElementById('weightTransport').value) || 0;
        const volume = parseFloat(document.getElementById('volumeTransport').value) || 0;
        const frequency = document.getElementById('frequency').value;

        // coefficient
        let pricePerKm = 0.5; // Example price per km
        let pricePerKg = 0.1; // Example price per kg
        let pricePerVolume = 5; // Example price per m³

        let basePrice = distance * pricePerKm + weight * pricePerKg + volume * pricePerVolume;

        // applying frequency as a discount
        let frequencyFactor = 1;
        switch(frequency) {
            case 'Annuel':
                frequencyFactor = 0.9;
                break;
            case 'Biannuel':
                frequencyFactor = 0.95;
                break;
            case 'Mensuel':
                frequencyFactor = 0.85;
                break;
            case 'Hebdomadaire':
                frequencyFactor = 0.8;
                break;
        }
        const estimatedPrice = basePrice * frequencyFactor;

        // displaying the estimation
        document.getElementById('estimationTransport').style.display = 'block';
        document.getElementById('estimationTransport').innerHTML = `<p>Tarif estimé : ${estimatedPrice.toFixed(2)} €</p>`;
    });
}


function estimateLocation(){
    document.querySelector('#rentFieldset input[type="button"]').addEventListener('click', function() {
        const distance = parseFloat(document.getElementById('distanceRent').value) || 0;
        const duration = parseFloat(document.getElementById('durationRent').value) || 0;
        const volume = parseFloat(document.getElementById('volumeRent').value) || 0;

        // coefficient
        let pricePerDay = 50; // Example price per day
        let pricePerKm = 0.3; // Example price per km
        let pricePerVolume = 3; // Example price per m³

        let price = duration * pricePerDay + distance * pricePerKm + volume * pricePerVolume;

        document.getElementById('estimationRent').style.display = 'block';
        document.getElementById('estimationRent').innerHTML = `<p>Tarif estimé : ${price.toFixed(2)} €</p>`;
    });
}
