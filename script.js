document.addEventListener('mousemove', function(e) {
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
    const maxDistance = 2000; // Maximum distance at which the effects are visible
    const maxGlowSize = 150; // Maximum size of the glow in pixels
    const maxBlur = 10; // Maximum blur amount in pixels

    // Calculate intensity based on distance
    const intensity = Math.max(0, 1 - (distance / maxDistance));

    // Calculate glow size and opacity
    const glowSize = maxGlowSize * intensity;
    const glowOpacity = Math.max(0, intensity);

    // Calculate blur amount
    const blurAmount = maxBlur * (1 - intensity);

    // Update the logo's style based on the calculated intensity and blur
    logo.style.filter = `drop-shadow(0 0 ${glowSize}px rgba(255, 255, 255, ${glowOpacity})) blur(${blurAmount}px)`;
    
    // **Modified Line**: Update volume of back1.mp3 based on the mouse distance
    backAudio.volume = Math.max(0, Math.min(1, 1 - (distance / maxDistance))); // Calculate volume based on distance, clamped between 0 and 1
});

// Add this JavaScript code for handling the "Join" text and form visibility

document.addEventListener('DOMContentLoaded', function() {
    const joinText = document.querySelector('.signup-form h2');
    const formContainer = document.querySelector('.signup-form form');

    // Add click event listener to "Join" text
    joinText.addEventListener('click', function() {
        // Fade out "Join" text
        joinText.style.opacity = '0';

        // Wait for the "Join" text to fade out before showing the form
        setTimeout(function() {
            joinText.style.display = 'none'; // Hide "Join" text completely
            formContainer.style.opacity = '1'; // Make the form visible
            formContainer.style.visibility = 'visible'; // Ensure it's visible
        }, 500); // Match this with the CSS transition duration (0.5s)
    });
});

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


/*New Page*/
    


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

document.addEventListener('DOMContentLoaded', function () {
    // Create an audio element for back1.mp3
    const backAudio = new Audio('back1.mp3'); // Make sure the path to back1.mp3 is correct
    backAudio.loop = true; // Loop the audio
    backAudio.volume = 0.0; // Start with imperceptible volume

    // Play the audio only after a user interaction to bypass browser autoplay restrictions
    document.body.addEventListener("mousemove", function () {
        if (backAudio.paused) {
            backAudio.play().catch((error) => {
                console.error("Audio playback failed:", error);
            });
        }
    }, { once: true }); // Ensure audio plays only once after the first interaction

    // Add mousemove event listener to handle both glow effect and volume adjustment
    document.addEventListener('mousemove', function (e) {
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
        const maxDistance = 2000; // Maximum distance at which the effects are visible
        const maxGlowSize = 150; // Maximum size of the glow in pixels
        const maxBlur = 10; // Maximum blur amount in pixels

        // Calculate intensity based on distance
        const intensity = Math.max(0, 1 - (distance / maxDistance));

        // Calculate glow size and opacity
        const glowSize = maxGlowSize * intensity;
        const glowOpacity = Math.max(0, intensity);

        // Calculate blur amount
        const blurAmount = maxBlur * (1 - intensity);

        // Update the logo's style based on the calculated intensity and blur
        logo.style.filter = `drop-shadow(0 0 ${glowSize}px rgba(255, 255, 255, ${glowOpacity})) blur(${blurAmount}px)`;

        // Update volume of back1.mp3 based on the mouse distance
        backAudio.volume = Math.max(0, Math.min(1, intensity)); // Calculate volume based on intensity, clamped between 0 and 1
    });
});



