# Authenticate Backend Full-Stack Task


## Intro
This is a backend app for Bus Ticketing System. User can create and cancel a ticket. Admin can reset all tickets. User can check status of a seat. Can check all opened and closed tickets.

I've used NodeJS, MongoDB and ExpressJS as a tech stack. Also, used Postman, VS code and Studio 3T for implementation.


## Project Setup
1. Clone github repo.
2. Download necessary software such as NodeJS, Studio3T (MongoDB GUI), Postman and VS Code.
3. Open project in VS Code. And install all packages by running command `npm install`.
4. Run server by command `node server.js`.
5. Create a `bus` document in MongoDB in Bus DB. And copy iy's `_id`.
6. Open postman collection. You can run all APIs. I've already added the API request contract.


## Future Improvements
1. Can create a separate DB `Booking` to check & validate whether a seat is booked or not. Currently, it is done directly using `Ticket` DB as it was working fine. Hence, I kept it as an MVP.
2. Adding Payment Gateway
3. Adding user signup/login.
4. List of future and past travel of a user.