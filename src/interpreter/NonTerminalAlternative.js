function NonTerminalAlternative(alternatives) {
  var that = Object.create(NonTerminalAlternative.prototype);
  
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

NonTerminalAlternative.prototype = Symbol();