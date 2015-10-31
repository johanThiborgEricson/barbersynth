describe("Interpreter().regExpPrototypeMakeInstructionInstaller(Terminal)", 
function() {
  var oldTerminal;
  var interpreter = Interpreter();
  
  beforeEach(function() {
    expect(new RegExp().makeInstruction).not.toBeDefined();
  });
  
  afterEach(function() {
    expect(new RegExp().makeInstruction).not.toBeDefined();
  });
  
  it("has methods install and uninstall that adds and removes makeInstruction methods " + 
  "on all regular expressions", function() {
    expect(new RegExp().makeInstruction).not.toBeDefined();
    var installer = interpreter.regExpPrototypeMakeInstructionInstaller();
    installer.install();
    expect(new RegExp().makeInstruction).toBeDefined();
    installer.uninstall();
    expect(new RegExp().makeInstruction).not.toBeDefined();
  });
  
  describe("adds a method makeInstruction(unparsedCodePointer) on all regular " + 
  "expressions that", function() {
  
    it("calls Terminal with this and Symbol().id", function() {
      interpreter.terminal = jasmine.createSpy("StubTerminal").and.returnValue({
        makeInstruction() {},
      });
      
      var installer = interpreter.regExpPrototypeMakeInstructionInstaller();
      installer.install();
      var regularExpression = new RegExp();
      regularExpression.makeInstruction();
      expect(interpreter.terminal)
      .toHaveBeenCalledWith(regularExpression, interpreter.noop);
      
      installer.uninstall();
    });
    
    it("returns the result of calling makeInstruction with argument " + 
    "unparsedCodePointer on its terminal", function() {
      var makeInstruction = jasmine.createSpy("makeInstruction").and
      .returnValue("lexeme");
      interpreter.terminal = jasmine.createSpy("StubTerminal").and.returnValue({
        makeInstruction: makeInstruction,
      });
      
      var installer = interpreter.regExpPrototypeMakeInstructionInstaller();
      installer.install();
      expect(new RegExp().makeInstruction("unparsedCodePointer"))
      .toEqual("lexeme");
      expect(makeInstruction).toHaveBeenCalledWith("unparsedCodePointer");
      
      installer.uninstall();
    });
    
  });
  
});
