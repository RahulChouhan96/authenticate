1. Won't be able to deploy on EC2. Convey.
2. Share postman access.
3. Share Github repo.


Bus DB
ticket DB
user DB


Update - 
type - OPEN/CLOSE
If open, means user/bus is cancelling the ticket. Mark the ticket as OPEN again.
If close, means user booked a ticket. Create a doc with seat booked. Create user DB if not exist. Add their ID in ticket.

View ticket status - 




Can create a separate DB `Booking` to check & validate whether a seat is booked or not. Currently, it is done directly using `Ticket` DB as it was working fine. Hence, I kept it as an MVP.