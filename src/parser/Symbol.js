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
.interpret = function(code, valueIn) {
  var unparsedCodePointer = {value: code};
  var instruction = this.parse(unparsedCodePointer);
  if(!instruction || unparsedCodePointer.value !== "") {
    return Symbol.PARSE_ERROR;
  }
  var valueOut = instruction(valueIn);
  return valueOut;
};

Symbol.PARSE_ERROR = new Error("Symbol.PARSE_ERROR");
