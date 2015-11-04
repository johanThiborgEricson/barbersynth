Interpreter.MethodFactory = function() {
  var that = Object.create(Interpreter.MethodFactory.prototype);
  
  that.CodePointer = CodePointer;
  
  return that;
};

Interpreter.MethodFactory.prototype
.symbol = function(instructionMaker) {
  var methodFactory = this;
  var that = function(code) {
    if(code instanceof CodePointer) {
      return instructionMaker(code, this);
    }
    
    var codePointer = methodFactory.CodePointer(code);
    var instruction = instructionMaker(codePointer, this);
    if(!instruction || codePointer.getUnparsed() !== "") {
      throw new Error();
    }
    
    return instruction.call(this);
  };
  
  return that;
};

Interpreter.MethodFactory.prototype
.terminal = function(token, interpretation){
  var instructionMaker = function(codePointer, interpreter) {
    var lexeme = codePointer.parse(token);
    if(!lexeme) {
      return null;
    }
    
    var instruction = function(interpreter) {
      return interpretation.apply(interpreter, lexeme);
    };
    
    return instruction;
  };
  
  var terminal = this.symbol(instructionMaker);
  return terminal;
};

Interpreter.MethodFactory.prototype
.nonTerminalSequence = function () {
  var symbols = Array.prototype.slice.call(arguments);
  var instructionMaker = function(codePointer, interpreter) {
    var instructions = {};
    var lastMade = true;
    
    var makeInstructionIfAllPreviousWasSuccessful = function(symbol) {
      lastMade = lastMade && interpreter[symbol](codePointer);
      instructions[symbol] = lastMade;
    };
    
    symbols.map(makeInstructionIfAllPreviousWasSuccessful);
    
    if(!lastMade) {
      return null;
    }
    
    var instruction = function(interpreter) {
      var results = {};
      symbols.map(function(symbol) {
        results[symbol] = instructions[symbol].call(interpreter, interpreter);
      });
      
      return results;
    };
    
    return instruction;
  };
  
  return this.symbol(instructionMaker);
};

Interpreter.MethodFactory.prototype
.nonTerminalSequence2 = function() {
  var names = Array.prototype.slice.call(arguments);
  var instructionMaker = function(codePointer, interpreter) {
    var instructions = {};
    names.map(function(name) {
      instructions[name] = interpreter[name](codePointer);
    });
    
    var instruction = function(interpreter) {
      var results = {};
      names.map(function(name) {
        results[name] = instructions[name](interpreter);
      });
      
      return results;
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
