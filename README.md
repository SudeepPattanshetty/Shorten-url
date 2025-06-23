**Shorten-url**

A URL Shortener web application built with Node.js, Express, MongoDB, and EJS. It allows users to generate short, shareable links from long URLs and redirects users to the original link when the short URL is accessed. The application uses server-side rendering and provides a clean, minimal interface for user interaction.

🚀**Features**
 
 Generate short, unique URLs
 
 Redirect to original URLs from short links
 
 Server-side rendering with EJS templates
 
 Clean and responsive user interface

 URL validation and error handling

🛠️**Tech Stack**

Backend: Node.js, Express.js

Frontend: HTML, CSS, EJS

Database: MongoDB with Mongoose

Other Tools: nanoid or UUID for generating short codes

**How It Works**

The user enters a long URL.

A unique short code is generated and stored in the database along with the original URL.

The user receives a shortened version of the URL.

When someone accesses the short URL, the server looks it up and redirects to the original URL.
