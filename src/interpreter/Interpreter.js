function Interpreter() {
  var that = Object.create(Interpreter.prototype);
  
  return that;
}

Interpreter.prototype
._terminalParser = function(codePointer) {
  var lexeme = codePointer.parse(token);
  if(!lexeme) {
    return null;
  }
  
  var instruction = function() {
    return interpretation.apply(this, lexeme);
  };
  
  return instruction;
};

Interpreter.prototype
._nonTerminalSequenceParser = function(codePointer) {
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

Interpreter.prototype
._nonTerminalAlternativeParser = function(codePointer) {
  var that = this;
  var backup = codePointer.backup();
  var instruction = alternatives.reduce(function(instruction, alternative) {
    if(!instruction)codePointer.restore(backup);
    return instruction || alternative.call(that, codePointer);
  }, null);
  
  return instruction;
};

Interpreter.prototype
._nonTerminalAsteriskParser = function(codePointer) {
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

