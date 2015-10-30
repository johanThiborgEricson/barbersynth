function Terminal(token, interpretation){
  var that = Object.create(Terminal.prototype);
  
  that.makeInstruction = function(codePointer) {
    var lexeme = codePointer.parse(token);
    if(!lexeme) {
      return null;
    }
    
    var instruction = function() {
      return interpretation.apply(this, lexeme);
    };
    
    return instruction;
  };
  
  return that;
}

Terminal.prototype = Symbol();
