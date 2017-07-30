function Choir(voices) {
  this._voices = voices;
}

//  TODO: Should set chord to [] when all notes are end notes.
Choir.prototype
.advanceChord = function() {
  var nextChordStartTime = this._voices.reduce(function(minTime, voice){
    return voice.nextNoteStartTimeMin(minTime);
  }, new Fraction(Infinity, 1));
  
  var chord = this._voices.map(function(voice) {
    return voice.advanceTime(nextChordStartTime);
  });
  
  if(chord[0] === null) {
    chord = [];
  }
  
  var lowestNote = this.lowest(chord);
  this.asPartials(chord, lowestNote);
  return [chord, nextChordStartTime];
};

Choir.prototype
.asPartials2 = function(notes, lowestNote) {
  var i = 1;
  var partials = null;
  var suggestedFundamental;
  while(!partials) {
    suggestedFundamental = lowestNote.getSubPartial(i++);
    partials = this.nearestPartialsOrNull(suggestedFundamental, notes);
  }
  
  return [suggestedFundamental, partials];
};

Choir.prototype
.asPartials = function(notes, lowestNote) {
  var partialsFound = false;
  var i = 1;
  var suggestedFundamental;
  while(!partialsFound) {
    suggestedFundamental = lowestNote.getSubPartial(i++);
    partialsFound = this.findClosePartials(suggestedFundamental, notes);
  }
};

Choir.prototype
.nearestPartialsOrNull = function(suggestedFundamental, notes) {
  var partials = notes.map(function(note) {
    
    return note.nearestPartial(suggestedFundamental);
  });
  
  var nullFound = partials.reduce(function(nullFound, partial) {
    return nullFound || (partial === null);
  }, false);
  
  return nullFound ? null : partials;
};

Choir.prototype
.findClosePartials = function(suggestedFundamental, notes) {
  var partialsFound = notes.reduce(function(result, note){
    return result && note.findClosePartial(suggestedFundamental);
  }, true);
  
  if(!partialsFound) {
    notes.map(function(note) {
      note.fundamental = undefined;
      note.partial = undefined;
    });
  }
  
  return partialsFound;
};

Choir.prototype
.lowest = function(notes) {
  var lowestNote = notes.reduce(function(minTone, tone){
    return tone.toneMin(minTone);
  }, new Note(Infinity));
  
  return lowestNote;
};
