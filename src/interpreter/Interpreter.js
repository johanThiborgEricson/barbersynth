function Interpreter() {
  var that = Object.create(Interpreter.prototype);
  
  that.CodePointer = CodePointer;
  
  return that;
}

Interpreter.JUST_MAKE_INSTRUCTION = {Interpreter:"JUST_MAKE_INSTRUCTION"};

Interpreter.GLOBAL = this;

Interpreter.prototype
.symbol = function(instructionMaker) {
  var interpreter = this;
  var that = function(code, justMakeInstruction) {
    if(justMakeInstruction) {
      return instructionMaker(code);
    }
    
    var codePointer = interpreter.CodePointer(code);
    var instruction = instructionMaker(codePointer);
    if(!instruction || codePointer.getUnparsed() !== "") {
      throw new Error();
    }
    
    return instruction.call(this);
  };
  
  that.makeInstruction = instructionMaker;
  return that;
};

Interpreter.prototype
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

Interpreter.prototype
.nonTerminalSequence = function (symbols) {
  var instructionMaker = function(codePointer) {
    var instructions = [];
    var lastMade = true;
    
    var makeInstructionIfAllPreviousWasSuccessful = function(symbol) {
      lastMade = lastMade && symbol(codePointer, Interpreter.JUST_MAKE_INSTRUCTION);
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

Interpreter.prototype
.nonTerminalAlternative = function(alternatives) {
  var instructionMaker = function(codePointer) {
    var backup = codePointer.backup();
    var instruction = alternatives.reduce(function(instruction, alternative) {
      if(!instruction)codePointer.restore(backup);
      return instruction || alternative(codePointer, Interpreter.JUST_MAKE_INSTRUCTION);
    }, null);
    
    return instruction;
  };
  
  return this.symbol(instructionMaker);
};

Interpreter.prototype
.nonTerminalAsterisk = function(symbol) {
  var instructionMaker = function(codePointer) {
    var instructions = [];
    var madeInstruction = true;
    while(madeInstruction) {
      var backup = codePointer.backup();
      madeInstruction = symbol(codePointer, Interpreter.JUST_MAKE_INSTRUCTION);
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
