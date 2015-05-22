Router.map(function(){
  this.route('home', {
    path: '/'
  });

  this.route('play', {
    path: '/:_user/:_playlist'
  });
});
