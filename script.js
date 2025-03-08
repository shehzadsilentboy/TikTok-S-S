async function fetchVideos() {
    const keywords = document.getElementById('keywords').value;
    const url = `https://tiktok-scraper7.p.rapidapi.com/feed/search?keywords=${keywords}&region=us&count=10&cursor=0&publish_time=0&sort_type=0`;

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
        displayVideos(data);
    } catch (error) {
        console.error('Error fetching videos:', error);
    }
}

function displayVideos(data) {
    const videosContainer = document.getElementById('videos');
    videosContainer.innerHTML = '';

    data.data.forEach(video => {
        const videoElement = document.createElement('div');
        videoElement.classList.add('video');
        videoElement.innerHTML = `
            <a href="${video.video_url}" target="_blank">
                <img src="${video.cover}" alt="Video cover" width="200">
            </a>
            <p>Likes: ${video.digg_count}</p>
        `;
        videosContainer.appendChild(videoElement);
    });
}
