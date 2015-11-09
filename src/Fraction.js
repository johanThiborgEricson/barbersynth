function Fraction(numerator, denominator) {
  var that = Object.create(Fraction.prototype);
  that[0] = numerator;
  that[1] = denominator;
  
  return that;
}

Fraction.prototype
.add = function(term) {
  var gcd = this.greatestCommonDivisor(this[1], term[1]);
  var thatNumerator = this[0] * (term[1] / gcd);
  var termNumerator = term[0] * (this[1] / gcd);
  var commonDenominator = this[1] * (term[1] / gcd);
  return Fraction(thatNumerator + termNumerator, commonDenominator);
};

Fraction.prototype
.greatestCommonDivisor = function(a, b) {
  var small = Math.min(a, b);
  var large = Math.max(a, b);
  return this._orderedGcd(small, large);
};

Fraction.prototype
._orderedGcd = function(small, large) {
  var reminder = large % small;
  return reminder === 0 ? small : this._orderedGcd(reminder, small);
};
