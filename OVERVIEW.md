# Overview

The aim of this project is to reduce the amount of books getting lost and increase the amount of readers.

We want to achieve that by putting a QR-Code on every book, that links to a website where users can log in using their google code account.
On the websites books can be borrowed and returned.

# Technical Architecture

**Frontend**: React and next.js

**API**: GraphQL

**Backend**: TypeScript, MongoDB and Google Auth

# Objectives

## Already implemented
- Students can borrow books
- Students can return books
- Librarians can process the books and make them available for borrowing again.
- Users can search a list of books.
- Users can see if a book is currently available to be borrowed.

## Missing for Release
- Make it easier for developers to collaborate on the project.
-  Get access to the library.code.berlin URL
- Follow GDPR regulation
- Get permission to deploy on the CODE managed Google Cloud Platform suite 

## Features that could be implemented in the future
- User can extend the borrow of a book
- Librarians can approve the extension of a borrowed book
- Librarians can see overdue books
- Librarians can see statistics about the library usage
- User and Librarians can receive notifications about available books, to be returned books, and overdue books, via Email, or Slack.
- Admins can manage the roles of other library users
