function LilyPondInterpreter() {
  var that = Object.create(LilyPondInterpreter.prototype);
  
  that.absoluteNatural = Terminal(/([a-g])/, function(naturalName) {
    var minusA = naturalName.charCodeAt(0) - "a".charCodeAt(0);
    var lilyPondIndex = (minusA + 5) % 7;
    this.natural = lilyPondIndex - 12;
  });
  
  return that;
}

LilyPondInterpreter.prototype = Interpreter();