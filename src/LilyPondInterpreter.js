function LilyPondInterpreter() {
  var that = Object.create(LilyPondInterpreter.prototype);

  that.absoluteNatural = that.terminal(/([a-g])/, function(naturalName) {
    var minusA = naturalName.charCodeAt(0) - "a".charCodeAt(0);
    var lilyPondIndex = (minusA + 5) % 7;
    this.natural = lilyPondIndex - 12;
    this.tone = this.natural2tone(this.natural);
  });
  
  that.octavationDown = that.terminal(/(,+)/, function(commaString) {
    var commaCount = commaString.length;
    this.natural -= 7 * commaCount;
    this.tone -= 12 * commaCount;
  });
  
  that.octavationUp = that.terminal(/('+)/, function(apostrofeString) {
    var apostrofeCount = apostrofeString.length;
    this.natural += 7 * apostrofeCount;
    this.tone += 12 * apostrofeCount;
  });
  
  that.nothing = that.terminal(/()/, function() {});
  
  that.octavation = that.nonTerminalAlternative(
      [that.octavationDown, that.octavationUp, that.nothing]
    );
  
  that.natural2tone = function(natural) {
    var aMinorScaleTone = ((natural % 7) + 7) % 7;
    var octave = (natural - aMinorScaleTone) / 7;
    var aMinorTones = [0, 2, 3, 5, 7, 8, 10];
    return octave * 12 + aMinorTones[aMinorScaleTone];
  };
  
  that.flat = that.terminal(/((?:es)+)/, function(esesString) {
    var esesCount = esesString.length / 2;
    this.tone -= esesCount;
  });
  
  that.sharp = that.terminal(/((?:is)+)/, function(isesString) {
    var isesCount = isesString.length / 2;
    this.tone += isesCount;
  });
  
  that.accidentals = that.nonTerminalAlternative(
      [that.flat, that.sharp, that.nothing]
    );
  
  that.reciprocalLength = that.terminal(/(128|64|32|16|8|4|2|1)/, 
  function(lengthString){
    var numerator = 1;
    var denominator = Number(lengthString);
    this.lengthFraction = [numerator, denominator];
  });
  
  that.unspecifiedLength = that.terminal(/()/, function() {
    if(!this.lengthFraction) {
      this.lengthFraction = [1, 4];
    }
  });
  
  that.noteLength = that.nonTerminalAlternative(
      [that.reciprocalLength, that.unspecifiedLength]
    );

  return that;
}

LilyPondInterpreter.prototype = Interpreter();
