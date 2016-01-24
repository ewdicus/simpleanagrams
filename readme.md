# General
* Simple webserver
  * index: main page
  * generate: get an anagram
  * validate: validate that an anagram is correct

* Possibly
  * anagram (get): show a previously created anagram
  * anagram (post): edit a previously created anagram (validated)

# Anagram Process
* Randomize the string
* Start with the first letter and walk down the list until we hit a word end
* Start with the next letter and repeat
* If we don't find a word end, try the next character
* If we run out of characters, grab the longest word and break it back into
  "left over" characters. Try again with a character from that.
