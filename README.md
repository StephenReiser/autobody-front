### Summary

This is the front end of the autobody app. For a quick an easy deployment, this was built with create-react-app. For state management it uses Context. 

There are three mechanics - all are created on the front end as the assumption is they are always working. A user can log a new customer by clicking on 'Add New Customer' in the nav bar. This opens up a form for the user to create a new customer - all fields are required. The user is then able to either select "First available" or pick a specific mechanic. Selecting first available will add the customer to the mechanic who has the shortest queue. If a specific mechanic is selected, then the customer will be added to the end of that mechanic's queue.

All customers are also added to the 'waiting room' where they are listed in order of arival. They can be deleted here if the user chooses. Additionally, by clicking on 'Details' a window opens to provide full details for the customer, including personal info, vehicle info, and time of arrival.

Each mechanic has the ability to show/hide their queue by clicking on the 'Hide/Show Queue' button. Additionally, each mechanic can update their queue by Starting work - which pushes their first customer from their queue into their garage. This changes the mechanic's status to busy, shows who they are working with, updates their wait time, and updates their queue as well as the waiting room's queue. Once the mechanic finishes their work, they can click on 'Finish Work' which updates their status to 'Free' as well as updates their wait time. To start work for another customer they can then click on 'Start Work'.

All changes to queues are added to the database. However it is assumed that when the app is closed, all customers currently with a mechanic will be completed and removed from the queue and db. However anyone still in queue/the waiting room will remain.



## Setup Instructions
Navigate to the autbody-front directory in terminal and type 'npm i' to install the dependencies and then type npm start to launch it on localhost:3000

If your backend is not running on port 3003, please update line 37 from App.js to your correct port

## Live URL

Live link to a working version is: https://autobody-front.herokuapp.com/