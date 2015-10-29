function Terminal(token, interpretation){
  var that = Object.create(Terminal.prototype);
  
  that.parse = function(unparsedCodePointer) {
    var lexeme = this.lexemeHead(unparsedCodePointer);
    if(!lexeme) {
      return null;
    }
    
    var instruction = function() {
      return interpretation.apply(this, lexeme);
    };
    
    return instruction;
  };
  
  that.lexemeHead = function(unparsedCodePointer) {
    var match = token.exec(unparsedCodePointer.value);
    if(!match || match.index !== 0) {
      return null;
    }
    
    unparsedCodePointer.value = unparsedCodePointer.value.slice(match[0].length);
    return match.slice(1);
  };
  
  return that;
}

Terminal.prototype = Symbol();
