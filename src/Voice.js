function Voice(notes) {
  var that = Object.create(Voice.prototype);
  
  that._unsungNotes = notes;
  that._time = Fraction(0, 1);
  
  return that;
}

Voice.prototype
.advanceTime = function(time, playing) {
  if(time.lessThan(this._time)) {
    return playing;
  } else {
    var play = this._unsungNotes.shift();
    this._time = play.addTime(this._time);
    return play;
  }
  
};

Voice.prototype
.nextNoteStartMin = function(fraction) {
  return this._time.min(fraction);
};
