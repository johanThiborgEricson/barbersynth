function Symbol() {
  var that = Object.create(Symbol.prototype);
  
  return that;
}

// CodePointer => Instruction
Symbol.prototype
.makeInstruction = function(codePointer) {
  throw "Symbol().makeInstruction is an abstract method and should not be called.";
};
  
Symbol.prototype
.interpret = function(code) {
  var unparsedCodePointer = {value: code};
  var instruction = this.makeInstruction(unparsedCodePointer);
  if(!instruction || unparsedCodePointer.value !== "") {
    return Symbol.PARSE_ERROR;
  }
  
  instruction();
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
