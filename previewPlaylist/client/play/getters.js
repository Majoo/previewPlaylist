//These getters require a playlist object from Spotify
Getters = {
  getName: function(playlist){
    return playlist.name;
  },

  getNrOfTracks: function(playlist){
    return playlist.tracks.items.length;
  },

  getPreviewUrl: function(playlist, index){
    return playlist.tracks.items[index].track.preview_url;
  }
}