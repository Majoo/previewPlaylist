var spotifyApi = new SpotifyWebApi();

var SpotifyApiAdapter = {

  getPlaylist: function(userId, playlistId){
    spotifyApi.getPlaylist(userId, playlistId, null, function(err, data){
	    if(err){
	      console.error(err);

				var auth_url = 'https://accounts.spotify.com/authorize';

				var data = {
				  response_type: 'token',
				  client_id: '7501f3e4d87546629dab55ee4ab9d3ec',
				  redirect_uri: 'http://localhost:3000/callback',
				}

				window.location = auth_url + Helpers.toQueryString(data);
	    }else{
				Session.set('playlistData', data);
				Router.go('/'+userId+'/'+playlistId);
			}
	  });
  },
  setAccessToken: function(){
    var tokens = Auths.find({}, { sort: { timestamp: -1 } }).fetch();
	  console.log("most recent token: " + tokens[0].token);
	  spotifyApi.setAccessToken(tokens[0].token);
  }

};
