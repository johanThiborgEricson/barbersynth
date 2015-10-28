function NonTerminalSequence(symbols) {
  var that = Object.create(NonTerminalSequence.prototype);
  that.parse = function(unparsedCodePointer) {
    var instructions = [];
    
    for(var i = 0; i < symbols.length; i++) {
      var maybeInstruction = symbols[i].parse(unparsedCodePointer);
      if(!maybeInstruction) {
        return null;
      }
      
      instructions.push(maybeInstruction);
    }
    
    var instruction = function() {
      instructions.map(function(instruction) {
        instruction();
      });
    };
    
    return instruction;
  };
  
  return that;
}

NonTerminalSequence.prototype = Symbol();