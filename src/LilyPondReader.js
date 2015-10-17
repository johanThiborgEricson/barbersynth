function LilyPondReader() {
  return {
    parseLilyPondTerm(lilyPondTerm) {
      var re = /([a-g])((?:es){1,2}|(?:is){0,2})(,+|'*)(128|64|32|16|8|4|2|1?)(\.*)/;
      return re.exec(lilyPondTerm).slice(1);
    },
    
    naturalScaleSteps(oldScaleName, newScaleName) {
      var oldScaleNumber = oldScaleName.charCodeAt(0) - "a".charCodeAt(0);
      var newScaleNumber = newScaleName.charCodeAt(0) - "a".charCodeAt(0);
      var naiveScaleStepsPlusThree = newScaleNumber - oldScaleNumber + 3;
      var moduloSeven = (((naiveScaleStepsPlusThree) % 7) + 7) % 7;
      return moduloSeven - 3;
    },
    
    lilyPondRelative() {
      var previousScaleTone = this.lilyPondAbsolute.apply(this, arguments);
      var that = this;
      var relativeStep = function(toneName, accidentalString, octaveString) {
        var aMinorScaleTone = that.nearestInA440Minor(toneName, previousScaleTone);
        changedOctav = that.octavChange(aMinorScaleTone, octaveString);
        var twelveToneScaleTone = that.as12toneScale(changedOctav);
        previousScaleTone = changedOctav;
        return that.addAccidentals(twelveToneScaleTone, accidentalString);
      };
      
      return relativeStep;
    },
    
    nearestInA440Minor(toneName, previousA440MinorScaleTone) {
      var toneNumber = toneName.charCodeAt(0) - "a".charCodeAt(0);
      var transformedTone = this.toneSpaceTransform(previousA440MinorScaleTone, toneNumber);
      var roundedTransformedTone = Math.round(transformedTone);
      var currentA440MinorScaleTone = this.inverseToneSpaceTransform(roundedTransformedTone, toneNumber);
      return currentA440MinorScaleTone;
    },
    
    toneSpaceTransform(tone, transformBase) {
      var transformedTone = (tone-transformBase)/7;
      return transformedTone;
    },
    
    inverseToneSpaceTransform(transformedTone, transformBase) {
      var tone = (transformedTone * 7) + transformBase;
      return tone;
    },
    
    octaveChange(scaleToneNumber, octaveString) {
      var length = octaveString.length;
      var octaves = /,/.test(octaveString)? -length: length;
      return scaleToneNumber + 7 * octaves;
    },
    
    as12toneScale(scaleToneSteps) {
      var aMinor = [0, 2, 3, 5, 7, 8, 10];
      var scaleTone = ((scaleToneSteps%7)+7)%7;
      var octave = (scaleToneSteps-scaleTone)/7;
      var twelve = aMinor[scaleTone] + 12 * octave;
      return twelve;
    },
    
    cMajor(toneName, octaveString) {
      var minusA = toneName.charCodeAt(0) - "a".charCodeAt(0);
      var scaleToneNumber = (minusA + 5) % 7;
      return this.octaveChange(scaleToneNumber, octaveString);
    },
    
    lilyPondAbsolute(toneName, octaveString) {
      return this.cMajor.apply(this, arguments) - 12;
    },
    
    addAccidentals(twelveToneScaleTone, accidentalString) {
      if(!accidentalString) {
        accidentalString = "natural";
      }
      
      var accidentals = {
        natural: 0,
        es: -1,
        eses: -2,
        is: 1,
        isis: 2,
      };
      var accidentalsAdded = twelveToneScaleTone + accidentals[accidentalString];
      return accidentalsAdded;
    },
    
    lengthFraction() {
      var previousLengthString = "4";
      return function(lengthString, dots) {
        if(!lengthString) {
          lengthString = previousLengthString;
        } else {
          previousLengthString = lengthString;
        }
        var dominator = 1;
        var denominator = Number(lengthString);
        if(dots == ".") {
          dominator *= 3;
          denominator *= 2;
        }
        
        return [dominator, denominator];
      };
    },
    
  };
  
}
