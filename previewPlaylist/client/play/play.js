var counter = 0;

Template.play.rendered = function(){

      var playlistData = Session.get('playlistData');

      counter = Getters.getNrOfTracks(playlistData);
      var trackUrl = Getters.getPreviewUrl(playlistData, counter-1);
      Session.set('albumURL', Getters.getAlbumCoverURL(Session.get('playlistData'), counter-1));
      Session.set('currIndex', counter-1);
      Player.play(trackUrl);

      setInterval(function () {
        var trackUrl = Getters.getPreviewUrl(playlistData, counter-1);
        Session.set('currIndex', counter-1);
        Player.play(trackUrl)}
        , 30000);

}

Template.play.helpers({
  playlistName: function(){
    return Getters.getName(Session.get('playlistData'));
  },
  nrTracks: function(){
    return Getters.getNrOfTracks(Session.get('playlistData'));
  },
  trackName: function(){
    return Getters.getTrackName(Session.get('playlistData'), Session.get('currIndex'));
  },
  trackArtist: function(){
    return 'Artist'
  },
  albumCover: function(){
    return Getters.getAlbumCoverURL(Session.get('playlistData'), Session.get('currIndex'));
  }
});

Player = {
  play: function(trackUrl){
    var audioObject = new Audio(trackUrl);
    audioObject.play();
    counter--;
    console.log(counter);
  }
}
