This is the single page app where i implement all the javascript and ajax concept internally without using any frameworks.

Users can see all the questions which’ve already been posted on the page along with a count of the votes for the same. User can either give a ‘Thumbs up’ or a ‘Thumbs down’ for any question.

Before voting, the user has to ‘Login’. If a user tries to vote without logging in, he’s redirected to the login module. The login screen is a simple input module which asks for the Name and Email address of the user.

Once they’ve logged in, a session variable is created for the user with his/her name and displayed on the top right corner of the screen.

Users can Add/Ask a question to the community by typing into the text box at the top and clicking ‘Go’. This question will add to the existing questions list on the app and other users can vote on this

Only users who’ve logged in can post questions. If someone is trying to post a question without logging in, an alert is shown asking them to login and redirecting them to the login module

The page should not reload when the user ‘votes’ or ‘Asks a question’. The tasks need to happen asynchronously
