function Note(tone, duration) {
  this._tone = tone;
  this._duration = duration;
}

Note.nullObjectStart = Note();
Note.nullObjectEnd = Note();

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
.nearestPartial = function(fundamental) {
  var frequencyQuote = Math.pow(2, (this._tone - fundamental) / 12);
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
.findClosePartial = function(fundamental) {
  var frequencyQuote = Math.pow(2, (this._tone - fundamental) / 12);
  var partialBellow = Math.floor(frequencyQuote);
  var partialAbove = Math.ceil(frequencyQuote);
  var quoteDown = frequencyQuote / partialBellow;
  var quoteUp = partialAbove / frequencyQuote;
  var closePartialFound = false;
  if(quoteDown > Math.pow(2, 1 / 24) && quoteUp > Math.pow(2, 1 / 24)) {
    // this shouldn't be necessary...
    this.fundamental = undefined;
    this.partial = undefined;
  } else {
    closePartialFound = true;
    this.fundamental = fundamental;
    this.partial = quoteDown < quoteUp ? partialBellow : partialAbove;
  }
  
  return closePartialFound;
};

Note.prototype
.addTime = function(time) {
  return time.add(this._duration);
};

Note.prototype
.getJustFrequency = function(concertPitchFrequency) {
  return concertPitchFrequency*this.partial*Math.pow(2, this.fundamental/12);
};