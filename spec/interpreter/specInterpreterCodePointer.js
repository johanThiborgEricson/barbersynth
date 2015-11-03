describe("Interpreter.MethodFactory().CodePointer()", function() {
  it("exists", function () {
    var mf = Interpreter.MethodFactory();
    expect(mf.CodePointer).toBeDefined();
  });
  
  // TODO: move CodePointer method tests here, except parse
});
