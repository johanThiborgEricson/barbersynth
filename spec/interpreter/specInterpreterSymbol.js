describe("interpreter.symbol(CodePointer)" + 
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
    interpreter.method = interpreter.symbol();
    interpreter.method.makeInstruction = function() {
      return function() {};
    };
    
    interpreter.method("code");
    expect(interpreter.CodePointer).toHaveBeenCalledWith("code");
  });
  
  it("calls the makeInstruction-method on itself with the result of " + 
  "CodePointer(code)", function() {
    var codePointer = {getUnparsed() {return "";}};
    interpreter.CodePointer = function() {
      return codePointer;
    };

    interpreter.method = interpreter.symbol();
    interpreter.method.makeInstruction = function() {};
    spyOn(interpreter.method, "makeInstruction").and.returnValue(function(){});
    interpreter.method();
    expect(interpreter.method.makeInstruction)
    .toHaveBeenCalledWith(codePointer);
  });
  
  it("throws an error if !makeInstruction(codePointer)", function() {
    interpreter.method = interpreter.symbol();
    interpreter.method.makeInstruction = function() {
      return null;
    };
    
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
    
    interpreter.method = interpreter.symbol();
    interpreter.method.makeInstruction = function() {
      return function() {};
    };
    
    expect(interpreter.method.bind(interpreter)).toThrow();
  });
  
  it("calls the result of makeInstruction and returns the result", function() {
    interpreter.method = interpreter.symbol();
    var instruction = jasmine.createSpy("instruction").and
    .returnValue("result");
    interpreter.method.makeInstruction = function() {
      return instruction;
    };
    
    expect(interpreter.method()).toEqual("result");
    expect(instruction).toHaveBeenCalled();
  });
  
  it("calls the result of makeInstruction with this bound to thisBinding", 
  function() {
    var thisBinding = {};
    thisBinding.method = interpreter.symbol();
    var stolenThis;
    var thisThief = function() {
      stolenThis = this;
    };
    
    thisBinding.method.makeInstruction = function() {
      return thisThief;
    };
    
    thisBinding.method();
    expect(stolenThis).toBe(thisBinding);
  });
  
  // I would much rather to call this with null or undefined, but JavaScript
  // won't let me. 
  // FIXME: replace with an object that screams aloud if anyone tries to 
  // get or set properties.
  it("calls the result of makeInstruction with this bound to interpreter if " + 
  "thisBinding = global", function() {
    var symbol = interpreter.symbol();
    var stolenThis;
    var thisThief = function() {
      stolenThis = this;
    };
    
    symbol.makeInstruction = function() {
      return thisThief;
    };
    
    symbol();
    expect(stolenThis).toBe(interpreter);
    
  });
  

});
