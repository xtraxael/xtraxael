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
document.querySelector(".signup-form h2").addEventListener("click", function () {
    // Clear existing content and set up Page 2
    document.body.innerHTML = ""; 
    document.body.style.backgroundColor = "red";
    document.body.innerHTML = "<h1>Welcome to the New Page!</h1><p>Thank you for joining us!</p>";

    /* // Create an image for Cntrl.jpg
    const img = document.createElement("img");
    img.src = "Cntrl.jpg";
    img.alt = "Cntrl Image";
    img.style.position = "absolute";
    img.style.left = "0";
    img.style.top = "50%";
    img.style.transform = "translateY(-50%)";
    img.style.width = "300px";
    img.style.height = "auto";
    img.style.zIndex = "10000";
    document.body.appendChild(img); */

    // Create a play button for Page 2
    const playButtonPage2 = document.createElement("button");
    playButtonPage2.textContent = "Play";
    playButtonPage2.style.position = "absolute";
    playButtonPage2.style.top = "50%";
    playButtonPage2.style.left = "50%";
    playButtonPage2.style.transform = "translate(-50%, -50%)";
    playButtonPage2.style.padding = "15px 30px";
    playButtonPage2.style.fontSize = "20px";
    playButtonPage2.style.zIndex = "10001";
    document.body.appendChild(playButtonPage2);

    // Add Cntrl.mp3 audio element on Page 2
    const audio = new Audio("Cntrl.mp3");
    document.body.appendChild(audio);

    // Add an event listener to the play button to play the audio
    playButtonPage2.addEventListener("click", function () {
        audio.play().then(() => {
            console.log("Playback started successfully.");
        }).catch((error) => {
            console.error("Playback failed:", error);
            alert("Playback could not be started. Please ensure the page has been interacted with.");
        });
        document.body.removeChild(playButtonPage2); // Remove play button after starting audio
    });

    // Setup visualizer for Cntrl.mp3
    const canvas = document.createElement("canvas");
    canvas.id = "audio-visualizer";
    canvas.width = 800; // Set canvas dimensions as required
    canvas.height = 200;
    document.body.appendChild(canvas);

    const ctx = canvas.getContext("2d");
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const analyser = audioContext.createAnalyser();
    const source = audioContext.createMediaElementSource(audio);
    source.connect(analyser);
    analyser.connect(audioContext.destination);
    analyser.fftSize = 2048;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    // Function to draw the visualizer
    function draw() {
        requestAnimationFrame(draw);
        analyser.getByteTimeDomainData(dataArray);
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.lineWidth = 2;
        ctx.strokeStyle = "red";
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

