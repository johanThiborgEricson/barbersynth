
// TODO: marked for deletion
function NonTerminalSequence2(symbols) {
  var that = Object.create(NonTerminalSequence2.prototype);

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
      var lastResult;
      instructions.map(function(instruction) {
        lastResult = instruction.call(that);
      });
      
      return lastResult;
    };
    
    return instruction;
  };
  
  return that;
}

NonTerminalSequence2.prototype = Symbol();