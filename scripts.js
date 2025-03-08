document.getElementById('fetchBtn').addEventListener('click', fetchVideos);

async function fetchVideos() {
    const keywords = document.getElementById('keywords').value.trim();
    if (!keywords) {
        alert("Please enter some keywords!");
        return;
    }

    const url = `https://tiktok-scraper7.p.rapidapi.com/feed/search?keywords=${keywords}&region=us&count=5&cursor=0&publish_time=0&sort_type=0`;

    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': 'd73e73daccmshd5538e2469e414fp13847ejsn2be6e197649e',
            'x-rapidapi-host': 'tiktok-scraper7.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const data = await response.json();

        if (data.data && data.data.length > 0) {
            displayVideos(data.data);
        } else {
            document.getElementById('videos').innerHTML = "<p>No videos found.</p>";
        }
    } catch (error) {
        console.error('Error fetching videos:', error);
        alert("Failed to fetch videos. Check API key or internet connection.");
    }
}

function displayVideos(videos) {
    const videosContainer = document.getElementById('videos');
    videosContainer.innerHTML = '';

    videos.forEach(video => {
        const videoElement = document.createElement('div');
        videoElement.classList.add('video');
        videoElement.innerHTML = `
            <p>${video.title || "No Title"}</p>
            <video width="100%" controls>
                <source src="${video.play_url}" type="video/mp4">
                Your browser does not support the video tag.
            </video>
        `;
        videosContainer.appendChild(videoElement);
    });
}
