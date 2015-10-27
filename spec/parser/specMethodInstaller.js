describe("MethodInstaller(object, theName, method)", function() {
  it("has an install-method that sets object[theName] to method", function() {
    var object = {};
    var name = "theName";
    var method = function() {};
    var installer = MethodInstaller(object, name, method);
    installer.install();
    expect(object.theName).toBe(method);
  });
  
  describe("has an uninstall method that", function(){
    it("resets any old property", function() {
      var object = {
        theName: "old property",
      };
      
      var installer = MethodInstaller(object, "theName", "method");
      installer.install();
      installer.uninstall();
      expect(object.theName).toEqual("old property");
    });
    
    it("deletes the property if it wasn't defined previously", function() {
      var object = {};
      var installer = MethodInstaller(object, "theName", "method");
      installer.install();
      installer.uninstall();
      expect(object.hasOwnProperty("theName")).toBe(false);
    });
    
    it("deletes the property, even if it was reachable in the prototype chain", function() {
      var a = {
        theName: "inherited method",
      };
      
      var b = Object.create(a);
      expect(b.theName).toEqual("inherited method");
      
      var installer = MethodInstaller(b, "theName", "method");
      installer.install();
      expect(b.theName).toEqual("method");
      installer.uninstall();
      expect(b.theName).toEqual("inherited method");
    });
    
  });
  
});
