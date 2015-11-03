Interpreter.MethodFactory = function() {
  var that = Object.create(Interpreter.MethodFactory.prototype);
  
  return that;
};

Interpreter.MethodFactory.prototype
.symbol = function(instructionMaker) {
  var interpreter = this;
  var that = function(code) {
    if(code instanceof CodePointer) {
      return instructionMaker.call(this, code);
    }
    
    var codePointer = interpreter.CodePointer(code);
    var instruction = instructionMaker.call(this, codePointer);
    if(!instruction || codePointer.getUnparsed() !== "") {
      throw new Error();
    }
    
    return instruction.call(this);
  };
  
  return that;
};

Interpreter.MethodFactory.prototype
.terminal = function(token, interpretation){
  var instructionMaker = function(codePointer) {
    var lexeme = codePointer.parse(token);
    if(!lexeme) {
      return null;
    }
    
    var instruction = function() {
      return interpretation.apply(this, lexeme);
    };
    
    return instruction;
  };
  
  var terminal = this.symbol(instructionMaker);
  return terminal;
};

Interpreter.MethodFactory.prototype
.nonTerminalSequence = function (symbols) {
  var instructionMaker = function(codePointer) {
    var instructions = [];
    var lastMade = true;
    
    var makeInstructionIfAllPreviousWasSuccessful = function(symbol) {
      lastMade = lastMade && symbol(codePointer);
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
  
  return this.symbol(instructionMaker);
};

Interpreter.MethodFactory.prototype
.nonTerminalAlternative = function(alternatives) {
  var instructionMaker = function(codePointer) {
    var that = this;
    var backup = codePointer.backup();
    var instruction = alternatives.reduce(function(instruction, alternative) {
      if(!instruction)codePointer.restore(backup);
      return instruction || alternative.call(that, codePointer);
    }, null);
    
    return instruction;
  };
  
  return this.symbol(instructionMaker);
};

Interpreter.MethodFactory.prototype
.nonTerminalAsterisk = function(symbol) {
  var instructionMaker = function(codePointer) {
    var instructions = [];
    var madeInstruction = true;
    while(madeInstruction) {
      var backup = codePointer.backup();
      madeInstruction = symbol(codePointer);
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
  
  return this.symbol(instructionMaker);
};
