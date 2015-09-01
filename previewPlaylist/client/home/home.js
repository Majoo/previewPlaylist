var spotifyApi = new SpotifyWebApi();

Template.urlForm.events({
	'submit form': function(event, instance){
		event.preventDefault();
		console.log("urlForm submitted");

		var url = instance.find('input').value;
		instance.find('input').value ='';

    var urlInfo = Helpers.urlToObject(url);
		console.log(urlInfo.userId);
		console.log(urlInfo.playlistId);

		var tokens = Auths.find({}, { sort: { timestamp: -1 } }).fetch();
	  console.log("most recent token: " + tokens[0].token);
	  spotifyApi.setAccessToken(tokens[0].token);

	  spotifyApi.getPlaylist(urlInfo.userId, urlInfo.playlistId, null, function(err, data){
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
				Router.go('/'+urlInfo.userId+'/'+urlInfo.playlistId);
			}
	  });

	}

});
