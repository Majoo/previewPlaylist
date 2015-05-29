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
      auth_url = 'https://accounts.spotify.com/authorize'

      data = {
        response_type: 'token',
        client_id: '7501f3e4d87546629dab55ee4ab9d3ec',
        redirect_uri: 'http://localhost:3000/callback',
      }
      
      window.location = auth_url + Helpers.toQueryString(data);
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
