function NonTerminalSequence(symbols) {
  var that = Object.create(NonTerminalSequence.prototype);

  that.makeInstruction = function(codePointer) {
    var instructions = [];
    var lastMade = true;
    
    var makeInstructionIfAllPreviousWasSuccessful = function(symbol) {
      lastMade = lastMade && symbol.makeInstruction(codePointer);
      instructions.push(lastMade);
    };
    
    symbols.map(makeInstructionIfAllPreviousWasSuccessful);
    
    if(!lastMade) {
      return null;
    }
    
    var instruction = function() {
      var that = this;
      instructions.map(function(instruction) {
        instruction.call(that);
      });
    };
    
    return instruction;
  };
  
  return that;
}

NonTerminalSequence.prototype = Symbol();