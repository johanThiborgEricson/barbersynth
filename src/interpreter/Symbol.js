function Symbol() {
  var that = Object.create(Symbol.prototype);
  
  return that;
}

// CodePointer => Instruction
Symbol.prototype
.makeInstruction = function(codePointer) {
  throw "Symbol().makeInstruction is an abstract method and should not be called.";
};
  
Symbol.PARSE_ERROR = new Error("Symbol.PARSE_ERROR");

Symbol
.regExpPrototypeMakeInstructionInstaller = function(Terminal) {
  var noopInstruction = function(codePointer) {
    return Terminal(this, Symbol.noop).makeInstruction(codePointer);
  };
  
  return MethodInstaller(RegExp.prototype, "makeInstruction", noopInstruction);
};

Symbol
.noop = function() {
  
};
