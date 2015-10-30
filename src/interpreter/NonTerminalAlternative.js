function NonTerminalAlternative(alternatives) {
  var that = Object.create(NonTerminalAlternative.prototype);
  
  that.parse = function(unparsedCodePointer) {
    var unparsedCodePointerBackup = unparsedCodePointer.value;
    var instruction = alternatives.reduce(function(instruction, alternative) {
      unparsedCodePointer.value = unparsedCodePointerBackup;
      return instruction || alternative.parse(unparsedCodePointer);
    }, null);
    
    return instruction;
  };
  
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