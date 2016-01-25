'use strict';

var anagram = require('../anagram.js');
const assert = require('assert');


describe('validate', function () {
  it('should validate a valid anagram', function (done) {
      assert.deepEqual(anagram.validate('panama', 'map a an'),
        {'valid':true});
    done();
  });

  it('should not validate an invalid anagram with incorrect letters', function (done) {
      assert.deepEqual(anagram.validate('panama', 'mas a an'),
        {'valid':false, 'reason':'Letters do not match'});
    done();
  });

  it('should not validate an invalid anagram with incorrect words', function (done) {
      assert.deepEqual(anagram.validate('panama', 'map aan'),
        {'valid':false, 'reason':'Invalid word: aan'});
    done();
  });
});

describe('generate', function () {
  it('should generate a valid anagram', function (done) {
    var result = anagram.for('panama');
    assert(result);
    assert.deepEqual(anagram.validate('panama', result),
      {'valid':true});
    done();
  });
});
