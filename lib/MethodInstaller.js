function MethodInstaller(object, name, method) {
  var that = Object.create(MethodInstaller.prototype);
  var hadOwnProperty = object.hasOwnProperty(name);
  var oldProperty = object[name];
  that.install = function() {
    object[name] = method;
  };
  
  that.uninstall = function() {
    if(hadOwnProperty) {
      object[name] = oldProperty;
    } else {
      delete object[name];
    }
  };
  
  return that;
}
