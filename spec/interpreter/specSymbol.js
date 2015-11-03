describe("Interpreter.MethodFactory().symbol(instructionMaker)" + 
".call(interpreter, code)", function() {
  var CodePointer;
  var interpreter;
  var methodFactory;

  beforeEach(function() {
    interpreter = Interpreter;
    methodFactory = Interpreter.MethodFactory();
    methodFactory.CodePointer = jasmine.createSpy("interpreter.CodePointer").and
    .returnValue(StubCodePointer(""));
    CodePointer = jasmine.createSpy("CodePointer").and
    .returnValue(StubCodePointer(""));
  });
  
  it("calls CodePointer with code", function() {
    interpreter.method = methodFactory.symbol(function() {
      return function() {};
    });
    
    interpreter.method("code");
    expect(methodFactory.CodePointer).toHaveBeenCalledWith("code");
  });
  
  it("calls instructionMaker with the result of " + 
  "CodePointer(code)", function() {
    var codePointer = {getUnparsed() {return "";}};
    methodFactory.CodePointer = function() {
      return codePointer;
    };
    
    var instructionMaker = jasmine.createSpy("instructionMaker").and
    .returnValue(function(){});
    interpreter.method = methodFactory.symbol(instructionMaker);
    interpreter.method();
    expect(instructionMaker)
    .toHaveBeenCalledWith(codePointer);
  });
  
  it("throws an error if !instructionMaker(codePointer)", function() {
    var instructionMaker = function() {
      return null;
    };
    
    interpreter.method = methodFactory.symbol(instructionMaker);
    
    expect(interpreter.method.bind(interpreter)).toThrow();
  });
  
  it("throws an error if codePointer.getUnparsed() !== ''", function() {
    methodFactory.CodePointer = function() {
      return {
        getUnparsed() {
          return "trailing code";
        },
      };
    };
    
    interpreter.method = methodFactory.symbol(function() {
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
    
    interpreter.method = methodFactory.symbol(instructionMaker);
    
    expect(interpreter.method()).toEqual("result");
    expect(instruction).toHaveBeenCalled();
  });
  
  it("calls the result of instructionMaker with this bound to thisBinding", 
  function() {
    var stolenThis;
    var thisThief = function() {
      stolenThis = this;
    };
    
    var instructionMaker = function() {
      return thisThief;
    };
    
    interpreter.method = methodFactory.symbol(instructionMaker);
    
    interpreter.method();
    expect(stolenThis).toBe(interpreter);
  });
  
  it("if code is CodePointer, calls instructionMaker with this bound to " +
  "thisBinding", 
  function() {
    var stolenThis;
    var thisThief = function() {
      stolenThis = this;
      return function() {};
    };
    
    interpreter.method = methodFactory.symbol(thisThief);
    
    interpreter.method(CodePointer());
    expect(stolenThis).toBe(interpreter);
  });
  
  it("if code is not CodePointer, calls instructionMaker with this bound to " +
  "thisBinding", 
  function() {
    var stolenThis;
    var thisThief = function() {
      stolenThis = this;
      return function() {};
    };
    
    interpreter.method = methodFactory.symbol(thisThief);
    
    interpreter.method();
    expect(stolenThis).toBe(interpreter);
  });
  
});
