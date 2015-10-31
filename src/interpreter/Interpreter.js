function Interpreter() {
  var that = Object.create(Interpreter.prototype);
  
  that.CodePointer = CodePointer;
  
  return that;
}

Interpreter.prototype
.symbol = function() {
  var interpreter = this;
  var that = function(code) {
    var codePointer = interpreter.CodePointer(code);
    var instruction = that.makeInstruction(codePointer);
    if(!instruction || codePointer.getUnparsed() !== "") {
      throw new Error();
    }
    
    var isMethodCall = this !== Interpreter.GLOBAL;
    var thisBinding = isMethodCall ? this : interpreter;
    return instruction.call(thisBinding);
  };
  
  return that;
};

Interpreter.prototype
.terminal = function(token, interpretation){
  var that = this.symbol();
  
  that.makeInstruction = function(codePointer) {
    var lexeme = codePointer.parse(token);
    if(!lexeme) {
      return null;
    }
    
    var instruction = function() {
      return interpretation.apply(this, lexeme);
    };
    
    return instruction;
  };
  
  return that;
};

Interpreter.GLOBAL = this;

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


Interpreter.prototype
.regExpPrototypeMakeInstructionInstaller = function() {
  var interpreter = this;
  var noopInstruction = function(codePointer) {
    return interpreter.terminal(this, interpreter.noop).makeInstruction(codePointer);
  };
  
  return MethodInstaller(RegExp.prototype, "makeInstruction", noopInstruction);
};

Interpreter.prototype
.noop = function() {
  
};
