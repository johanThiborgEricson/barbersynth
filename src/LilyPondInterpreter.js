function LilyPondInterpreter(Note) {
  this.Note = Note;
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
  
  // TODO: implement terminalJustReturn(0) as a shorthand for this
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
  
  LilyPondInterpreter.prototype.
  reciprocalLength = methodFactory.terminal(/(128|64|32|16|8|4|2|1)/, 
  function(lengthString) {
    return new Fraction(1, Number(lengthString));
  });
  
  LilyPondInterpreter.prototype
  .unspecifiedLength = methodFactory.terminalEmptyString(function() {
    return this.lengthFraction || new Fraction(1, 4);
  });
  
  LilyPondInterpreter.prototype
  .dots = methodFactory.terminal(/(\.+)/, function(dotsString) {
    var dotCount = dotsString.length;
    var numerator = 2 * Math.pow(2, dotCount) - 1;
    var denominator = Math.pow(2, dotCount);
    return new Fraction(numerator, denominator);
  });
  
  LilyPondInterpreter.prototype
  .noDots = methodFactory.terminalEmptyString(function() {
    return new Fraction(1, 1);
  });
  
  LilyPondInterpreter.prototype
  .possiblyDots = methodFactory.nonTerminalAlternative("dots", "noDots");
  
  var possiblyDottedLengthInterpretation = 
  function(reciprocalLength, possiblyDots) {
    this.lengthFraction = reciprocalLength.multiply(possiblyDots);
    return this.lengthFraction;
  };
  
  LilyPondInterpreter.prototype
  .possiblyDottedLength = methodFactory.nonTerminalSequence(
    "reciprocalLength", "possiblyDots", possiblyDottedLengthInterpretation);
  
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
  
  var absouluteNoteInterpretation =
  function(absoluteNatural, accidentals, octavation, noteLength) {
    var absoluteTone = 
        this.toneHelper(absoluteNatural, accidentals, octavation);
    return new (this.Note)(absoluteTone, noteLength);
  };
  
  LilyPondInterpreter.prototype
  .absoluteNote = methodFactory.nonTerminalSequence("absoluteNatural", 
    "accidentals", "octavation", "noteLength", absouluteNoteInterpretation);
  
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
  
  var relativeNoteInterpretation = 
  function(relativeNatural, accidentals, octavation, noteLength) {
    var relativeTone = 
        this.toneHelper(relativeNatural, accidentals, octavation);
    return new (this.Note)(relativeTone, noteLength);
  };
  
  LilyPondInterpreter.prototype
  .relativeNote = methodFactory.nonTerminalSequence("relativeNatural", 
  "accidentals", "octavation", "noteLength", relativeNoteInterpretation);
  
  LilyPondInterpreter.prototype
  .spacePlus = methodFactory.terminalSkip(/\s+/);
  
  LilyPondInterpreter.prototype
  .spaceAsterisk = methodFactory.terminalSkip(/\s*/);
  
  // TODO: give asterisk ability to skip regexp.
  LilyPondInterpreter.prototype
  .spaceAndRelative = methodFactory.nonTerminalSequence("spacePlus", 
  "relativeNote", function(spacePlus, relativeNote) {
    return relativeNote;
  });
  
  LilyPondInterpreter.prototype
  .relativeNotes = methodFactory.nonTerminalAsterisk("spaceAndRelative");
  
  LilyPondInterpreter.prototype
  .melody = methodFactory.nonTerminalSequence("spaceAsterisk", "absoluteNote", 
  "relativeNotes", "spaceAsterisk", 
  function(sa1, absoluteNote, relativeNotes, sa2) {
    relativeNotes.unshift(absoluteNote);
    return relativeNotes;
  });
  
})();
  

