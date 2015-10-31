function LilyPondInterpreter() {
  var that = Object.create(LilyPondInterpreter.prototype);
  
  return that;
}

LilyPondInterpreter.prototype = Interpreter();

var terminal = LilyPondInterpreter.prototype.terminal.bind(LilyPondInterpreter.prototype);

LilyPondInterpreter.prototype.
absoluteNatural = terminal(/([a-g])/, function(naturalName) {
  var minusA = naturalName.charCodeAt(0) - "a".charCodeAt(0);
  var lilyPondIndex = (minusA + 5) % 7;
  this.natural = lilyPondIndex - 12;
});
