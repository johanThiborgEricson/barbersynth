function CodePointer(code) {
  var that = Object.create(CodePointer.prototype);
  that.value = code;
  that.parse = function() {
    
  };
  
  that.getUnparsed = function() {
    return that.value;
  };
  
  return that;
}
