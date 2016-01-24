'use strict';

// Trie data structure we use for searching
var dtrie = require('dtrie');

// Get the trie for the given letter. Load from disk if we haven't already built
// it
var tries = {};
function trieForLetter(letter){
  if(letter in tries){
    return tries[letter];
  }
  var trie = dtrie.loadFromFile('./static/word_lists/' + letter.toUpperCase() + ' Words.csv');
  tries[letter] = trie;
  return trie;
}

// Check if a word is valid
function isWord(word){
  var trie = trieForLetter(word[0]);
  return trie.contains(word);
}

// Get an anagram for the given word. This will return one anagram. It will
// randomize the search each time to help generate new anagrams.
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

// Validate that an anagram of a query is correct. This includes basic letter
// checking and making sure that the anagram contains only valid words.
exports.validate = function(query, anagram){
  // Remove spaces, sort by letters and compare
  var isAnagram = query.split('').sort().join('') === anagram.replace(/\s+/g, '').split('').sort().join('');
  if(isAnagram === false){
    return {'valid':false, 'reason':'Letters do not match'};
  }

  // Check if all words in anagram are real
  var words = anagram.split(' ');
  for(var i = 0; i < words.length; ++i){
    if(isWord(words[i]) === false){
      return {'valid':false, 'reason':'Invalid word: ' + words[i]};
    }
  }

  return true;
}
