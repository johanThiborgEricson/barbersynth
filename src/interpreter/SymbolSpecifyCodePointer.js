function SymbolSpecifyCodePointer(CodePointer) {
  var that = function(code) {
    var codePointer = CodePointer(code);
    var instruction = that.makeInstruction(codePointer);
    if(!instruction || codePointer.getUnparsed() !== "") {
      throw new Error();
    }
    
    return instruction.call(this);
  };
  
  return that;
}
