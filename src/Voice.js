function Voice(notes) {
  this._unsungNotes = notes.slice();
  this._nextNoteStart = new Fraction(0, 1);
  this._singing = Note.nullObjectStart;
}

Voice.prototype
.advanceTime = function(time) {
  if(time.lessThan(this._nextNoteStart)) {
    // continue sinning same note
  } else if(this._unsungNotes.length === 0) {
    this._singing = null;
  } else {
    var sing = this._unsungNotes.shift();
    this._nextNoteStart = sing.addTime(this._nextNoteStart);
    this._singing = sing;
  }
  return this._singing;
};

Voice.prototype
.nextNoteStartTimeMin = function(fraction) {
  return this._nextNoteStart.min(fraction);
};
