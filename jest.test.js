test('common marcher',function(){
  expect(2+2).toBe(4);
  expect(2+2).not.toBe(6);
});

test ('to be true or false', function() {
  expect(1).toBeTruthy();
  expect(0).toBeFalsy();
});

test('number',function(){
  expect(4).toBeGreaterThan(3);
  expect(2).toBeLessThan(3);
});

test('object', function() {
  var data = {one:1};
  data.two = 2;
  expect(data).toEqual({one:1,two:2});
});

