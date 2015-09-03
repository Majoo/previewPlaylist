Player = {
  play: function(trackUrl){
    var audioObject = new Audio(trackUrl);
    audioObject.play();
    setTimeout(function(){audioObject.pause();},
    18500);
  }
}
