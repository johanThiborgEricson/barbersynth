
// TODO: marked for deletion
function NonTerminalAlternative2(alternatives) {
  var that = Object.create(NonTerminalAlternative2.prototype);
  
  that.makeInstruction = function(codePointer) {
    var backup = codePointer.backup();
    var instruction = alternatives.reduce(function(instruction, alternative) {
      codePointer.restore(backup);
      return instruction || alternative.makeInstruction(codePointer);
    }, null);
    
    return instruction;
  };
  
  return that;
}

NonTerminalAlternative2.prototype = Symbol();