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
      name3(){return noop;},
    };
    
  });
  
  it("returns null if any symbol(code) in symbols returns null. " + 
  "Subsequent symbols should not be called", function() {
    spyOn(interpreter, "name1").and.returnValue(noop);
    spyOn(interpreter, "name2").and.returnValue(null);
    spyOn(interpreter, "name3").and.returnValue(noop);
    interpreter.sequence = methodFactory
    .nonTerminalSequence2("name1", "name2", "name3");
    
    expect(interpreter.sequence(CodePointer(""))).toBe(null);
    expect(interpreter.name3).not.toHaveBeenCalled();
  });
  
  describe("if interpretation isn't supplied,", function() {
    
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

  describe("if interpretation is supplied,", function() {
    
    xit("returns an instruction that, when called with interpreter as " + 
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
    
    xit("returns an instruction that, when called, returns an object with " + 
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

});
