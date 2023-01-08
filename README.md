# Mileage Tracker App

Built an app that stores and tracks data submitted by the user. This will be used by myself and my coworkers as we use a state licensed vehicles and mileage has to be tracked. Prior to the app, we logged daily useage on physical papers which were often lost or forgotten about, only to have to backtrack at the end of the month the beginning and ending dates of the day(s) in question. Not anymore!

**Link to project:** https://juhjuhjuhgian-mileage-tracker-app-2022.onrender.com/

![image](https://user-images.githubusercontent.com/106912687/206623969-c564f199-0913-41e9-bad7-35d20b6c13cb.png)

## How It's Made:

**Tech used:** EJS, CSS, JavaScript, Node, MongoDB, Express

This was my first CRUD app that I created on my own. I used an EJS file to handle the dynamic content coming from the database and used a for loop to handle that data. The fields took a little time to figure out as far as tying that to the server.js file. The event listener on the client-side js file handled the click events for deleting and submitting of a new 'day log entry'. After getting the data provided by the client to successfully be sent to MongoDB, I kind of wanted to create a two-column deal but since the people using it would be on mobile mostly, I reverted back to just centering everything. The server.js file was a fun challenge, figuring out how to have the DB respond with data and having that data sent to the EJS file. I didn't end up needing an 'update' method in this app.

## Optimizations

Although not totally necessary, I could have added an update method if a part of an entry was wrong. The delete button kind of handled that, but it would be good practice. The other thing I wanted to implement and kind of looked into was storing the months in folders. Over time the log will either make the page extremely long or someone will have to manually click delete a bunch of times to old entries. A few other things would be to add a caption box for comments on a log and adding an 'other' option to the radio input for vehicle used, and the option would allow you to type in the input.

1/7/22 Update: I completed a way to update entries and bypassed the main.js and a fetch request because forms don't support PUT requests. I used a post method as the form makes it easier to send the data to the server side. It took longer than I thought it would as I also added mongoose to build a schema for my database and I had some problems hosting the site toward the end.

## Lessons Learned:

It was so fascinating to see how the information that was sent from the client side went to the server side, then went to the database and back, all to be spit back out in less than a second! Really gave me an appreciation for the internet and its massiveness/speediness.



