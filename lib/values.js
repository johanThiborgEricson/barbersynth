function values(array) {
  var i = 0;
  var iterator = function() {
    var isDone = i === array.length;
    return {
      done: isDone,
      value: isDone? undefined: array[i++],
    };

  };
  
  return {
    next: iterator,
  };
  
}
