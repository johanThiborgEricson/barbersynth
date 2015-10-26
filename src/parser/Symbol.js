function Symbol() {
  var that = Object.create(Symbol.prototype);
  
  // unparsedCodePointer => Instruction
  that.parse = function(unparsedCodePointer) {
    throw "Symbol().parse is an abstract method and should not be called.";
  };

  return that;
}
