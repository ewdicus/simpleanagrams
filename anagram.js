'use strict';

// Trie data structure we use for searching
var dtrie = require('dtrie');

// And the trie built with the English Open Word List
// (After I added 'a' as a word)
var trie = dtrie.loadFromFile('./static/word_lists/EOWL.csv');

// Permutations generator
var combinatorics = require('js-combinatorics');

// Check if a word is valid
function isWord(word){
  return trie.contains(word);
}

// In-place Durstenfeld shuffle algorithm
// http://stackoverflow.com/a/12646864
function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

function buildAnagram(trie, word, letters){
  // console.log("\tCurrent word: ",  word);
  if(trie.isTerminal()){
    return word;
  }else if(letters.length == 0){
    return; // Didn't find an anagram down this path
  }
  var letter = letters.pop();
  var nextTrie = trie.getChild(letter);
  if(nextTrie){
    // console.log("\t\texploring: ", letter);
    return buildAnagram(nextTrie, word + letter, letters);
  }
}

// Get an anagram for the given word. This will return one anagram. It will
// randomize the query letter order each time to help generate new anagrams.
exports.for = function(query){

  // Shuffle so we start with different permutations each time
  var shuffledWord = shuffleArray(query.replace(/\s+/g, '').split(''));
  var permutationGenerator = combinatorics.permutation(shuffledWord);

  // Check permutations until we have a set of anagrams, or we run out of
  // permutations.
  var next = permutationGenerator.next();
  while(next !== undefined){
    var permutation = next;
    next = permutationGenerator.next();

    var words = [];

    // console.log("permutation: ", permutation);
    while(permutation.length > 0){

      // // Take each letter in the permutation and pop it off
      // var letter = permutation.pop();

      var result = buildAnagram(trie, '', permutation);

      // If we have a valid word, add it
      if(result && result !== query){
        words.push(result);
        // console.log("\tfound: ", words);
      }else{
        // Otherwise, this permutation isn't going to work - so we'll clear
        // the words, and break out of this permutation
        // console.log("\tNOPE");
        words = [];
        break;
      }
    }

    // If we have words, and we've used all the permutations letters, this is a
    // valid anagram
    if(words.length){
      return words.join(' ');
    }
  }

  // We didn't find any anagrams that used all the letters
  return '';
};

// Validate that an anagram of a query is correct. This includes basic letter
// checking and making sure that the anagram contains only valid words.
exports.validate = function(query, anagram){

  // Remove spaces, sort by letters and compare
  var sortedQuery = query.replace(/\s+/g, '').split('').sort().join('');
  var sortedAnagram = anagram.replace(/\s+/g, '').split('').sort().join('');
  if(sortedQuery !== sortedAnagram){
    return {'valid':false, 'reason':'Letters do not match'};
  }

  // Check if all words in anagram are real
  var words = anagram.split(' ');
  for(var i = 0; i < words.length; ++i){
    if(isWord(words[i]) === false){
      return {'valid':false, 'reason':'Invalid word: ' + words[i]};
    }
  }

  return {'valid':true};
}
