async function fetchVideos() {
    let username = document.getElementById("username").value;
    let url = `https://ensembledata.com/apis/tt/user/posts?username=${username}`;

    try {
        let response = await fetch(url);
        let data = await response.json();

        let videoContainer = document.getElementById("videos");
        videoContainer.innerHTML = "";

        data.posts.forEach(post => {
            let videoElement = document.createElement("div");
            videoElement.classList.add("video");
            videoElement.innerHTML = `<video src="${post.videoUrl}" controls width="300"></video>`;
            videoContainer.appendChild(videoElement);
        });

    } catch (error) {
        console.log("Error fetching videos:", error);
    }
                           }
