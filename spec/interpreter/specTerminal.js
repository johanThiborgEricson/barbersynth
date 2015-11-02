describe("Terminal(token, interpretation)" + 
".parse(codePointer).apply(thisBinding)", function() {
  var codePointer;
  var interpreter;
  function StubCodePointer() {
    var that = Object.create(StubCodePointer.prototype);
    that.parse = function() {
      
    };
    
    return that;
  }
  
  StubCodePointer.prototype = CodePointer();
  
  beforeEach(function() {
    codePointer = StubCodePointer();
    interpreter = Interpreter();
  });
  
  it("calls codePointer.parse with token", function() {
    var terminal = interpreter.terminal("token", "interpretation");
    spyOn(codePointer, "parse");
    terminal(codePointer);
    expect(codePointer.parse).toHaveBeenCalledWith("token");
  });
  
  it("calls interpretation with all the elements in the result " + 
  "of codePointer.parse", function() {
    var interpretation = jasmine.createSpy("interpretation");
    var terminal = interpreter.terminal("token", interpretation);
    spyOn(codePointer, "parse").and.returnValue(["lexeme a", "lexeme b"]);
    var instruction = terminal(codePointer);
    instruction();
    expect(interpretation).toHaveBeenCalledWith("lexeme a", "lexeme b");
  });
  
  it("calls interpretation with its call method with thisBinding as argument", 
  function() {
    var stolenThis;
    var thisThief = function() {
      stolenThis = this;
    };
    
    var thisBinding = {property: "property"};
    var terminal = interpreter.terminal("token", thisThief);
    spyOn(codePointer, "parse").and.returnValue([]);
    var instruction = terminal(codePointer);
    instruction.call(thisBinding);
    expect(stolenThis).toBe(thisBinding);
  });
  
  it("returns null if the result of parse is null", function() {
    var terminal = interpreter.terminal("token", "interpretation");
    spyOn(codePointer, "parse").and.returnValue(null);
    expect(terminal(codePointer)).toBe(null);
  });
  
});
