var spotify = SpotifyApiAdapter;

Template.urlForm.events({
	'submit form': function(event, instance){
		event.preventDefault();
		Session.set('submitted', 'true');

		var url = instance.find('input').value;
		instance.find('input').value ='';

    var urlInfo = Helpers.urlToObject(url);
		Session.set('user', urlInfo.userId);
		Session.set('playlist', urlInfo.playlistId);

		spotify.setAccessToken();
		spotify.getPlaylist(urlInfo.userId, urlInfo.playlistId);

	}

});
