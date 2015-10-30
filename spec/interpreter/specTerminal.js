describe("Terminal(token, interpretation)" + 
".parse(codePointer).apply(thisBinding)", function() {
  var codePointer;
  function StubCodePointer() {
    var that = Object.create(StubCodePointer.prototype);
    that.parse = function() {
      
    };
    
    return that;
  }
  
  beforeEach(function() {
    codePointer = StubCodePointer();
  });
  
  it("calls codePointer.parse with token", function() {
    var terminal = Terminal("token", "interpretation");
    spyOn(codePointer, "parse");
    terminal.makeInstruction(codePointer);
    expect(codePointer.parse).toHaveBeenCalledWith("token");
  });
  
  it("calls interpretation with all the elements in the result " + 
  "of codePointer.parse", function() {
    var interpretation = jasmine.createSpy("interpretation");
    var terminal = Terminal("token", interpretation);
    spyOn(codePointer, "parse").and.returnValue(["lexeme a", "lexeme b"]);
    var instruction = terminal.makeInstruction(codePointer);
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
    var terminal = Terminal("token", thisThief);
    spyOn(codePointer, "parse").and.returnValue([]);
    var instruction = terminal.makeInstruction(codePointer);
    instruction.call(thisBinding);
    expect(stolenThis).toBe(thisBinding);
  });
  
  it("returns null if the result of parse is null", function() {
    var terminal = Terminal("token", "interpretation");
    spyOn(codePointer, "parse").and.returnValue(null);
    expect(terminal.makeInstruction(codePointer)).toBe(null);
  });
  
});
