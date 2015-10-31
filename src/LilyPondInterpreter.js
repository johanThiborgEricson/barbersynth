function LilyPondInterpreter() {
  var that = Object.create(LilyPondInterpreter.prototype);

  that.absoluteNatural = that.terminal(/([a-g])/, function(naturalName) {
    var minusA = naturalName.charCodeAt(0) - "a".charCodeAt(0);
    var lilyPondIndex = (minusA + 5) % 7;
    this.natural = lilyPondIndex - 12;
  });
  
  var octavationDown = that.terminal(/(,+)/, function(commaString) {
    var commaCount = commaString.length;
    this.natural -= 7 * commaCount;
    this.tone -= 12 * commaCount;
  });
  
  var octavationUp = that.terminal(/('+)/, function(apostrofeString) {
    var apostrofeCount = apostrofeString.length;
    this.natural += 7 * apostrofeCount;
    this.tone += 12 * apostrofeCount;
  });
  
  var nothing = that.terminal(/()/, function() {});
  
  that.octavation = that.nonTerminalAlternative(
      [octavationDown, octavationUp, nothing]
    );
  
  return that;
}

LilyPondInterpreter.prototype = Interpreter();
