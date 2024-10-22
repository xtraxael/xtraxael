/* jshint esversion: 6 */
// Declare backAudio in a wider scope
let backAudio = new Audio('back1.mp3'); // Initialize backAudio here
backAudio.loop = true; // Loop the audio
backAudio.volume = 0.0; // Start with imperceptible volume


// BEGINNING OF SIGN UP FORM DATA COLLECTOR //

document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signup-form');
    let signupButton = document.getElementById('signup-button');

    let userData = {
        name: '',
        email: '',
        ip: '',
        location: '',
        age: ''
    };

    // Function to get user's IP and location
    async function fetchIPAndLocation() {
        try {
            const response = await fetch('https://ipapi.co/json/');
            const data = await response.json();
            userData.ip = data.ip;
            userData.location = `${data.city}, ${data.region}, ${data.country_name}`;
        } catch (error) {
            console.error('Error fetching IP and location:', error);
        }
    }

    // Function to handle form transitions
    function handleFormStep(step) {
        signupForm.innerHTML = ''; // Clear existing form elements

        if (step === 1) {
            // Step 1: Enter Name
            const nameLabel = document.createElement('label');
            nameLabel.htmlFor = 'name-input';
            nameLabel.innerText = 'Name: ';

            const nameInput = document.createElement('input');
            nameInput.type = 'text';
            nameInput.placeholder = 'NAME';
            nameInput.id = 'name-input';
            nameInput.required = true;

            const nextButton = document.createElement('input');
            nextButton.type = 'button';
            nextButton.value = 'Next';
            nextButton.onclick = () => {
                const name = nameInput.value.trim();
                if (name) {
                    userData.name = name;
                    handleFormStep(2);
                } else {
                    alert('Please enter your name.');
                }
            };

            // Add Enter key functionality
            nameInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    nextButton.click();
                }
            });

            signupForm.appendChild(nameLabel);
            signupForm.appendChild(nameInput);
            signupForm.appendChild(nextButton);
            nameInput.focus();
        } else if (step === 2) {
            // Step 2: Enter Email
            const emailLabel = document.createElement('label');
            emailLabel.htmlFor = 'email-input';
            emailLabel.innerText = 'Email: ';

            const emailInput = document.createElement('input');
            emailInput.type = 'email';
            emailInput.placeholder = 'ENTER EMAIL';
            emailInput.id = 'email-input';
            emailInput.required = true;

            const submitButton = document.createElement('input');
            submitButton.type = 'button';
            submitButton.value = 'Submit';
            submitButton.onclick = () => {
                const email = emailInput.value.trim();
                if (validateEmail(email)) {
                    userData.email = email;
                    handleFormStep(3);
                } else {
                    alert('Please enter a valid email address.');
                }
            };

            // Add Enter key functionality
            emailInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    submitButton.click();
                }
            });

            signupForm.appendChild(emailLabel);
            signupForm.appendChild(emailInput);
            signupForm.appendChild(submitButton);
            emailInput.focus();
        } else if (step === 3) {
            // Step 3: Collect Age
            const ageLabel = document.createElement('label');
            ageLabel.htmlFor = 'age-input';
            ageLabel.innerText = 'Age: ';

            const ageInput = document.createElement('input');
            ageInput.type = 'number';
            ageInput.placeholder = 'AGE';
            ageInput.id = 'age-input';
            ageInput.min = '1';
            ageInput.required = true;

            const finalButton = document.createElement('input');
            finalButton.type = 'button';
            finalButton.value = 'Finish';
            finalButton.onclick = () => {
                const age = ageInput.value.trim();
                if (age && age > 0) {
                    userData.age = age;
                    submitData();
                } else {
                    alert('Please enter a valid age.');
                }
            };

            // Add Enter key functionality
            ageInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    finalButton.click();
                }
            });

            signupForm.appendChild(ageLabel);
            signupForm.appendChild(ageInput);
            signupForm.appendChild(finalButton);
            ageInput.focus();
        }
    }

    // Function to validate email format
    function validateEmail(email) {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

    // front end data submission // 
    async function submitData() {
        const spinner = document.createElement('div');
        spinner.classList.add('spinner');
        signupForm.appendChild(spinner);
    
        await fetchIPAndLocation();
    
        console.log('User Data:', userData);
        alert('Signup successful! Check the console for your submitted data.');
    
        signupForm.innerHTML = '<input type="button" id="signup-button" value="JOIN">';
        signupButton = document.getElementById('signup-button');
        signupButton.onclick = () => handleFormStep(1);
    }








    

    // Initial event listener for JOIN button
    signupButton.addEventListener('click', () => handleFormStep(1));
});

/*

// Add this JavaScript code for handling the "Join" text and form visibility
document.addEventListener('DOMContentLoaded', function() {
    const joinText = document.querySelector('.signup-form h2');
    const formContainer = document.querySelector('.signup-form form');

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

// Add mousemove event listener to handle both glow effect and volume adjustment for backAudio
    document.addEventListener('mousemove', function (e) {
        const logo = document.getElementById('logo');

        // Ensure backAudio and logo are initialized
        if (!backAudio || !logo) {
            return;
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
        const blurAmount = maxBlur * (1 - intensity);

        // Update the logo's style based on the calculated intensity and blur
        logo.style.filter = `drop-shadow(0 0 ${glowSize}px rgba(255, 255, 255, ${glowOpacity})) blur(${blurAmount}px)`;

        // Update volume of back1.mp3 based on the mouse distance
        const volumeMultiplier = 1.5; // Adjust if needed
        backAudio.volume = Math.min(1, Math.pow(intensity, 3) * volumeMultiplier);
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
    canvas.width = window.innerWidth; // Set canvas dimensions as required
    canvas.height = Math.max(document.body.scrollHeight, window.innerHeight); // Ensures the canvas covers everything

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

    // Part 1: Ensure backAudio continues playing on Page 2 if it wasn't already playing
    if (backAudio.paused) {
        backAudio.play().catch((error) => {
            console.error("Audio playback failed:", error);
        });
    }

    // Part 2: Reattach mousemove event listener for glow effect and volume adjustment of backAudio
    document.addEventListener('mousemove', function (e) {
        if (!backAudio) {
            return; // Ensure backAudio is initialized
        }

        const logo = document.getElementById('logo'); // Ensure you have the correct element if it exists on Page 2

        if (!logo) {
            return;  // Stop execution if logo is not found
        }

        const rect = logo.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // Calculate distance from the center of the logo to the mouse cursor
        const distance = Math.sqrt(Math.pow(centerX - e.clientX, 2) + Math.pow(centerY - e.clientY, 2));
        const maxDistance = 900;
        const maxGlowSize = 150;
        const maxBlur = 10;
        const intensity = Math.max(0, 1 - Math.pow(distance / maxDistance, 2));

        // Update glow effect
        const glowSize = maxGlowSize * intensity;
        const glowOpacity = Math.max(0, intensity);
        const blurAmount = maxBlur * (1 - intensity);
        logo.style.filter = `drop-shadow(0 0 ${glowSize}px rgba(255, 255, 255, ${glowOpacity})) blur(${blurAmount}px)`;

        // Update volume of back1.mp3
        const volumeMultiplier = 1.5; // Adjust if needed
        backAudio.volume = Math.min(1, Math.pow(intensity, 3) * volumeMultiplier);
    });
});




