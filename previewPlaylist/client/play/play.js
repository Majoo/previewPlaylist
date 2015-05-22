var spotifyApi = new SpotifyWebApi();
var playlistData;
var counter;

Template.play.rendered = function(){
  var tokens = Auths.find({}, { sort: { timestamp: -1 } }).fetch();
  console.log("most recent token: " + tokens[0].token);
  spotifyApi.setAccessToken(tokens[0].token);

  var urlSubs = window.location.pathname.split('/');
  var user = urlSubs[1];
  var playlist = urlSubs[2];

  spotifyApi.getPlaylist(user, playlist, null, function(err, data){
    if(err){
      console.error(err);
    }else{
      playlistData = data;

      counter = Getters.getNrOfTracks(playlistData);
      var trackUrl = Getters.getPreviewUrl(playlistData, counter-1);
      Player.play(trackUrl);

      setInterval(function () {
        var trackUrl = Getters.getPreviewUrl(playlistData, counter-1);
        Player.play(trackUrl)}
        , 30000);
    }
  });
}

Player = {
  play: function(trackUrl){
    var audioObject = new Audio(trackUrl);
    console.log(trackUrl);
    audioObject.play();
    counter--;
    console.log(counter);
  }
}
