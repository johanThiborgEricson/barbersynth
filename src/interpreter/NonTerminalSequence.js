function NonTerminalSequence(symbols) {
  var that = Object.create(NonTerminalSequence.prototype);
  that.parse = function(unparsedCodePointer) {
    var instructions = [];
    var lastMade = true;
    
    var makeInstructionIfAllPreviousWasSuccessful = function(symbol) {
      lastMade = lastMade && symbol.parse(unparsedCodePointer);
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
  
  that.makeInstruction = function(unparsedCodePointer) {
    var instructions = [];
    var lastMade = true;
    
    var makeInstructionIfAllPreviousWasSuccessful = function(symbol) {
      lastMade = lastMade && symbol.makeInstruction(unparsedCodePointer);
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