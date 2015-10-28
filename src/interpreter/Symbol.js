function Symbol() {
  var that = Object.create(Symbol.prototype);
  
  return that;
}

// unparsedCodePointer => Instruction
Symbol.prototype
.parse = function(unparsedCodePointer) {
  throw "Symbol().parse is an abstract method and should not be called.";
};
  
Symbol.prototype
.interpret = function(code) {
  var unparsedCodePointer = {value: code};
  var instruction = this.parse(unparsedCodePointer);
  if(!instruction || unparsedCodePointer.value !== "") {
    return Symbol.PARSE_ERROR;
  }
  
  instruction();
};

Symbol.PARSE_ERROR = new Error("Symbol.PARSE_ERROR");

Symbol.prototype
.regExpParseInstaller = MethodInstaller(RegExp.prototype, "parse", function(unparsedCodePointer) {
  return Terminal(this, Symbol().id).parse(unparsedCodePointer);
});

Symbol
.regExpParseInstaller = function(Terminal) {
  return MethodInstaller(RegExp.prototype, "parse", function(unparsedCodePointer) {
    return Terminal(this, Symbol.id).parse(unparsedCodePointer);
  });
};

Symbol
.id = function() {
  
};
