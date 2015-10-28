describe("Terminal(token, interpretation, thisBinding)" + 
".parse(unparsedCodePointer)()", function() {
  it("calls lexemeHead with unparsedCodePointer", function() {
    var terminal = Terminal("token", "interpretation");
    spyOn(terminal, "lexemeHead");
    terminal.parse("unparsedCodePointer");
    expect(terminal.lexemeHead).toHaveBeenCalledWith("unparsedCodePointer");
  });
  
  it("calls interpretation all the elements in the result " + 
  "of lexemeHead", function() {
    var interpretation = jasmine.createSpy("interpretation");
    var terminal = Terminal("token", interpretation);
    spyOn(terminal, "lexemeHead").and.returnValue(["lexeme a", "lexeme b"]);
    var instruction = terminal.parse();
    instruction();
    expect(interpretation).toHaveBeenCalledWith("lexeme a", "lexeme b");
  });
  
  it("calls interpretation with this bound to thisBinding", function() {
    var stolenThis;
    var thisThief = function() {
      stolenThis = this;
    };
    
    var thisBinding = {property: "property"};
    var terminal = Terminal("token", thisThief, thisBinding);
    spyOn(terminal, "lexemeHead").and.returnValue([]);
    var instruction = terminal.parse();
    instruction();
    expect(stolenThis).toBe(thisBinding);
  });
  
  it("returns null if the result of lexemeHead is null", function() {
    var terminal = Terminal("token", "interpretation");
    spyOn(terminal, "lexemeHead").and.returnValue(null);
    expect(terminal.parse()).toBe(null);
  });
  
});
