function play(id) {
    var audio = new Audio();
    audio.src = "./audio/" + id + ".mp3";
    audio.play();
    console.log("PLAYING AUDIO: " + id);
}