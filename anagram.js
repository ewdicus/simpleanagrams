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

function isWord(word){
  var trie = trieForLetter(word[0]);
  return trie.contains(word);
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

exports.validate = function(query, anagram){
  // Remove spaces, sort by letters and compare
  var isAnagram = query.split('').sort().join('') === anagram.replace(/\s+/g, '').split('').sort().join('');
  if(isAnagram === false){
    console.log("Not anagram");
    return false;
  }

  // Check if all words in anagram are real
  var words = anagram.split(' ');
  for(var i = 0; i < words.length; ++i){
    if(isWord(words[i]) === false){
      console.log("Not a word: ", words[i]);
      return false;
    }
  }

  return true;
}
