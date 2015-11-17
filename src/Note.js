function Note(tone) {
  var that = Object.create(Note.prototype);
  
  that._tone = tone;

  return that;
}

Note.nullObjectStart = Note();

Note.prototype
.toneMin = function() {
  
};

Note.prototype
.getSubPartial = function(n) {
  
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
.addTime = function() {
  
};
