
// TODO: marked for deletion
function NonTerminalAsterisk2(symbol) {
  var that = Object.create(NonTerminalAsterisk2.prototype);
  
  that.makeInstruction = function(codePointer) {
    var instructions = [];
    var madeInstruction = true;
    while(madeInstruction) {
      var backup = codePointer.backup();
      madeInstruction = symbol.makeInstruction(codePointer);
      if(madeInstruction){
        instructions.push(madeInstruction);
      } else {
        codePointer.restore(backup);
      }
      
    }
    
    var instruction = function() {
      var lastResult;
      var that = this;
      instructions.map(function(instruction) {
        lastResult = instruction.call(that);
      });
      
      return lastResult;
    };
    
    return instruction;
  };
  
  return that;
}

NonTerminalAsterisk2.prototype = Symbol();
