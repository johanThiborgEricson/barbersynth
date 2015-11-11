function Choir(voices) {
  var that = Object.create(Choir.prototype);
  
  that._voices = voices;
  
  return that;
}

Choir.prototype
.advanceChord = function() {
  var that = this;
  var chord = this._voices.map(function(voice) {
    return voice.advanceTime(that._time);
  });
  
  var frequencies = this.getFrequencies(chord);
  this.playFrequencies(frequencies);
};

Choir.prototype
.getFrequencies = function(notes) {
  var lowestNote = this.lowest(notes);
  lowestNote.getSubPartial(1);
};

Choir.prototype
.lowest = function(notes) {
  var lowestNote = notes.reduce(function(minTone, tone){
    return tone.toneMin(minTone);
  }, Note(Infinity));
  
  return lowestNote;
};

Choir.prototype
.playFrequencies = function() {
  
};
