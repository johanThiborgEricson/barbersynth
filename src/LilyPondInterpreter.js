function LilyPondInterpreter(Note) {
  this.Note = Note;
}

(function() {
  var methodFactory = InterpreterMethodFactory();
  
  LilyPondInterpreter.prototype
  .absoluteNatural = methodFactory.atom(/[a-g]/, function(naturalName) {
    var minusA = naturalName.charCodeAt(0) - "a".charCodeAt(0);
    var lilyPondIndex = (minusA + 5) % 7;
    return lilyPondIndex - 12;
  });
  
  LilyPondInterpreter.prototype
  .octavationDown = methodFactory.atom(/,+/, function(commaString) {
    return -commaString.length;
  });
  
  LilyPondInterpreter.prototype
  .octavationUp = methodFactory.atom(/'+/, function(apostrofeString) {
    return apostrofeString.length;
  });
  
  // TODO: implement terminalJustReturn(0) as a shorthand for this
  LilyPondInterpreter.prototype
  .noOctavation = methodFactory.empty(function() {
    return 0;
  });
  
  LilyPondInterpreter.prototype
  .octavation = methodFactory.or(
      "octavationDown", "octavationUp", "noOctavation");
  
  LilyPondInterpreter.prototype
  .flat = methodFactory.atom(/(es)+/, function(esesString) {
    return -(esesString.length / 2);
  });
  
  LilyPondInterpreter.prototype
  .sharp = methodFactory.atom(/(is)+/, function(isesString) {
    return isesString.length / 2;
  });
  
  LilyPondInterpreter.prototype
  .noAccidental = methodFactory.empty(function() {
    return 0;
  });
  
  LilyPondInterpreter.prototype
  .accidentals = methodFactory.or("flat", "sharp", "noAccidental");
  
  LilyPondInterpreter.prototype.
  reciprocalLength = methodFactory.atom(/128|64|32|16|8|4|2|1/, 
  function(lengthString) {
    return new Fraction(1, Number(lengthString));
  });
  
  LilyPondInterpreter.prototype
  .unspecifiedLength = methodFactory.empty(function() {
    return this.lengthFraction || new Fraction(1, 4);
  });
  
  LilyPondInterpreter.prototype
  .dots = methodFactory.atom(/\.+/, function(dotsString) {
    var dotCount = dotsString.length;
    var numerator = 2 * Math.pow(2, dotCount) - 1;
    var denominator = Math.pow(2, dotCount);
    return new Fraction(numerator, denominator);
  });
  
  LilyPondInterpreter.prototype
  .possiblyDots = methodFactory.opt("dots", function() {
    return new Fraction(1, 1);
  });
  
  var possiblyDottedLengthInterpretation = 
  function(reciprocalLength, possiblyDots) {
    this.lengthFraction = reciprocalLength.multiply(possiblyDots);
    return this.lengthFraction;
  };
  
  LilyPondInterpreter.prototype
  .possiblyDottedLength = methodFactory.group(
    "reciprocalLength", "possiblyDots", possiblyDottedLengthInterpretation);
  
  LilyPondInterpreter.prototype
  .noteLength = methodFactory.or(
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
  .absoluteNote = methodFactory.group("absoluteNatural", 
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
  .relativeNatural = methodFactory.atom(/[a-g]/, function(naturalName) {
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
  .relativeNote = methodFactory.group("relativeNatural", 
  "accidentals", "octavation", "noteLength", relativeNoteInterpretation);
  
  LilyPondInterpreter.prototype
  .spaceAndRelative = methodFactory.group(/\s+/, 
  "relativeNote", function(relativeNote) {
    return relativeNote;
  });
  
  LilyPondInterpreter.prototype
  .relativeNotes = methodFactory.star("spaceAndRelative");
  
  LilyPondInterpreter.prototype
  .melody = methodFactory.group(/\s*/, "absoluteNote", 
  "relativeNotes", /\s*/, 
  function(absoluteNote, relativeNotes) {
    relativeNotes.unshift(absoluteNote);
    return relativeNotes;
  });
  
})();
  

