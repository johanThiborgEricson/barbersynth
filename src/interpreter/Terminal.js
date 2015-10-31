
// TODO: marked for deletion
function Terminal2(token, interpretation){
  var that = Object.create(Terminal2.prototype);
  
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

Terminal2.prototype = Symbol();
