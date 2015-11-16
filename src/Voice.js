function Voice(notes) {
  var that = Object.create(Voice.prototype);
  
  that._unsungNotes = notes.slice();
  that._nextNoteStart = Fraction(0, 1);
  that._singing = Note.nullObjectStart;
  
  return that;
}

Voice.prototype
.advanceTime = function(time) {
  if(time.lessThan(this._nextNoteStart)) {
    return this._singing;
  } else {
    var sing = this._unsungNotes.shift();
    this._nextNoteStart = sing.addTime(this._nextNoteStart);
    this._singing = sing;
    return sing;
  }
  
};

Voice.prototype
.nextNoteStartTimeMin = function(fraction) {
  return this._nextNoteStart.min(fraction);
};
