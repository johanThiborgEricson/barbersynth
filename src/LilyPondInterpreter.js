function LilyPondInterpreter() {
  var that = Object.create(LilyPondInterpreter.prototype);

  return that;
}

(function() {
  var methodFactory = Interpreter.MethodFactory();
  
  LilyPondInterpreter.prototype.absoluteNatural = methodFactory
  .terminal(/([a-g])/, function(naturalName) {
    var minusA = naturalName.charCodeAt(0) - "a".charCodeAt(0);
    var lilyPondIndex = (minusA + 5) % 7;
    return lilyPondIndex - 12;
  });
  
  LilyPondInterpreter.prototype.octavationDown = methodFactory
  .terminal(/(,+)/, function(commaString) {
    return -commaString.length;
  });
  
  LilyPondInterpreter.prototype.octavationUp = methodFactory
  .terminal(/('+)/, function(apostrofeString) {
    return apostrofeString.length;
  });
  
  // TODO: make terminalEmptyString(interpretation)
  LilyPondInterpreter.prototype.noOctavation = methodFactory
  .terminal(/(?:)/, function() {
    return 0;
  });
  
  // TODO: move this to Interpreter
  LilyPondInterpreter.prototype.nothing = methodFactory
  .terminal(/()/, function() {});
  
  LilyPondInterpreter.prototype.octavation = methodFactory
  .nonTerminalAlternative("octavationDown", "octavationUp", "noOctavation");
  
  LilyPondInterpreter.prototype.natural2tone = function(natural) {
    var aMinorScaleTone = ((natural % 7) + 7) % 7;
    var octave = (natural - aMinorScaleTone) / 7;
    var aMinorTones = [0, 2, 3, 5, 7, 8, 10];
    return octave * 12 + aMinorTones[aMinorScaleTone];
  };
  
  LilyPondInterpreter.prototype.flat = methodFactory
  .terminal(/((?:es)+)/, function(esesString) {
    return -(esesString.length / 2);
  });
  
  LilyPondInterpreter.prototype.sharp = methodFactory
  .terminal(/((?:is)+)/, function(isesString) {
    return isesString.length / 2;
  });
  
  LilyPondInterpreter.prototype.noAccidental = methodFactory
  .terminal(/(?:)/, function() {
    return 0;
  });
  
  LilyPondInterpreter.prototype.accidentals = methodFactory
  .nonTerminalAlternative("flat", "sharp", "noAccidental");
  
  // TODO: make function fraction (n, m) => [n, m] with methods.
  LilyPondInterpreter.prototype.reciprocalLength = methodFactory
  .terminal(/(128|64|32|16|8|4|2|1)/, function(lengthString){
    var numerator = 1;
    var denominator = Number(lengthString);
    return [numerator, denominator];
  });
  
  LilyPondInterpreter.prototype.unspecifiedLength = methodFactory
  .terminal(/(?:)/, function() {
    if(this.lengthFraction){ 
      return this.lengthFraction;
    } else {
      return [1, 4];
    }
  });
  
  LilyPondInterpreter.prototype.dots = methodFactory
  .terminal(/(\.+)/, function(dotsString) {
    var dotCount = dotsString.length;
    var numerator = 2 * Math.pow(2, dotCount) - 1;
    var denominator = Math.pow(2, dotCount);
    return [numerator, denominator];
  });
  
  LilyPondInterpreter.prototype.noDots = methodFactory
  .terminal(/(?:)/, function(dotsString) {
    return [1, 1];
  });
  
  LilyPondInterpreter.prototype.possiblyDots = methodFactory
  .nonTerminalAlternative("dots", "noDots");
  
  // TODO: write fraction().multiply(fraction())
  LilyPondInterpreter.prototype.possiblyDottedLength = methodFactory
  .nonTerminalSequence("reciprocalLength", "possiblyDots", 
  function(args) {
    var numerator = args.reciprocalLength[0] * args.possiblyDots[0];
    var denominator = args.reciprocalLength[1] * args.possiblyDots[1];
    var lengthFraction = [numerator, denominator];
    this.lengthFraction = lengthFraction;
    return lengthFraction;
  });
  
  LilyPondInterpreter.prototype.noteLength = methodFactory
  .nonTerminalAlternative("possiblyDottedLength", "unspecifiedLength");

})();
  

