function Fraction(that) {
  return {
    add(term) {
      var gcd = this.greatestCommonDivisor(that[1], term[1]);
      var thatNumerator = that[0] * (term[1] / gcd);
      var termNumerator = term[0] * (that[1] / gcd);
      var commonDenominator = that[1] * (term[1] / gcd);
      var sum = [thatNumerator + termNumerator, commonDenominator];
      return this.reduce(sum);
    },
    
    greatestCommonDivisor(a, b) {
      var small = Math.min(a, b);
      var big = Math.max(a, b);
      var reminder = big % small;
      while(reminder > 0) {
        big = small;
        small = reminder;
        reminder = big % small;
      }
      
      var gcd = small;
      return gcd;
    },
    
  };
  
}
