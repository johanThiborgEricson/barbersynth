describe("interpreter.symbol(instructionMaker)" + 
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
  
  it("calls instructionMaker with the result of " + 
  "CodePointer(code)", function() {
    var codePointer = {getUnparsed() {return "";}};
    interpreter.CodePointer = function() {
      return codePointer;
    };
    
    var instructionMaker = jasmine.createSpy("instructionMaker").and
    .returnValue(function(){});
    interpreter.method = interpreter.symbol(instructionMaker);
    interpreter.method();
    expect(instructionMaker)
    .toHaveBeenCalledWith(codePointer);
  });
  
  it("throws an error if !instructionMaker(codePointer)", function() {
    var instructionMaker = function() {
      return null;
    };
    
    interpreter.method = interpreter.symbol(instructionMaker);
    
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
  
  it("calls the result of instructionMaker and returns the result", function() {
    var instruction = jasmine.createSpy("instruction").and
    .returnValue("result");
    var instructionMaker = function() {
      return instruction;
    };
    
    interpreter.method = interpreter.symbol(instructionMaker);
    
    expect(interpreter.method()).toEqual("result");
    expect(instruction).toHaveBeenCalled();
  });
  
  it("calls the result of instructionMaker with this bound to thisBinding", 
  function() {
    var thisBinding = {binding: "this"};
    var stolenThis;
    var thisThief = function() {
      stolenThis = this;
    };
    
    var instructionMaker = function() {
      return thisThief;
    };
    
    thisBinding.method = interpreter.symbol(instructionMaker);
    
    thisBinding.method();
    expect(stolenThis).toBe(thisBinding);
  });
  
  it("if code is CodePointer, calls instructionMaker with this bound to " +
  "thisBinding", 
  function() {
    var thisBinding = {binding: "this"};
    var stolenThis;
    var thisThief = function() {
      stolenThis = this;
      return function() {};
    };
    
    thisBinding.method = interpreter.symbol(thisThief);
    
    thisBinding.method(CodePointer());
    expect(stolenThis).toBe(thisBinding);
  });
  
  it("if code is not CodePointer, calls instructionMaker with this bound to " +
  "thisBinding", 
  function() {
    var thisBinding = {binding: "this"};
    var stolenThis;
    var thisThief = function() {
      stolenThis = this;
      return function() {};
    };
    
    thisBinding.method = interpreter.symbol(thisThief);
    
    thisBinding.method();
    expect(stolenThis).toBe(thisBinding);
  });
  
});
