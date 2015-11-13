function Voice(notes) {
  var that = Object.create(Voice.prototype);
  
  that._unsungNotes = notes.slice();
  that._nextNoteStart = Fraction(0, 1);
  
  return that;
}

Voice.prototype
.advanceTime = function(time, playing) {
  if(time.lessThan(this._nextNoteStart)) {
    return playing;
  } else {
    var play = this._unsungNotes.shift();
    this._nextNoteStart = play.addTime(this._nextNoteStart);
    return play;
  }
  
};

Voice.prototype
.nextNoteStartMin = function(fraction) {
  return this._nextNoteStart.min(fraction);
};
