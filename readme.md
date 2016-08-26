How to reproduce this issue:

Run the app on a android device and perform the following steps:
```
Click on the Go to second screen button
Suspend the app
Resume the app (now you will see the block screen)
Suspend the app
Resume the app (you will see the second screen again)
Press the back button (android button, now you will see the home screen)
Suspend the app
Resume the app (you will see the block screen)
Suspend the app
Resume the app (you will see the home screen)
Press the back button

!! Now you will be stuck at an empty page and the routing stops working.
```
