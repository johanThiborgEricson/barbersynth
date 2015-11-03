function LilyPondInterpreter() {
  var that = Object.create(LilyPondInterpreter.prototype);

  return that;
}

(function() {
  var semanticSymbol = Interpreter.MethodFactory();
  
  LilyPondInterpreter.prototype.absoluteNatural = semanticSymbol
  .terminal(/([a-g])/, function(naturalName) {
    var minusA = naturalName.charCodeAt(0) - "a".charCodeAt(0);
    var lilyPondIndex = (minusA + 5) % 7;
    this.natural = lilyPondIndex - 12;
    this.tone = this.natural2tone(this.natural);
  });
  
  LilyPondInterpreter.prototype.octavationDown = semanticSymbol
  .terminal(/(,+)/, function(commaString) {
    var commaCount = commaString.length;
    this.natural -= 7 * commaCount;
    this.tone -= 12 * commaCount;
  });
  
  LilyPondInterpreter.prototype.octavationUp = semanticSymbol
  .terminal(/('+)/, function(apostrofeString) {
    var apostrofeCount = apostrofeString.length;
    this.natural += 7 * apostrofeCount;
    this.tone += 12 * apostrofeCount;
  });
  
  // TODO: move this to Interpreter
  LilyPondInterpreter.prototype.nothing = semanticSymbol
  .terminal(/()/, function() {});
  
  LilyPondInterpreter.prototype.octavation = semanticSymbol
  .nonTerminalAlternative([
      LilyPondInterpreter.prototype.octavationDown, 
      LilyPondInterpreter.prototype.octavationUp, 
      LilyPondInterpreter.prototype.nothing
    ]);
  
  LilyPondInterpreter.prototype.natural2tone = function(natural) {
    var aMinorScaleTone = ((natural % 7) + 7) % 7;
    var octave = (natural - aMinorScaleTone) / 7;
    var aMinorTones = [0, 2, 3, 5, 7, 8, 10];
    return octave * 12 + aMinorTones[aMinorScaleTone];
  };
  
  LilyPondInterpreter.prototype.flat = semanticSymbol
  .terminal(/((?:es)+)/, function(esesString) {
    var esesCount = esesString.length / 2;
    this.tone -= esesCount;
  });
  
  LilyPondInterpreter.prototype.sharp = semanticSymbol
  .terminal(/((?:is)+)/, function(isesString) {
    var isesCount = isesString.length / 2;
    this.tone += isesCount;
  });
  
  LilyPondInterpreter.prototype.accidentals = semanticSymbol
  .nonTerminalAlternative([
      LilyPondInterpreter.prototype.flat, 
      LilyPondInterpreter.prototype.sharp, 
      LilyPondInterpreter.prototype.nothing
    ]);
  
  LilyPondInterpreter.prototype.reciprocalLength = semanticSymbol
  .terminal(/(128|64|32|16|8|4|2|1)/, function(lengthString){
    var numerator = 1;
    var denominator = Number(lengthString);
    this.lengthFraction = [numerator, denominator];
  });
  
  LilyPondInterpreter.prototype.unspecifiedLength = semanticSymbol
  .terminal(/()/, function() {
    if(!this.lengthFraction) {
      this.lengthFraction = [1, 4];
    }
  });
  
  LilyPondInterpreter.prototype.dots = semanticSymbol
  .terminal(/(\.+)/, function(dotsString) {
    var dotCount = dotsString.length;
    this.lengthFraction[0] *= 2 * Math.pow(2, dotCount) - 1;
    this.lengthFraction[1] *= Math.pow(2, dotCount);
  });
  
  // TODO: write nonTerminalQuestionMark as a shorthand for this.
  LilyPondInterpreter.prototype.possiblyDots = semanticSymbol
  .nonTerminalAlternative([
      LilyPondInterpreter.prototype.dots, 
      LilyPondInterpreter.prototype.nothing
    ]);
  
  LilyPondInterpreter.prototype.possiblyDottedLength = semanticSymbol
  .nonTerminalSequence([
      LilyPondInterpreter.prototype.reciprocalLength, 
      LilyPondInterpreter.prototype.possiblyDots
    ]);
  
  LilyPondInterpreter.prototype.noteLength = semanticSymbol.nonTerminalAlternative([
      LilyPondInterpreter.prototype.possiblyDottedLength, 
      LilyPondInterpreter.prototype.unspecifiedLength
    ]);

})();
  

