document.addEventListener('DOMContentLoaded', function() {
    const klaxonSound = document.getElementById('klaxonSound');
    function playKlaxonSound() {
        klaxonSound.currentTime = 0; // Reset to the start
        klaxonSound.play().catch(e => console.log("Audio play failed:", e));
    }
    document.addEventListener('click', playKlaxonSound);
});
