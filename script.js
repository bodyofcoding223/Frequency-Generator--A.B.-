let audioContext = null;
let oscillator = null;
let selectedWave = 'sine'; // Default wave type is 'Normal', equivalent to 'Sine'

// Add event listeners for wave buttons
document.querySelectorAll('.wave-button').forEach(button => {
    button.addEventListener('click', (event) => {
        document.querySelectorAll('.wave-button').forEach(btn => btn.classList.remove('active'));
        event.target.classList.add('active');
        selectedWave = event.target.getAttribute('data-wave') === 'normal' ? 'sine' : event.target.getAttribute('data-wave');
    });
});

document.getElementById('start').addEventListener('click', () => {
    const frequency = parseInt(document.getElementById('frequency').value);

    if (frequency < 1 || frequency > 1000000) {
        alert('Please enter a frequency between 1 and 1,000,000 Hz.');
        return;
    }

    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }

    oscillator = audioContext.createOscillator();
    oscillator.type = selectedWave;
    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
    oscillator.connect(audioContext.destination);
    oscillator.start();

    document.getElementById('start').disabled = true;
    document.getElementById('stop').disabled = false;
});

document.getElementById('stop').addEventListener('click', () => {
    if (oscillator) {
        oscillator.stop();
        oscillator.disconnect();
        oscillator = null;
    }

    document.getElementById('start').disabled = false;
    document.getElementById('stop').disabled = true;
});