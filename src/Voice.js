function Voice(notes) {
  var that = Object.create(Voice.prototype);
  
  that._notes = notes;
  that._pointer = 0;
  
  return that;
}

Voice.prototype
.advanceTime = function(time) {
  if(this._notes[this._pointer + 1].hasStarted(time)) {
    this._pointer++;
  }
  
  return this._notes[this._pointer];
};
