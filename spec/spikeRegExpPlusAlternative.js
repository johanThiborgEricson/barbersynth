describe("Regex plus spike", function() {
  it("plus makes alternatives or zero possible", function() {
    var re = /(,+|'*)/;
    expect(re.exec(",")[1]).toEqual(",");
    expect(re.exec(",,")[1]).toEqual(",,");
    expect(re.exec("'")[1]).toEqual("'");
    expect(re.exec("''")[1]).toEqual("''");
    expect(re.exec("")[1]).toEqual("");
    
    re = /((?:es)+|(?:is)*)/;
    expect(re.exec("es")[1]).toEqual("es");
    expect(re.exec("eses")[1]).toEqual("eses");
    expect(re.exec("is")[1]).toEqual("is");
    expect(re.exec("isis")[1]).toEqual("isis");
    expect(re.exec("")[1]).toEqual("");
  });
  
});
