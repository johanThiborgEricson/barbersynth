function StubLexeme_dConcatenator() {
  var that = Object.create(StubLexeme_dConcatenator.prototype);

  that.makeInstruction = function(codePointer) {
    // TODO: use array.slice and concatenate.apply(this, lexeme) to 
    // better illustrate how it is supposed to work.
    var lexeme = /^lexeme \d/.exec(codePointer.backup())[0];
    codePointer.restore(codePointer.backup().slice(lexeme.length));
    return function() {
      this.con = this.con + lexeme;
    };
  };
  
  return that;
}

StubLexeme_dConcatenator.prototype = Symbol();
