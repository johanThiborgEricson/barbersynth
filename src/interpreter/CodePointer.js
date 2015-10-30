function CodePointer(code) {
  var that = Object.create(CodePointer.prototype);
  that.value = code;
  that.parse = function(token) {
    var match = token.exec(this.value);
    if(!match || match.index !== 0) {
      return null;
    }
    
    this.value = this.value.slice(match[0].length);
    return match.slice(1);
  };
  
  that.getUnparsed = function() {
    return that.value;
  };
  
  return that;
}
