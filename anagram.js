'use strict';

// Trie data structure we use for searching
var dtrie = require('dtrie');

var tries = {};
function trieForLetter(letter){
  if(letter in tries){
    return tries[letter];
  }
  var trie = dtrie.loadFromFile('./static/word_lists/' + letter.toUpperCase() + ' Words.csv');
  tries[letter] = trie;
  return trie;
}

exports.for = function() {
  var hrstart = process.hrtime();
  var a_trie = trieForLetter('a');
  var hrend = process.hrtime(hrstart);
  console.log(hrend);

  hrstart = process.hrtime();
  a_trie = trieForLetter('a');
  hrend = process.hrtime(hrstart);
  console.log(hrend);

  var start = a_trie.getChild('a');
  console.log(start.letters);
  console.log(start.hasChild('b'));
  console.log(start.getChild('b').isTerminal())
};

exports.validate = function(){
  return true; // TODO
}
