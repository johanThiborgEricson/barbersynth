function StubConcatenationTerminal() {
  var that = Object.create(StubConcatenationTerminal.prototype);
  that.parse = function(unparsedCodePointer) {
    var lexeme = /^lexeme \d/.exec(unparsedCodePointer.value)[0];
    unparsedCodePointer.value = unparsedCodePointer.value.slice(lexeme.length);
    return function(valueIn) {
      var valueOut = valueIn + lexeme;
      return valueOut;
    };
  };
  
  return that;
}

StubConcatenationTerminal.prototype = Symbol();
