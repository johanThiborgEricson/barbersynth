function Fraction(that) {
  function gcdFunction(a, b) {
    var small = Math.min(a, b);
    var large = Math.max(a, b);
    return gcdFunction.ordered(small, large);
  }
  
  gcdFunction.ordered = function(small, large) {
    var reminder = large % small;
    return reminder === 0 ? small : gcdFunction.ordered(reminder, small);
  };
  
  return {
    add(term) {
      var gcd = this.greatestCommonDivisor(that[1], term[1]);
      var thatNumerator = that[0] * (term[1] / gcd);
      var termNumerator = term[0] * (that[1] / gcd);
      var commonDenominator = that[1] * (term[1] / gcd);
      var sum = [thatNumerator + termNumerator, commonDenominator];
      return this.reduce(sum);
    },
    
    greatestCommonDivisor: gcdFunction,
  };
  
}
