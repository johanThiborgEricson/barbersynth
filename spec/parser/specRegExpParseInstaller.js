describe("Symbol().regExpParseInstaller(Terminal)", function() {
  var oldTerminal;
  beforeAll(function() {
    oldTerminal = Terminal;
  });
  
  afterAll(function() {
    expect(Terminal).toBe(oldTerminal);
  });
  
  beforeEach(function() {
    expect(new RegExp().parse).not.toBeDefined();
  });
  
  afterEach(function() {
    expect(new RegExp().parse).not.toBeDefined();
  });
  
  it("has methods install and uninstall that adds and removes parse methods " + 
  "on all regular expressions", function() {
    expect(new RegExp().parse).not.toBeDefined();
    var installer = Symbol.regExpParseInstaller(Terminal);
    installer.install();
    expect(new RegExp().parse).toBeDefined();
    installer.uninstall();
    expect(new RegExp().parse).not.toBeDefined();
  });
  
  describe("adds a method parse(unparsedCodePointer) on all regular " + 
  "expressions that", function() {
  
    it("calls Terminal with this and Symbol().id", function() {
      StubTerminal = jasmine.createSpy("StubTerminal").and.returnValue({
        parse() {},
      });
      
      var installer = Symbol.regExpParseInstaller(StubTerminal);
      installer.install();
      var regularExpression = new RegExp();
      regularExpression.parse();
      expect(StubTerminal)
      .toHaveBeenCalledWith(regularExpression, Symbol.id);
      
      installer.uninstall();
    });
    
    it("returns the result of calling parse with argument " + 
    "unparsedCodePointer on its terminal", function() {
      var parse = jasmine.createSpy("parse").and.returnValue("lexeme");
      var StubTerminal = jasmine.createSpy("StubTerminal").and.returnValue({
        parse: parse,
      });
      
      var installer = Symbol.regExpParseInstaller(StubTerminal);
      installer.install();
      expect(new RegExp().parse("unparsedCodePointer")).toEqual("lexeme");
      expect(parse).toHaveBeenCalledWith("unparsedCodePointer");
      
      installer.uninstall();
    });
    
  });
  
});
