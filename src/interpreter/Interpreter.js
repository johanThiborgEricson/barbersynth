function Interpreter() {
  var that = Object.create(Interpreter.prototype);
  
  return that;
}

Interpreter.prototype
.interpret = function(startSymbol, code) {
  var codePointer = CodePointer(code);
  var instruction = startSymbol.makeInstruction(codePointer);
  if(!instruction || codePointer.getUnparsed() !== "") {
    throw Interpreter.PARSE_ERROR;
  }
  
  return instruction.call(this);
};

Interpreter.PARSE_ERROR = new Error("Interpreter.PARSE_ERROR");


Interpreter
.regExpPrototypeMakeInstructionInstaller = function(Terminal) {
  var noopInstruction = function(codePointer) {
    return Terminal(this, Interpreter.noop).makeInstruction(codePointer);
  };
  
  return MethodInstaller(RegExp.prototype, "makeInstruction", noopInstruction);
};

Interpreter
.noop = function() {
  
};
