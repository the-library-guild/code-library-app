# Overview

This project aims to provide a great experience for students and staff members interacting with services provided by the Treedome Library. We expect to measure that by the rate of new patrons we get monthly and the number of books borrowed during the official semester period.

The first interaction with the website would be done via a QR Code attached to every book in our catalog, which links to an individual page with additional information on the book and functionalities to borrow, pin, or return to/from the shelf and users are logged in using their @code.berlin accounts.

The front-end application of the library system is the scope of this project. Backoffice tasks are supported by an open-source backend called [Koha](https://koha-community.org/), maintained by the IT Management and Operations team, and available to the front-end application via a REST API. Therefore, the majority of the work for this project involves designing and implementing the user interfaces and developing an SDK for programmatically communicating with the REST API.

# Project Phase and Focus

There's a previous version of the application available on GitHub under [The Library Guild organization](https://github.com/the-library-guild). The system is composed of three main components: frontend, backend and an authorization service. Although we are now relying on an external backend service, we still plan to reuse the frontend application project as the foundation of our new web UI.

The design assets are ready and documented in our [Brand Book](https://www.canva.com/design/DAFR9REC0xY/LMppqKn_VtEPoeLWLTPDog/edit) but the interfaces are still to be created, validated and implemented. Our plan is to develop each screen at a time, starting after the integration with Koha is sorted. Therefore, our main priority on the list is to get access to Koha's admin panel and make the integration between the new web UI and its backend via Google Auth.

# Roadmap

- 1st half March, Authentication workflow using Google Auth.
- 1st half April, **Must have** list of features is available for internal testing.
- Mid April, we have tested the QR code connection between physical books and our website.
- 1st week of May, beta release to a select group of students.

# Technical Architecture

The app is going to be a standalone [Next.js](https://nextjs.org/) application powered by the open-source library management system [Koha](https://koha-community.org/).

**Frontend**: Next.js, TypeScript, NextAuth.

**API**: Koha.

# Features breakdown

## Must have
- Students can borrow books
- Students can return books
- Students can see books they've borrowed
- Students can extend the rental period of their borrowed books.
- Students can search our full catalog of books by keywords such as title, author and category.

## Nice to have
- Students can create private reading lists.
- Students can reserve books borrowed at the moment.
- Students can share reading lists publicly.
- Students can search the catalog by category.
