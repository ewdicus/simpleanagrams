# Setup

Run `npm install` and `npm start`.

To use nodemon to restart when changes are made run `npm run-script dev`.

Some simple tests can be ran with `npm test`.

# Issues and Limitations

I've limited the maximum query size to 12 letters (arbitrarily), but even that
can take a little while or timeout on a platform like Heroku.

I've added a 1 second timeout to the Ajax request so it doesn't wait forever.

A smarter algorithm could make this less of an issue, but at some stage you're
still searching for a needle in a haystack.

Additionally I could store anagrams of words as they're generated for later
lookup, or pre-process words in a worker.

# Licenses

MIT License

## English Open Word List

http://dreamsteep.com/projects/the-english-open-word-list.html

UK Advanced Cryptics Dictionary Licensing Information:

Copyright © J Ross Beresford 1993-1999. All Rights Reserved. The following restriction is placed on the use of this publication: if the UK Advanced Cryptics Dictionary is used in a software package or redistributed in any form, the copyright notice must be prominently displayed and the text of this document must be included verbatim.

There are no other restrictions: I would like to see the list distributed as widely as possible.
