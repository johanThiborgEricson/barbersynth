function Note(tone, duration) {
  var that = Object.create(Note.prototype);
  
  that._tone = tone;
  that._duration = duration;
  
  return that;
}

Note.nullObjectStart = Note();

Note.prototype
.toneMin = function(other) {
  return this._tone < other._tone ? this : other;
};

Note.prototype
.getSubPartial = function(n) {
  var step;
  if(n < 16) {
    step = Math.round(12 * (Math.log(n) / Math.log(2)));
  } else {
    step = 48 - 16 + n; // 12 * (Math.log(16) / Math.log(2)) = 48
  }
  
  return this._tone - step;
};

Note.prototype
.nearestPartial = function(f0) {
  var frequencyQuote = Math.pow(2, (this._tone - f0) / 12);
  var partialBellow = Math.floor(frequencyQuote);
  var partialAbove = Math.ceil(frequencyQuote);
  var quoteDown = frequencyQuote / partialBellow;
  var quoteUp = partialAbove / frequencyQuote;
  if(quoteDown > Math.pow(2, 1 / 24) && quoteUp > Math.pow(2, 1 / 24)) {
    return null;
  }
  
  return quoteDown < quoteUp ? partialBellow : partialAbove;
};

Note.prototype
.addTime = function(time) {
  return time.add(this._duration);
};
