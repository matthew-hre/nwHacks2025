# nwHacks 2025

[![built with nix](https://builtwithnix.org/badge.svg)](https://builtwithnix.org)

## Rough Brainstorming

We want people to read more. We want to create a platform to encourage more
people to read books. Current platforms like Goodreads are less about personal
growth and achievement, and more about artificial ratings and metrics. Our
platform aims to give readers a fun and interactive way to log their favorite
books, and showcase their literary journeys.

## User Flow

Roughly, the dream user flow for our application will be:

1. User signs up / into their account.
2. User is presented with their bookshelf, which is a visual representation of
   their reading journey.
3. User is able to add a new book to their shelf, either through barcode
   scanning or by title.
4. User can now see their new book on their shelf.
5. The new book is now counted towards the user's "rewards", and the user can
   redeem rewards for decorations and skins for their bookshelf.

- Rewards could be distributed on a weekly/biweekly/monthly basis
- Decorations could range from trinkets to display on the shelf to different
  themes of the shelf itself (wood type, background, "gothic", whatever)

## Additional (absolute longshot) Features

Some extra functionality that could be super cool:

- Users can add "friends" and see their shelves / status when they finish a new
  book.
- Users can have "readlists" of books they want to read (would show up as ghost
  books)
- Users can have an interaction to share their shelf directly to Instagram
- Users can click their cat / pet / personal librarian / some anthropomorphic
  nightmare creature that can use an LLM to recommend books, like texting a
  friend.

## Rough Timeline

- [x] Set up initial project in Next
- [ ] Create routes for all major pages
  - [x] Log In
  - [x] Sign Up
  - [x] Bookshelf (home)
  - [x] Add Book
  - [ ] Rewards Page
  - [ ] Shop Page
- [x] Hook up DB (Firebase / Supabase)
- [x] Set up basic auth
- [ ] Brainstorm different bookshelf graphic ideas
- [x] Implement scanning w/ ISBN API
- [ ] Add scanned books to user's DB
- [ ] Display / render books onto the shelf
  - [ ] Display / render decorations onto the shelf
- [ ] Implement rewards page
  - [ ] Visual design
  - [ ] Functionally
- [ ] Implement shop
  - [ ] Display a collection(s) of items for purchase
  - [ ] Design a wide array of different assets that can be purchased
