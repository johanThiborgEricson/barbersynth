describe("interpreter.symbol(makeInstruction)" + 
".call(thisBinding, code)", function() {
  var CodePointer;
  var interpreter;

  beforeEach(function() {
    interpreter = Interpreter();
    interpreter.CodePointer = jasmine.createSpy("interpreter.CodePointer").and
    .returnValue(StubCodePointer(""));
    CodePointer = jasmine.createSpy("CodePointer").and
    .returnValue(StubCodePointer(""));
  });
  
  it("calls CodePointer with code", function() {
    interpreter.method = interpreter.symbol(function() {
      return function() {};
    });
    
    interpreter.method("code");
    expect(interpreter.CodePointer).toHaveBeenCalledWith("code");
  });
  
  it("calls makeInstruction with the result of " + 
  "CodePointer(code)", function() {
    var codePointer = {getUnparsed() {return "";}};
    interpreter.CodePointer = function() {
      return codePointer;
    };
    
    var makeInstruction = jasmine.createSpy("makeInstruction").and
    .returnValue(function(){});
    interpreter.method = interpreter.symbol(makeInstruction);
    interpreter.method();
    expect(makeInstruction)
    .toHaveBeenCalledWith(codePointer);
  });
  
  it("throws an error if !makeInstruction(codePointer)", function() {
    var makeInstruction = function() {
      return null;
    };
    
    interpreter.method = interpreter.symbol(makeInstruction);
    
    expect(interpreter.method.bind(interpreter)).toThrow();
  });
  
  it("throws an error if codePointer.getUnparsed() !== ''", function() {
    interpreter.CodePointer = function() {
      return {
        getUnparsed() {
          return "trailing code";
        },
      };
    };
    
    interpreter.method = interpreter.symbol(function() {
      return function() {};
    });
    
    expect(interpreter.method.bind(interpreter)).toThrow();
  });
  
  it("calls the result of makeInstruction and returns the result", function() {
    var instruction = jasmine.createSpy("instruction").and
    .returnValue("result");
    var makeInstruction = function() {
      return instruction;
    };
    
    interpreter.method = interpreter.symbol(makeInstruction);
    
    expect(interpreter.method()).toEqual("result");
    expect(instruction).toHaveBeenCalled();
  });
  
  it("calls the result of makeInstruction with this bound to thisBinding", 
  function() {
    var thisBinding = {};
    var stolenThis;
    var thisThief = function() {
      stolenThis = this;
    };
    
    var makeInstruction = function() {
      return thisThief;
    };
    
    thisBinding.method = interpreter.symbol(makeInstruction);
    
    thisBinding.method();
    expect(stolenThis).toBe(thisBinding);
  });
  
  // I would much rather to call this with null or undefined, but JavaScript
  // won't let me. 
  // FIXME: replace with an object that screams aloud if anyone tries to 
  // get or set properties.
  it("calls the result of makeInstruction with this bound to interpreter if " + 
  "thisBinding = global", function() {
    var stolenThis;
    var thisThief = function() {
      stolenThis = this;
    };
    
    var symbol = interpreter.symbol(function() {
      return thisThief;
    });
    
    symbol();
    expect(stolenThis).toBe(interpreter);
    
  });
  

});
