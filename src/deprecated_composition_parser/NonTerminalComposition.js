function NonTerminalComposition(symbols) {
  var that = Object.create(NonTerminalComposition.prototype);
  that.parse = function(unparsedCodePointer) {
    var makeInstruction = function(symbol) {
      var instruction = symbol.parse(unparsedCodePointer);
      return instruction;
    };
    
    var instructions = [];
    while(instructions.length < symbols.length) {
      var madeInstruction = makeInstruction(symbols[instructions.length]);
      if(!madeInstruction) {
        return null;
      }
      instructions.push(madeInstruction);
    }
    
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