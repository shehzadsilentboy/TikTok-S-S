async function fetchVideos() {
    let username = document.getElementById("username").value;
    if (!username) {
        alert("Please enter a TikTok username!");
        return;
    }

    let videoContainer = document.getElementById("videos");
    videoContainer.innerHTML = "<p>Loading...</p>";

    try {
        let response = await fetch(`https://www.tiktok.com/@${username}`);
        let text = await response.text();

        // Extract video URLs using regex (not official API)
        let matches = [...text.matchAll(/"playAddr":"(.*?)"/g)];
        videoContainer.innerHTML = ""; // Clear previous content

        if (matches.length === 0) {
            videoContainer.innerHTML = "<p>No videos found or profile is private.</p>";
            return;
        }

        // Display latest videos
        matches.slice(0, 5).forEach(match => {
            let videoUrl = match[1].replace(/\\u0026/g, "&"); // Fix URL encoding
            let videoElement = `<video controls src="${videoUrl}" width="300"></video>`;
            videoContainer.innerHTML += videoElement;
        });
    } catch (error) {
        videoContainer.innerHTML = "<p>Error fetching videos. Try again later.</p>";
    }
}
