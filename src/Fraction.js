function Fraction(numerator, denominator) {
  this[0] = numerator;
  this[1] = denominator;
}

Fraction.prototype
.add = function(term) {
  var gcd = this.greatestCommonDivisor(this[1], term[1]);
  var thatNumerator = this[0] * (term[1] / gcd);
  var termNumerator = term[0] * (this[1] / gcd);
  var commonDenominator = this[1] * (term[1] / gcd);
  return new Fraction(thatNumerator + termNumerator, commonDenominator);
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

Fraction.prototype
.multiply = function(factor) {
  var gcd1 = this.greatestCommonDivisor(this[0], factor[1]);
  var gcd2 = this.greatestCommonDivisor(factor[0], this[1]);
  var numerator = (this[0] / gcd1) * (factor[0] / gcd2);
  var denominator = (factor[1] / gcd1) * (this[1] / gcd2);
  return new Fraction(numerator, denominator);
};

Fraction.prototype
.min = function(other) {
  return this.lessThan(other) ? this : other;
};

Fraction.prototype
.lessThan = function(other) {
  var negative = new Fraction(-other[0], other[1]);
  var difference = this.add(negative);
  return difference[0] < 0;
};
