function Song(theTitle, lilyPonds) {
  var that = Object.create(Song.prototype);
  
  var radio = document.createElement("INPUT");
  radio.type = "radio";
  radio.name = "title";
  that._radio = radio;
  
  that._label = document.createTextNode(theTitle);
  
  that._lilyPonds = lilyPonds.map(function(lilyPond) {
    var input = document.createElement("INPUT");
    input.value = lilyPond;
    return input;
  });
  
  return that;
}
