var counter = 0;

Template.play.rendered = function(){
      var playlistData = Session.get('playlistData');

      counter = Getters.getNrOfTracks(playlistData)-1;
      var trackUrl = Getters.getPreviewUrl(playlistData, counter);
      Session.set('albumURL', Getters.getAlbumCoverURL(Session.get('playlistData'), counter));
      Session.set('currIndex', counter);
      Player.play(trackUrl);
      counter--;
      console.log(counter);

      setInterval(function () {
        var trackUrl = Getters.getPreviewUrl(playlistData, counter);
        Session.set('currIndex', counter);
        Player.play(trackUrl);
        counter--;
        console.log(counter);}
        , 18000);
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
    return Getters.getArtist(Session.get('playlistData'), Session.get('currIndex'));
  },
  albumCover: function(){
    return Getters.getAlbumCoverURL(Session.get('playlistData'), Session.get('currIndex'));
  }
});
