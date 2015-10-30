function Symbol() {
  var that = Object.create(Symbol.prototype);
  
  return that;
}

// CodePointer => Instruction
Symbol.prototype
.makeInstruction = function(codePointer) {
  throw "Symbol().makeInstruction is an abstract method " + 
  "and should not be called.";
};
