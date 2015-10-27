function NonTerminalComposition(symbols) {
  var that = Object.create(NonTerminalComposition.prototype);
  that.parse = function(unparsedCodePointer) {
    var makeInstruction = function(symbol) {
      var instruction = symbol.parse(unparsedCodePointer);
      return instruction;
    };
    
    var instructions = symbols.map(makeInstruction);
    
    var composer = function(valueIn, instruction) {
      var valueOut = instruction(valueIn);
      return valueOut;
    };
    
    var instruction = function(value) {
      return instructions.reduce(composer, value);
    };
    
    return instruction;
  };
  
  return that;
}

NonTerminalComposition.prototype = Symbol();