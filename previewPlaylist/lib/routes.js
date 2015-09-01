Router.map(function(){
  this.route('home', {
    path: '/'
  });

  this.route('play', {
    path: '/:_user/:_playlist'
  });
});

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

    Router.go('/');
  }
});
