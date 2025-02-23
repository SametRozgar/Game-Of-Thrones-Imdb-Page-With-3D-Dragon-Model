document.getElementById("play-trailer").addEventListener("click", function() {
    window.open("https://www.youtube.com/watch?v=tdwGrD169hE&ab_channel=Targaryen", "_blank");
});

const trailerVideo = document.getElementById("trailer-video");

trailerVideo.addEventListener("mouseenter", function() {
    this.play();
    this.removeAttribute("imdb-poster"); 
});

trailerVideo.addEventListener("mouseleave", function() {
    this.pause();
    this.currentTime = 0;
    this.load(); 
});
