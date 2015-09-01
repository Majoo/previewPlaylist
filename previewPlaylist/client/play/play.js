var playlistData;
var counter;

Template.play.rendered = function(){

      playlistData = Session.get('playlistData');

      counter = Getters.getNrOfTracks(playlistData);
      var trackUrl = Getters.getPreviewUrl(playlistData, counter-1);
      Player.play(trackUrl);

      setInterval(function () {
        var trackUrl = Getters.getPreviewUrl(playlistData, counter-1);
        Player.play(trackUrl)}
        , 30000);

}

Template.play.helpers({
  playlistName: function(){
    return Getters.getName(Session.get('playlistData'));
  },
  nrTracks: function(){
    return Getters.getNrOfTracks(Session.get('playlistData'));
  }
});

Player = {
  play: function(trackUrl){
    var audioObject = new Audio(trackUrl);
    console.log(trackUrl);
    audioObject.play();
    counter--;
    console.log(counter);
  }
}
