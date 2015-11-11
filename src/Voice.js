function Voice(notes) {
  var that = Object.create(Voice.prototype);
  
  that._notes = notes;
  that._startTime = Fraction(0, 1);
  
  return that;
}

Voice.prototype
.advanceTime = function(time) {
  
  // TODO: replace [0] and shift with reverse, peek and pop.
  if(this._notes[0].hasEnded(this._startTime, time)) {
    this._notes.shift();
    this._startTime = time;
  }
  
  return this._notes[0];
};

Voice.prototype
.nextNoteStartMin = function() {
  
};
