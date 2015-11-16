function Choir(voices) {
  var that = Object.create(Choir.prototype);
  
  that._voices = voices;

  return that;
}

Choir.prototype
.advanceChord = function() {
  var nextNoteStartMin = this._voices.reduce(function(minTime, voice){
    return voice.nextNoteStartMin(minTime);
  }, Fraction(Infinity, 1));
  
  var chord = this._voices.map(function(voice) {
    return voice.advanceTime(nextNoteStartMin);
  });
  
  var lowestNote = this.lowest(chord);
  var frequencies = this.getFrequencies(chord, lowestNote);
  this.playFrequencies(frequencies);
};

Choir.prototype
.getFrequencies = function(notes, lowestNote) {
  var i = 1;
  var partials = null;
  while(!partials) {
    var suggestedF0 = lowestNote.getSubPartial(i++);
    partials = this.nearestPartialsOrNull(suggestedF0, notes);
  }
  
  return partials;
};

Choir.prototype
.nearestPartialsOrNull = function(suggestedF0, notes) {
  var partials = notes.map(function(note) {
    return note.nearestPartial(suggestedF0);
  });
  
  var nullFound = partials.reduce(function(nullFound, partial) {
    return nullFound || (partial === null);
  }, false);
  
  return nullFound ? null : partials;
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
