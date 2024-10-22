/* jshint esversion: 6 */
// Declare backAudio in a wider scope
let backAudio = new Audio('back1.mp3'); // Initialize backAudio here
backAudio.loop = true; // Loop the audio
backAudio.volume = 0.0; // Start with imperceptible volume


/*

// Add this JavaScript code for handling the "Join" text and form visibility
document.addEventListener('DOMContentLoaded', function() {
    const joinText = document.querySelector('.signup-form h2');
    const formContainer = document.querySelector('.signup-form form');

    backAudio = new Audio('back1.mp3'); // Initialize backAudio
    backAudio.loop = true; // Loop the audio so it plays continuously
    backAudio.volume = 0.0; // Set the initial volume to imperceptible (essentially muted)

    // Add click event listener to "Join" text
    joinText.addEventListener('mousemove', function() {
        // Fade out "Join" text
        joinText.style.opacity = '0';

        // Wait for the "Join" text to fade out before showing the form
        setTimeout(function() {
            joinText.style.display = 'none'; // Hide "Join" text completely
            formContainer.style.opacity = '1'; // Make the form visible
            formContainer.style.visibility = 'visible'; // Ensure it's visible
        }, 500); // Match this with the CSS transition duration (0.5s)
    });
}); */

document.getElementById("email-form").addEventListener("submit", function(e) {
    e.preventDefault(); // Prevent default form submission

    const email = document.getElementById("email").value;
    if (email) {
        // Retrieve any existing emails from localStorage or create a new array if none exist
        let emails = localStorage.getItem("emails") ? JSON.parse(localStorage.getItem("emails")) : [];
        emails.push(email); // Add new email to the array
        localStorage.setItem("emails", JSON.stringify(emails)); // Save updated email list to localStorage

        // Notify the user or console log the stored emails
        alert("Email collected: " + email);
        console.log("Collected emails: ", emails);
    } else {
        alert("Please enter a valid email.");
    }
});

/* New Page */

document.querySelector(".signup-form h2").addEventListener("click", function() {
    // Redirect to the same page but modify the content dynamically
    document.body.innerHTML = ""; // Clear the existing content
    
    // Set the background color of the current page to red
    document.body.style.backgroundColor = "red";

    // Add content directly to the current page
    document.body.innerHTML = "<h1>Welcome to the New Page!</h1><p>Thank you for joining us!</p>";

    // Create an image element for Cntrl.jpg
    const img = document.createElement("img");
    img.src = "Cntrl.jpg"; // Replace with the correct path to Cntrl.jpg
    img.alt = "Cntrl Image";

    // Style the image to position it center-left and scale it appropriately
    img.style.position = "absolute";
    img.style.left = "0";
    img.style.top = "50%";
    img.style.transform = "translateY(-50%)";
    img.style.width = "300px"; // Set a fixed width for better scaling
    img.style.height = "auto"; // Maintain aspect ratio
    img.style.zIndex = "10000"; // Ensure it's above all other elements

    // Append the image to the body of the new page
    document.body.appendChild(img);
    
    // Create a play button
    const playButton = document.createElement("button");
    playButton.textContent = "Play";
    playButton.style.position = "absolute";
    playButton.style.top = "50%";
    playButton.style.left = "50%";
    playButton.style.transform = "translate(-50%, -50%)";
    playButton.style.padding = "15px 30px";
    playButton.style.fontSize = "20px";
    playButton.style.zIndex = "10001"; // Ensure it's above all other elements

      // Add Cntrl.mp3 audio element on Page 2
    const audio = document.createElement("audio");
    audio.src = "Cntrl.mp3"; 
    document.body.appendChild(audio);

    // Add an event listener to the play button to play the audio
    playButton.addEventListener("click", function () {
        audio.play().then(() => {
            console.log("Playback started successfully.");
        }).catch((error) => {
            console.error("Playback failed:", error);
            alert("Playback could not be started. Please ensure the page has been interacted with.");
        });
    });
});
    
    // Append the play button to the body of the new page
    document.body.appendChild(playButton);

    const audio = document.createElement("audio");
    audio.src = "Cntrl.mp3"; 
    document.body.appendChild(audio);

    // Add an event listener to the play button to play the audio
    playButton.addEventListener("click", function () {
        audio.play().then(() => {
            console.log("Playback started successfully.");
        }).catch((error) => {
            console.error("Playback failed:", error);
            alert("Playback could not be started. Please ensure the page has been interacted with.");
        });
    });

// CONSOLIDATED MOUSE MOVE // ------------------------------------------------------

// Play the audio only after a user interaction to bypass browser autoplay restrictions
document.body.addEventListener("click", function () {
    if (backAudio.paused) {
        backAudio.play().catch((error) => {
            console.error("Audio playback failed:", error);
        });
    }
}, { once: true }); // Ensure audio plays only once after the first interaction

// Add mousemove event listener to handle both glow effect and volume adjustment
document.addEventListener('mousemove', function (e) {
    if (!backAudio) {
        return; // Ensure backAudio has been initialized
    }

    const logo = document.getElementById('logo');

    // Add this null check to prevent errors when the logo is not present
    if (!logo) {
        return;  // Stop execution if logo is not found
    }

    const rect = logo.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Calculate distance from the center of the logo to the mouse cursor
    const distance = Math.sqrt(Math.pow(centerX - e.clientX, 2) + Math.pow(centerY - e.clientY, 2));

    // Define the maximum effect distance and maximum values for effects
    const maxDistance = 900; // Maximum distance at which the effects are visible
    const maxGlowSize = 150; // Maximum size of the glow in pixels
    const maxBlur = 10; // Maximum blur amount in pixels

    // Calculate intensity based on distance
    const intensity = Math.max(0, 1 - Math.pow(distance / maxDistance, 2));

    // Calculate glow size and opacity
    const glowSize = maxGlowSize * intensity;
    const glowOpacity = Math.max(0, intensity);

    // Calculate blur amount
    const blurAmount = maxBlur * (1 - intensity);

    // Update the logo's style based on the calculated intensity and blur
    logo.style.filter = `drop-shadow(0 0 ${glowSize}px rgba(255, 255, 255, ${glowOpacity})) blur(${blurAmount}px)`;

    // Increase the max volume by multiplying the intensity by a factor, then clamp it to 1
    const volumeMultiplier = 1.5; // Multiplier to make max volume higher
    backAudio.volume = Math.min(1, Math.pow(intensity, 3) * volumeMultiplier); // Calculate volume based on intensity, with enhanced max volume
});



// Step 1: Setup the canvas and audio context
document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.getElementById("audio-visualizer");
    const ctx = canvas.getContext("2d");

    // Create an audio element for the existing audio file (e.g., Cntrl.mp3)
    const audio = new Audio("Cntrl.mp3");
    audio.loop = true; // Loop the audio for continuous playback

    // Step 2: Create AudioContext and AnalyserNode
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const analyser = audioContext.createAnalyser();

    // Connect audio element to the AudioContext
    const source = audioContext.createMediaElementSource(audio);
    source.connect(analyser);
    analyser.connect(audioContext.destination);

    analyser.fftSize = 2048; // Set FFT size for higher frequency resolution
    const bufferLength = analyser.frequencyBinCount; // Number of data points
    const dataArray = new Uint8Array(bufferLength);

    // Step 3: Play audio on interaction (due to autoplay restrictions)
    const playButton = document.createElement("button");
    playButton.textContent = "Play Audio";
    playButton.style.position = "absolute";
    playButton.style.top = "60%";
    playButton.style.left = "50%";
    playButton.style.transform = "translate(-50%, -50%)";
    playButton.style.padding = "15px 30px";
    playButton.style.fontSize = "20px";

    document.body.appendChild(playButton);

    playButton.addEventListener("click", function () {
        if (audioContext.state === "suspended") {
            audioContext.resume();
        }
        audio.play().catch((error) => {
            console.error("Audio playback failed:", error);
        });
        document.body.removeChild(playButton); // Remove play button after starting audio
    });

    // Step 4: Draw the visualizer
    function draw() {
        requestAnimationFrame(draw);

        analyser.getByteTimeDomainData(dataArray);

        ctx.fillStyle = "black"; // Background color for canvas
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.lineWidth = 2;
        ctx.strokeStyle = "red"; // Waveform color

        ctx.beginPath();

        const sliceWidth = (canvas.width * 1.0) / bufferLength;
        let x = 0;

        for (let i = 0; i < bufferLength; i++) {
            const v = dataArray[i] / 128.0;
            const y = (v * canvas.height) / 2;

            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }

            x += sliceWidth;
        }

        ctx.lineTo(canvas.width, canvas.height / 2);
        ctx.stroke();
    }

    draw(); // Start drawing the visualizer
});

