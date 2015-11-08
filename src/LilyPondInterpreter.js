function LilyPondInterpreter(Note) {
  var that = Object.create(LilyPondInterpreter.prototype);
  
  // TODO: write this class.
  that.Note = Note;

  return that;
}

(function() {
  var methodFactory = InterpreterMethodFactory();
  
  LilyPondInterpreter.prototype
  .absoluteNatural = methodFactory.terminal(/([a-g])/, function(naturalName) {
    var minusA = naturalName.charCodeAt(0) - "a".charCodeAt(0);
    var lilyPondIndex = (minusA + 5) % 7;
    return lilyPondIndex - 12;
  });
  
  LilyPondInterpreter.prototype
  .octavationDown = methodFactory.terminal(/(,+)/, function(commaString) {
    return -commaString.length;
  });
  
  LilyPondInterpreter.prototype
  .octavationUp = methodFactory.terminal(/('+)/, function(apostrofeString) {
    return apostrofeString.length;
  });
  
  LilyPondInterpreter.prototype
  .noOctavation = methodFactory.terminalEmptyString(function() {
    return 0;
  });
  
  LilyPondInterpreter.prototype
  .octavation = methodFactory.nonTerminalAlternative(
      "octavationDown", "octavationUp", "noOctavation");
  
  LilyPondInterpreter.prototype
  .flat = methodFactory.terminal(/((?:es)+)/, function(esesString) {
    return -(esesString.length / 2);
  });
  
  LilyPondInterpreter.prototype
  .sharp = methodFactory.terminal(/((?:is)+)/, function(isesString) {
    return isesString.length / 2;
  });
  
  LilyPondInterpreter.prototype
  .noAccidental = methodFactory.terminalEmptyString(function() {
    return 0;
  });
  
  LilyPondInterpreter.prototype
  .accidentals = methodFactory.nonTerminalAlternative(
    "flat", "sharp", "noAccidental");
  
  // TODO: make function fraction (n, m) => [n, m] with methods.
  LilyPondInterpreter.prototype.
  reciprocalLength = methodFactory.terminal(/(128|64|32|16|8|4|2|1)/, 
  function(lengthString) {
    var numerator = 1;
    var denominator = Number(lengthString);
    return [numerator, denominator];
  });
  
  LilyPondInterpreter.prototype
  .unspecifiedLength = methodFactory.terminalEmptyString(function() {
    return this.lengthFraction || [1, 4];
  });
  
  LilyPondInterpreter.prototype
  .dots = methodFactory.terminal(/(\.+)/, function(dotsString) {
    var dotCount = dotsString.length;
    var numerator = 2 * Math.pow(2, dotCount) - 1;
    var denominator = Math.pow(2, dotCount);
    return [numerator, denominator];
  });
  
  LilyPondInterpreter.prototype
  .noDots = methodFactory.terminalEmptyString(function(dotsString) {
    return [1, 1];
  });
  
  LilyPondInterpreter.prototype
  .possiblyDots = methodFactory.nonTerminalAlternative("dots", "noDots");
  
  // TODO: write fraction().multiply(fraction())
  LilyPondInterpreter.prototype
  .possiblyDottedLength = methodFactory.nonTerminalSequence(
    "reciprocalLength", "possiblyDots", 
  function(reciprocalLength, possiblyDots) {
    var numerator = reciprocalLength[0] * possiblyDots[0];
    var denominator = reciprocalLength[1] * possiblyDots[1];
    var lengthFraction = [numerator, denominator];
    this.lengthFraction = lengthFraction;
    return lengthFraction;
  });
  
  LilyPondInterpreter.prototype
  .noteLength = methodFactory.nonTerminalAlternative(
    "possiblyDottedLength", "unspecifiedLength");
  
  LilyPondInterpreter.prototype
  .natural2tone = function(natural) {
    var aMinorScaleTone = ((natural % 7) + 7) % 7;
    var octave = (natural - aMinorScaleTone) / 7;
    var aMinorTones = [0, 2, 3, 5, 7, 8, 10];
    return octave * 12 + aMinorTones[aMinorScaleTone];
  };
  
  LilyPondInterpreter.prototype
  .absoluteNote = methodFactory.nonTerminalSequence(
    "absoluteNatural", "accidentals", "octavation", "noteLength",
  function(absoluteNatural, accidentals, octavation, noteLength) {
    var absoluteTone = 
        this.toneHelper(absoluteNatural, accidentals, octavation);
    return this.Note(absoluteTone, noteLength);
  });
  
  LilyPondInterpreter.prototype
  .octaveSpaceRound = function(lastNatural, scaleNumber) {
    var fractionalOctavesFromScaleNumber = (lastNatural - scaleNumber) / 7;
    var roundedOctavesFromScaleNumber = 
        Math.round(fractionalOctavesFromScaleNumber);
    return scaleNumber + 7 * roundedOctavesFromScaleNumber;
  };
  
  LilyPondInterpreter.prototype
  .moduloMagic = function(lastNatural, scaleNumber) {
    var longStep = scaleNumber - lastNatural;
    var shortestStep = ((((longStep + 3)%7)+7)%7) - 3;
    return lastNatural + shortestStep;
  };
  
  LilyPondInterpreter.prototype
  .relativeNatural = methodFactory.terminal(/([a-g])/, function(naturalName) {
    var scaleNumber = naturalName.charCodeAt(0) - "a".charCodeAt(0);
    var redundant1 = this.octaveSpaceRound(this.lastNatural, scaleNumber);
    var redundant2 = this.moduloMagic(this.lastNatural, scaleNumber);
    if(redundant1 !== redundant2) {
      throw new Error("relative natural failed for lastNatural = " +
      this.lastNatural + " and naturalName = '" + naturalName + "'. " +
      "octaveSpaceRound said " + redundant1 + " and moduloMagic said " 
      + redundant2 + ".");
    }
    
    return redundant1;
  });
  
  LilyPondInterpreter.prototype
  .toneHelper = function(natural, accidentals, octavation) {
    var tone = this.natural2tone(natural);
    tone += accidentals;
    tone += 12 * octavation;
    this.lastNatural = 7 * octavation + natural;
    return tone;
  };
  
  LilyPondInterpreter.prototype
  .relativeNote = methodFactory.nonTerminalSequence(
    "relativeNatural", "accidentals", "octavation", "noteLength",
  function(relativeNatural, accidentals, octavation, noteLength) {
    var relativeTone = 
        this.toneHelper(relativeNatural, accidentals, octavation);
    return this.Note(relativeTone, noteLength);
  });
  
})();
  

