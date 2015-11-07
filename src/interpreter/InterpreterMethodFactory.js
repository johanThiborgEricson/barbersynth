Interpreter.MethodFactory = function() {
  "use strict";
  var that = Object.create(Interpreter.MethodFactory.prototype);
  
  that.CodePointer = CodePointer;
  
  return that;
};

Interpreter.MethodFactory.prototype
.makeMethod = function(instructionMaker) {
  "use strict";
  var methodFactory = this;
  var method = function(code) {
    if(code instanceof CodePointer) {
      var backup = code.backup();
      var maybeInstruction = instructionMaker(code, this);
      if(!maybeInstruction){
        code.restore(backup);
      }
      
      return maybeInstruction;
    }
    
    var codePointer = methodFactory.CodePointer(code);
    var instruction = instructionMaker(codePointer, this);
    if(!instruction) {
      throw new Error(codePointer.getParseErrorDescription());
    }
    
    if(codePointer.getUnparsed() !== "") {
      throw new Error("Trailing code: '" + codePointer.getUnparsed() + "'.");
    }
    
    return instruction(this);
  };
  
  return method;
};

Interpreter.MethodFactory.prototype
.terminal = function(token, interpretation){
  "use strict";
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
  
  return this.makeMethod(instructionMaker);
};

Interpreter.MethodFactory.prototype
.terminalEmptyString = function(interpretation){
  "use strict";
  return this.terminal(/(?:)/, interpretation);
};

Interpreter.MethodFactory.prototype
.nonTerminalSequence = function() {
  "use strict";
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
      var resultsArray = [];
      var resultsObject = {};
      names.map(function(name) {
        var result = instructions[name](interpreter);
        resultsArray.push(result);
        resultsObject[name] = result;
      });
      
      if(interpretation) {
        return interpretation.apply(interpreter, resultsArray);
      } else {
        return resultsObject;
      }
    };
    
    return instruction;
  };
  
  return this.makeMethod(instructionMaker);
};

Interpreter.MethodFactory.prototype
.nonTerminalAlternative = function() {
  "use strict";
  var alternatives = Array.prototype.slice.call(arguments);
  var instructionMaker = function(codePointer, interpreter) {
    var parseSuccess = false;
    var i = 0;
    while(!parseSuccess && i < alternatives.length) {
      parseSuccess = interpreter[alternatives[i++]](codePointer);
    }
    
    return parseSuccess;
  };
  
  return this.makeMethod(instructionMaker);
};

Interpreter.MethodFactory.prototype
.nonTerminalAsterisk = function(name, interpretation) {
  "use strict";
  var instructionMaker = function(codePointer, interpreter) {
    var maybeInstruction = true;
    var instructions = [];
    while(maybeInstruction) {
      maybeInstruction = interpreter[name](codePointer);
      instructions.push(maybeInstruction);
    }
    
    instructions.pop();
    
    var instruction = function(interpreter) {
      var results = instructions.map(function(subInstruction) {
        return subInstruction(interpreter);
      });
      
      if(interpretation) {
        return interpretation.call(interpreter, results);
      } else {
        return results;
      }
    };
    
    return instruction;
  };
  
  return this.makeMethod(instructionMaker);
};
