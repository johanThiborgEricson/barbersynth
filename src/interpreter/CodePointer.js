function CodePointer(code) {
  var that = Object.create(CodePointer.prototype);
  that.parse = function(token) {
    var match = token.exec(code);
    if(!match || match.index !== 0) {
      return null;
    }
    
    code = code.slice(match[0].length);
    return match.slice(1);
  };
  
  that.getUnparsed = function() {
    return code;
  };
  
  return that;
}
