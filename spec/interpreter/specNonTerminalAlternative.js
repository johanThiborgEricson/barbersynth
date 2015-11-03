xdescribe("Interpreter.MethodFactory()" + 
".nonTerminalAlternative([symbol1, ... , symbolN, ... symbolM])" + 
".call(interpreter, lexemeK + code).call(interpreter)", function() {
  
  var methodFactory;
  var interpreter;
  
  beforeEach(function() {
    methodFactory = Interpreter.MethodFactory();
    interpreter = {con: "value 0"};
  });
  
  it("if k = m = 1, calls symbol1 with codePointer", 
  function() {
    var actuallThisBinding = {con: "value 0"};
    var symbol1 = jasmine.createSpy("symbol 1").and
    .returnValue(function() {});
    interpreter.alternative = methodFactory.nonTerminalAlternative([symbol1]);
    var codePointer = StubCodePointer("lexeme 1" + "code");
    interpreter.alternative(codePointer);
    expect(symbol1)
    .toHaveBeenCalledWith(codePointer);
  });
  
  it("if k = m = 1, returns the reslut of calling symbol1 and updates codePointer", function() {
    var symbol1 = StubLexeme_dConcatenator();
    interpreter.alternative = methodFactory.nonTerminalAlternative([symbol1]);
    var codePointer = StubCodePointer("lexeme 1" + "code");
    var instruction = interpreter.alternative(codePointer);
    expect(codePointer.getUnparsed()).toEqual("code");
    instruction.call(interpreter);
    expect(interpreter.con).toEqual("value 0" + "lexeme 1");
  });
  
  it("if k = m = 1, calls symbol1 with codePointer", function() {
    var symbol1 = jasmine.createSpy("symbol 1");
    interpreter.alternative = methodFactory.nonTerminalAlternative([symbol1]);
    var codePointer = StubCodePointer("lexeme 1" + "code");
    interpreter.alternative(codePointer);
    expect(symbol1).toHaveBeenCalledWith(codePointer);
  });
  
  it("if k = m = 2, returns result of calling symbol2", function() {
    var symbol1 = jasmine.createSpy("symbol1").and.returnValue(null);
    var symbol2 = StubLexeme_dConcatenator();
    interpreter.alternative = methodFactory.nonTerminalAlternative([symbol1, symbol2]);
    var codePointer = StubCodePointer("lexeme 2" + "code");
    interpreter.method = interpreter.alternative(codePointer);
    interpreter.method();
    expect(interpreter.con).toEqual("value 0" + "lexeme 2");
  });
  
  function UnsuccessfulEaterOfChars() {
    function instructionMaker(codePointer) {
      codePointer.restore(codePointer.getUnparsed().slice(1));
      return null;
    }
    
    return Interpreter.MethodFactory().symbol(instructionMaker);
  }
  
  it("if k = m = 2 calls symbol2.parse with lexeme2 + code, even if " + 
  "symbol1 has moved the unparsedCodePointer before it failed", 
  function() {
    var symbol1 = UnsuccessfulEaterOfChars();
    var actuallThisBinding = {con: "value 0"};
    var symbol2 = StubLexeme_dConcatenator();
    interpreter.alternative = methodFactory.nonTerminalAlternative([symbol1, symbol2]);
    var codePointer = StubCodePointer("lexeme 2" + "code");
    actuallThisBinding.method = interpreter.alternative(codePointer);
    actuallThisBinding.method();
    expect(actuallThisBinding.con).toEqual("value 0" + "lexeme 2");
  });
  
  it("if k = 1 and m = 2, moves unparsedCodePointer past lexeme1", 
  function() {
    var symbol1 = StubLexeme_dConcatenator();
    var actuallThisBinding = {con: "value 0"};
    var symbol2 = UnsuccessfulEaterOfChars();
    interpreter.alternative = methodFactory.nonTerminalAlternative([symbol1, symbol2]);
    var codePointer = StubCodePointer("lexeme 1" + "code");
    interpreter.alternative(codePointer)();
    expect(codePointer.getUnparsed()).toEqual("code");
  });
  
  it("calls symbol 1 with the same this binding", function() {
        var thisBinding = {binding: "this"};
    var stolenThis;
    var thisThief = function() {
      stolenThis = this;
      return function() {};
    };
    
    thisBinding.method = methodFactory.nonTerminalAlternative([thisThief]);
    
    thisBinding.method(CodePointer());
    expect(stolenThis).toBe(thisBinding);

  });
  
});
