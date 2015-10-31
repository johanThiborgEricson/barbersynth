describe("var functionObject = " + 
"function() {functionObject.method();};", function() {
  it("assigns object before function body is evaluated", function() {
    var functionObject = function() {
      functionObject.method();
    };
    
    functionObject.method = function() {};
    spyOn(functionObject, "method");
    functionObject();
    expect(functionObject.method).toHaveBeenCalled();
  });
  
  function FunctionObject() {
    var that = function() {
      that.method();
    };
    
    return that;
  }
  
  it("may get its right hand side from a constructor", function() {
    var functionObject = FunctionObject();
    functionObject.method = function() {};
    spyOn(functionObject, "method");
    functionObject();
    expect(functionObject.method).toHaveBeenCalled();
  });
  
});
