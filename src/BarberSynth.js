function BarberSynth(songs) {
  var that = Object.create(BarberSynth.prototype);
  
  that._songs = [];
  for(var song in songs) {
    that._songs.push(Song(song, songs[song]));
  }
  
  that._titleForm = document.createElement("FORM");
  that._lilyPondsForm = document.createElement("FORM");
  that._playJust = document.createElement("BUTTON");
  
  return that;
}
