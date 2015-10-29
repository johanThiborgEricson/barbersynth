function StubLexeme_dConcatenator(thisBinding) {
  var that = Object.create(StubLexeme_dConcatenator.prototype);
  that.parse = function(unparsedCodePointer) {
    // TODO: use array.slice and concatenate.apply(thisBinding, lexeme) to 
    // better illustrate how it is supposed to work.
    var lexeme = /^lexeme \d/.exec(unparsedCodePointer.value)[0];
    unparsedCodePointer.value = unparsedCodePointer.value.slice(lexeme.length);
    return function() {
      this.con = this.con + lexeme;
    };
  };
  
  return that;
}

StubLexeme_dConcatenator.prototype = Symbol();
