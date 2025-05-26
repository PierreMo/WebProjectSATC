document.addEventListener('DOMContentLoaded', function() {
    const klaxonSound = document.getElementById('klaxonSound');

    // Function to play the sound
    function playKlaxonSound() {
        klaxonSound.currentTime = 0; // Reset to the start
        klaxonSound.play().catch(e => console.log("Audio play failed:", e));
    }

    // Add click event listener to the entire document
    document.addEventListener('click', playKlaxonSound);
});
