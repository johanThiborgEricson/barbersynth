function Interpreter() {
  var that = Object.create(Interpreter.prototype);
  
  that.CodePointer = CodePointer;
  
  return that;
}

Interpreter.prototype
.symbol = function(makeInstruction) {
  var interpreter = this;
  var that = function(code) {
    var codePointer = interpreter.CodePointer(code);
    var instruction = makeInstruction(codePointer);
    if(!instruction || codePointer.getUnparsed() !== "") {
      throw new Error();
    }
    
    var isMethodCall = this !== Interpreter.GLOBAL;
    var thisBinding = isMethodCall ? this : interpreter;
    return instruction.call(thisBinding);
  };
  
  that.makeInstruction = makeInstruction;
  return that;
};

Interpreter.prototype
.terminal = function(token, interpretation){
  var makeInstruction = function(codePointer) {
    var lexeme = codePointer.parse(token);
    if(!lexeme) {
      return null;
    }
    
    var instruction = function() {
      return interpretation.apply(this, lexeme);
    };
    
    return instruction;
  };
  
  var terminal = this.symbol(makeInstruction);
  return terminal;
};

Interpreter.prototype
.nonTerminalSequence = function (symbols) {
  var makeInstruction = function(codePointer) {
    var instructions = [];
    var lastMade = true;
    
    var makeInstructionIfAllPreviousWasSuccessful = function(symbol) {
      lastMade = lastMade && symbol.makeInstruction(codePointer);
      instructions.push(lastMade);
    };
    
    symbols.map(makeInstructionIfAllPreviousWasSuccessful);
    
    if(!lastMade) {
      return null;
    }
    
    var instruction = function() {
      var that = this;
      var lastResult;
      instructions.map(function(instruction) {
        lastResult = instruction.call(that);
      });
      
      return lastResult;
    };
    
    return instruction;
  };
  
  return this.symbol(makeInstruction);
};

Interpreter.prototype
.nonTerminalAlternative = function(alternatives) {
  var makeInstruction = function(codePointer) {
    var backup = codePointer.backup();
    var instruction = alternatives.reduce(function(instruction, alternative) {
      if(!instruction)codePointer.restore(backup);
      return instruction || alternative.makeInstruction(codePointer);
    }, null);
    
    return instruction;
  };
  
  return this.symbol(makeInstruction);
};

Interpreter.prototype
.nonTerminalAsterisk = function(symbol) {
  var makeInstruction = function(codePointer) {
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
  
  return this.symbol(makeInstruction);
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
