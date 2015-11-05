describe("Interpreter.MethodFactory().makeMethod(instructionMaker)" + 
".call(interpreter, code)", function() {
  var CodePointer;
  var interpreter;
  var methodFactory;

  beforeEach(function() {
    interpreter = Interpreter();
    methodFactory = Interpreter.MethodFactory();
    methodFactory.CodePointer = jasmine.createSpy("interpreter.CodePointer").and
    .returnValue(StubCodePointer(""));
    CodePointer = jasmine.createSpy("CodePointer").and
    .returnValue(StubCodePointer(""));
  });
  
  describe("if code is a codePointer,", function() {
    
    it("calls instructionMaker with code and interpreter and returns the " +
    "result", function() {
      var instructionMaker = jasmine.createSpy("instructionMaker").and
      .returnValue("instruction maker result");
      interpreter.method = methodFactory.makeMethod(instructionMaker);
      var codePointer = CodePointer();
      expect(interpreter.method(codePointer))
      .toEqual("instruction maker result");
      expect(instructionMaker).toHaveBeenCalledWith(codePointer, interpreter);
    });
    
  });
  
  it("calls CodePointer with code", function() {
    interpreter.method = methodFactory.makeMethod(function() {
      return function() {};
    });
    
    interpreter.method("code");
    expect(methodFactory.CodePointer).toHaveBeenCalledWith("code");
  });
  
  it("calls instructionMaker with the result of " + 
  "CodePointer(code) and the interpreter that the method was on", function() {
    var codePointer = {getUnparsed() {return "";}};
    methodFactory.CodePointer = function() {
      return codePointer;
    };
    
    var instructionMaker = jasmine.createSpy("instructionMaker").and
    .returnValue(function(){});
    interpreter.method = methodFactory.makeMethod(instructionMaker);
    interpreter.method();
    expect(instructionMaker)
    .toHaveBeenCalledWith(codePointer, interpreter);
  });
  
  it("throws an error if !instructionMaker(codePointer)", function() {
    var instructionMaker = function() {
      return null;
    };
    
    interpreter.method = methodFactory.makeMethod(instructionMaker);
    
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
    
    interpreter.method = methodFactory.makeMethod(function() {
      return function() {};
    });
    
    expect(interpreter.method.bind(interpreter)).toThrow();
  });
  
  it("calls the result of instructionMaker with interpreter and returns the result", function() {
    var instruction = jasmine.createSpy("instruction").and
    .returnValue("result");
    var instructionMaker = function() {
      return instruction;
    };
    
    interpreter.method = methodFactory.makeMethod(instructionMaker);
    
    expect(interpreter.method()).toEqual("result");
    expect(instruction).toHaveBeenCalledWith(interpreter);
  });
  
  it("if code is a CodePointer, calls backup on that codePointer before " +
  "instructionMaker is called, and calls restore with the result iff " +
  "instructionMaker returns null");
  
});
