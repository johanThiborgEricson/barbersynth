function NonTerminalAlternative(alternatives) {
  var that = Object.create(NonTerminalAlternative.prototype);
  
  that.makeInstruction = function(unparsedCodePointer) {
    var unparsedCodePointerBackup = unparsedCodePointer.value;
    var instruction = alternatives.reduce(function(instruction, alternative) {
      unparsedCodePointer.value = unparsedCodePointerBackup;
      return instruction || alternative.makeInstruction(unparsedCodePointer);
    }, null);
    
    return instruction;
  };
  
  return that;
}

NonTerminalAlternative.prototype = Symbol();