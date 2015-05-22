var auth_url = 'https://accounts.spotify.com/authorize'

var data = {
  response_type: 'token',
  client_id: '7501f3e4d87546629dab55ee4ab9d3ec',
  redirect_uri: 'http://localhost:3000/callback',
}

Template.auth.events({
  'submit': function(event, instance){
    event.preventDefault();
    console.log("submit auth");
    window.location = auth_url + Helpers.toQueryString(data);
  }
});

//First get access token if not already exists
/*Router.onBeforeAction(function(){
  console.log('onBeforeAction');
  if(Auths.needsAuth()){
    window.location = auth_url + Helpers.toQueryString(data)
  }else {
    this.next();
  }
}, { except: ['callback'] });*/

//This is run when access token obtained
Router.route('/callback', function() {
  console.log('callback');
  var hash = this.params.hash;
  if(hash) {
    var data = Helpers.queryToObject(hash);
    Auths.insert({
      token: data.access_token,
      timestamp: new Date()
      });
    console.log("inserted an auth token");
    this.redirect('/');
  }
});
