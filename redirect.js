function redirectToNewPage() {
    // Create a new page
    const newWindow = window.open("", "_self"); // Open a new page in the same tab

    // Set the background color of the new page to red
    newWindow.document.body.style.backgroundColor = "red";

    // Add some content to the new page (optional)
    newWindow.document.body.innerHTML = "<h1>Welcome to the New Page!</h1>";
}
