document.addEventListener('mousemove', function(e) {
    const logo = document.getElementById('logo');
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



/*New Page*/
    
});

document.querySelector(".signup-form h2").addEventListener("click", function() {
    // Create a new page
    const newWindow = window.open("", "_self"); // Open a new page in the same tab

    // Set the background color of the new page to red
    newWindow.document.body.style.backgroundColor = "red";

    // Add some content to the new page (optional)
    newWindow.document.body.innerHTML = "<h1>Welcome to the New Page!</h1><p>Thank you for joining us!</p>";

    // Create an image element for Cntrl.jpg
    const img = newWindow.document.createElement("img");
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
    newWindow.document.body.appendChild(img);
    
    // Create a play button
    const playButton = newWindow.document.createElement("button");
    playButton.textContent = "Play";
    playButton.style.position = "absolute";
    playButton.style.top = "50%";
    playButton.style.left = "50%";
    playButton.style.transform = "translate(-50%, -50%)";
    playButton.style.padding = "15px 30px";
    playButton.style.fontSize = "20px";
    playButton.style.zIndex = "10001"; // Ensure it's above all other elements

    // Append the play button to the body of the new page
    newWindow.document.body.appendChild(playButton);

    // Create an audio element for back1.mp3
    const audio = newWindow.document.createElement("audio");
    audio.src = "Cntrl.mp3"; // Replace with the correct path to back1.mp3
    newWindow.document.body.appendChild(audio);

    // Add an event listener to the play button to play the audio
    playButton.addEventListener("click", function() {
        audio.play();
    });
});

