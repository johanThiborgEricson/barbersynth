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
.nonTerminalSequence = function() {
  var names;
  var interpretation;
  
  if(typeof arguments[arguments.length - 1] === "string") {
    names = Array.prototype.slice.call(arguments);
  } else {
    interpretation = arguments[arguments.length - 1];
    names = Array.prototype.slice.call(arguments, 0, -1);
  }
  
  var instructionMaker = function(codePointer, interpreter) {
    var instructions = {};
    for(var i = 0; i < names.length; i++) {
      var name = names[i];
      var maybeInstruction = interpreter[name](codePointer);
      if(!maybeInstruction) {
        return null;
      }
      
      instructions[name] = maybeInstruction;
    }

    var instruction = function(interpreter) {
      var results = {};
      names.map(function(name) {
        results[name] = instructions[name](interpreter);
      });
      
      if(interpretation) {
        return interpretation.call(interpreter, results);
      } else {
        return results;
      }
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
