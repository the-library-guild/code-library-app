# Overview

This project aims to provide a great experience for students and staff members interacting with services provided by the Treedome Library. We expect to measure that by the rate of new patrons we get monthly and the number of books borrowed during the official semester period.

The first interaction with the website would be done via a QR Code attached to every book in our catalog, which links to an individual page with additional information on the book and functionalities to borrow, pin, or return to/from the shelf and users are logged in using their @code.berlin accounts.

The front-end application of the library system is the scope of this project. Backoffice tasks are supported by an open-source backend called [Koha](https://koha-community.org/), maintained by the IT Management and Operations team, and available to the front-end application via a REST API. Therefore, the majority of the work for this project involves designing and implementing the user interfaces and developing an SDK for programmatically communicating with the REST API.

You can find the current codebase of the project on GitHub under [The Library Guild organization](https://github.com/the-library-guild).

# Technical Architecture

The app is going to be a standalone [Next.js](https://nextjs.org/) application powered by the open-source library management system [Koha](https://koha-community.org/).

**Frontend**: Next.js, TypeScript, NextAuth.

**API**: Koha.

# Features breakdown

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
