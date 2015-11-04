describe("Interpreter.MethodFactory()" +
".nonTerminalSequence(name1, ... , nameN, optional interpretation)" + 
".call(interpreter, CodePointer(lexeme1 + ... + lexemeN))(interpreter)", 
function() {
  var methodFactory = Interpreter.MethodFactory();
  var interpreter;
  var noop;
  
  beforeEach(function() {
    noop = function() {};
    interpreter = {
      name1(){return noop;},
      name2(){return noop;},
    };
    
  });
  
  describe("if interpretation isn't defined,", function() {
    
    it("with n = 1, calls the method with the name name1 with codePointer", 
    function() {
      spyOn(interpreter, "name1").and.returnValue(noop);
      interpreter.sequence = methodFactory
      .nonTerminalSequence2("name1");
      var codePointer = CodePointer();
      interpreter.sequence(codePointer);
      expect(interpreter.name1).toHaveBeenCalledWith(codePointer);
    });
    
    it("with n = 2, calls the methods name1 and name2", function() {
      spyOn(interpreter, "name1").and.returnValue(noop);
      spyOn(interpreter, "name2").and.returnValue(noop);
      interpreter.sequence = methodFactory
      .nonTerminalSequence2("name1", "name2");
      interpreter.sequence(CodePointer());
      expect(interpreter.name1).toHaveBeenCalled();
      expect(interpreter.name2).toHaveBeenCalled();
    });
    
    it("returns an instruction that, when called with interpreter as " + 
    "argument, calls the instructions returned by the named methods with " + 
    "interpreter as argument", function() {
      var instruction1 = jasmine.createSpy("instruction 1");
      var instruction2 = jasmine.createSpy("instruction 2");
      interpreter = {
        name1(){return instruction1;},
        name2(){return instruction2;},
      };
      
      interpreter.sequence = methodFactory
      .nonTerminalSequence2("name1", "name2");
      var sequenceInstruction = interpreter.sequence(CodePointer());
      sequenceInstruction(interpreter);
      expect(instruction1).toHaveBeenCalledWith(interpreter);
      expect(instruction2).toHaveBeenCalledWith(interpreter);
    });
    
    it("returns an instruction that, when called, returns an object with " + 
    "the elements name1, ... nameN that contains the result of calling the " + 
    "instructions returned by the respective method", function(){
      interpreter.name1 = function() {
        return function() {
          return "instruction result 1";
        };
      };
      
      interpreter.nameN = function() {
        return function() {
          return "instruction result n";
        };
      };
      
      interpreter.sequence = methodFactory
      .nonTerminalSequence2("name1", "nameN");
      var sequenceInstruction = interpreter.sequence(CodePointer());
      expect(sequenceInstruction(interpreter)).toEqual({
        name1: "instruction result 1",
        nameN: "instruction result n",
      });
    });
    
  });

  xit("with n = 1, calls interpretation with an object with one field, " +
  "name1, that contains the result of calling name1", 
  function() {
    actuallInterpreter.sequence = methodFactory.nonTerminalSequence("method1");
    var actuallCodePointer = StubCodePointer("lexeme 1" + "code");
    actuallInstruction = actuallInterpreter.sequence(actuallCodePointer);
    var expectedCodePointer = StubCodePointer("lexeme 1" + "code");
    expectedInstruction = expectedInterpreter.method1(expectedCodePointer);
    expect(actuallCodePointer.getUnparsed())
    .toEqual(expectedCodePointer.getUnparsed());
    var actuallResult = actuallInstruction(actuallInterpreter);
    var expectedResult = expectedInstruction(expectedInterpreter);
    expect(actuallResult).toEqual({method1:expectedResult});
    expect(actuallInterpreter.con).toEqual(expectedInterpreter.con);
  });
  
  xit("with n = 2, returns the same thing as calling symbol1 and 2 " + 
  "with apropriate code and composing the results", function() {
    var sequence = methodFactory.nonTerminalSequence([actuallSymbol1, actuallSymbol2]);
    var expectedCodePointer = StubCodePointer("lexeme 1" + "lexeme 2" + "code");
    expectedThisBinding.method1 = expectedSymbol1(expectedCodePointer);
    expectedThisBinding.method2 = expectedSymbol2(expectedCodePointer);
    expectedThisBinding.method1();
    var expectedResult = expectedThisBinding.method2();
    var actuallCodePointer = StubCodePointer("lexeme 1" + "lexeme 2" + "code");
    actuallThisBinding.method = sequence(actuallCodePointer);
    expect(actuallCodePointer.getUnparsed())
    .toEqual(expectedCodePointer.getUnparsed());
    expect(actuallThisBinding.method()).toEqual(expectedResult);
    expect(actuallThisBinding.con).toEqual(expectedThisBinding.con);
  });
  
  xit("with n = 0, parses nothing", function() {
    var sequence = methodFactory.nonTerminalSequence([]);
    var unparsedCodePointer = StubCodePointer("code");
    expect(sequence(unparsedCodePointer)()).toBe(undefined);
    expect(unparsedCodePointer.getUnparsed()).toEqual("code");
  });
  
  xit("returns null if any symbol(code) in symbols returns null. " + 
  "Subsequent symbols should not be called", function() {
    var actuallSymbol1 = jasmine.createSpy("actuallSymbol1").and
    .returnValue(function() {});
    var actuallSymbol2 = jasmine.createSpy("actuallSymbol1").and
    .returnValue(null);
    var actuallSymbol3 = jasmine.createSpy("actuallSymbol1").and
    .returnValue(function() {});
    var sequence = methodFactory.nonTerminalSequence(
      [actuallSymbol1, actuallSymbol2, actuallSymbol3]
    );
    
    expect(sequence(CodePointer(""))).toBe(null);
    expect(actuallSymbol3).not.toHaveBeenCalled();
  });
  
  xit("calls the instructions from the symbols with thisBinding as this-binding", 
  function() {
    var stolenThis;
    var thisThief = function() {
      stolenThis = this;
    };
    
    var thisBinding = {
      property: "property",
    };
    
    var symbol = jasmine.createSpy("symbol").and.returnValue(thisThief);
    var sequence = methodFactory.nonTerminalSequence([symbol]);
    var instruction = sequence(CodePointer(""));
    instruction.call(thisBinding);
    expect(stolenThis).toBe(thisBinding);
  });
});
