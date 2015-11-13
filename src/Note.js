function Note(tone) {
  var that = Object.create(Note.prototype);
  
  that._tone = tone;
  
  return that;
}

Note.nullObjectStart = Note();

Note.prototype
.hasEnded = function(startTime, time) {
  
};

Note.prototype
.toneMin = function() {
  
};

Note.prototype
.getSubPartial = function(n) {
  
};

Note.prototype
.nearestPartial = function() {
  
};

Note.prototype
.addTime = function() {
  
};
