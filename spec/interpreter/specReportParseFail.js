describe("CodePointer.reportParseFail(identifier)", function() {
  it("puts an object reason on itself with properties identifier and " +
  "actuallCode = getUnparsed()", function() {
    var codePointer = CodePointer("ab");
    codePointer.parse(/a/);
    codePointer.parse(/c/);
    codePointer.reportParseFail("c");
    expect(codePointer.reason).toEqual({
      expectedCode: "c",
      actuallCode: "b",
    });
  });
  
  it("ignores calls with longer actuall code", function(){
    var codePointer = CodePointer("abc");
    codePointer.parse(/a/);
    var backup = codePointer.backup();
    codePointer.parse(/b/);
    codePointer.parse(/d/);
    codePointer.reportParseFail("d");
    codePointer.restore(backup);
    codePointer.parse(/e/);
    codePointer.reportParseFail("e");
    expect(codePointer.reason).toEqual({
      expectedCode: "d",
      actuallCode: "c",
    });
  });
  
  it("remembers calls with actuall code of equal length (for alternatives)", 
  function(){
    var codePointer = CodePointer("ab");
    codePointer.parse(/a/);
    var backup = codePointer.backup();
    codePointer.parse(/c/);
    codePointer.reportParseFail("c");
    codePointer.parse(/d/);
    codePointer.reportParseFail("d");
    codePointer.parse(/c|d/);
    codePointer.reportParseFail("c|d");
    expect(codePointer.reason).toEqual({
      expectedCode: "c|d",
      actuallCode: "b",
    });
  });
  
});
