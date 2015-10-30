function CodePointer(code) {
  var that = Object.create(CodePointer.prototype);
  var pointer = 0;
  
  that.parse = function(token) {
    var unparsedCode = code.slice(pointer);
    var match = token.exec(unparsedCode);
    if(!match || match.index !== 0) {
      return null;
    }
    
    pointer += match[0].length;
    return match.slice(1);
  };
  
  that.backup = function() {
    return pointer;
  };
  
  that.restore = function(backup) {
    pointer = backup;
  };
  
  that.getUnparsed = function() {
    return code.slice(pointer);
  };
  
  return that;
}
