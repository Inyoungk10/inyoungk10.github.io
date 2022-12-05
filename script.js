function play(id) {
    var audio = new Audio();
    audio.src = "./audio/" + id + ".mp3";
    audio.play();
}

for (let i = 1; i < 41; i++) {
    console.log("<div id=\"" + i + "\" onclick=\"play("+ i +")\"> <img src=\"./img/test.png\"></div>");
    console.log()
}