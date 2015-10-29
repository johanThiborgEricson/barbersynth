  function StubCodePointer(code) {
    var that = Object.create(StubCodePointer.prototype);
    that.value = code;
    that.parse = function() {
      
    };
    
    that.getUnparsed = function() {
      return that.value;
    };
    
    that.backup = function() {
      return that.value;
    };
    
    that.restore = function(backup) {
      that.value = backup;
    };
    
    return that;
  }
  
