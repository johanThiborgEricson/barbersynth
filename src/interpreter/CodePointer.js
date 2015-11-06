function CodePointer(code) {
  var that = Object.create(CodePointer.prototype);
  var pointer = 0;
  
  that.parse = function(token) {
    var unparsedCode = code.slice(pointer);
    var match = token.exec(unparsedCode);
    if(!match || match.index !== 0) {
      this.reportParseError(token);
      return null;
    }
    
    pointer += match[0].length;
    return match.slice(1);
  };
  
  that.backup = function() {
    return pointer;
  };
  
  that.restore = function(backup) {
    pointer = backup;
  };
  
  that.getUnparsed = function() {
    return code.slice(pointer);
  };
  
  return that;
}

CodePointer.prototype
.parseErrorDescription = {
  actuallCode: {
    length: Infinity,
  }
};

CodePointer.prototype
.reportParseError = function(token) {
  var stripedToken = token.toString().slice(1, -1);
  var tokenAlternatives = stripedToken;
  var currentUnparsed = this.getUnparsed();
  var currentLength = currentUnparsed.length;
  var previousLength = this.parseErrorDescription.actuallCode.length;
  
  if(currentLength > previousLength) {
    return;
  }
  
  if(currentLength < previousLength) {
    this.parseErrorDescription.expectedAlternatives = undefined;
  }
  
  if(this.parseErrorDescription.expectedAlternatives) {
    tokenAlternatives = 
    this.parseErrorDescription.expectedAlternatives + "|" + stripedToken;
  }
  
  this.parseErrorDescription = {
    expectedAlternatives: tokenAlternatives,
    actuallCode: currentUnparsed,
  };

};

CodePointer.prototype
.getParseErrorDescription = function() {
  return "Expected /^" + this.parseErrorDescription.expectedAlternatives + 
  "/ to match '" + this.parseErrorDescription.actuallCode + "'.";
};
  

