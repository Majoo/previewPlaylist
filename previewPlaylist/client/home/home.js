Template.urlForm.events({
	'submit form': function(event, instance){
		event.preventDefault();
		console.log("urlForm submitted");

		var url = instance.find('input').value;
		instance.find('input').value ='';

    var urlInfo = Helpers.urlToObject(url);
		console.log(urlInfo.userId);
		console.log(urlInfo.playlistId);

		Router.go('/'+urlInfo.userId+'/'+urlInfo.playlistId);
	}
});
