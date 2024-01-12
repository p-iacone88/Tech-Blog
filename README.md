# Tech Blog CMS

## Overview

This project is a CMS-style blog site built following the Model-View-Controller (MVC) paradigm. The goal is to provide developers with a platform to publish their articles, blog posts, and opinions. The application uses Handlebars.js for templating, Sequelize as the ORM, and the express-session npm package for authentication.
User Story

As a developer who writes about tech, I want a CMS-style blog site so that I can publish articles, blog posts, and my thoughts and opinions.
Acceptance Criteria

    Homepage:
        Upon visiting the site, users see the homepage with existing blog posts (if any), navigation links for the homepage and the dashboard, and the option to log in.

    Navigation:
        Clicking on the homepage option takes users to the homepage.
        Clicking on other navigation links prompts users to sign up or sign in.

    Sign Up:
        Users can sign up by providing a username and password.
        After signing up, user credentials are saved, and the user is logged into the site.

    Sign In:
        Returning users can sign in with their username and password.
        Signed-in users see navigation links for the homepage, dashboard, and the option to log out.

    Viewing Blog Posts:
        Clicking on the homepage option displays existing blog posts with titles and creation dates.
        Clicking on a blog post shows the post title, contents, creator’s username, and date created, with the option to leave a comment.

    Adding Comments:
        Signed-in users can leave comments on existing blog posts.
        Submitted comments are saved, and the post is updated to display the comment, the comment creator’s username, and the date created.

    Dashboard:
        Clicking on the dashboard option takes users to their dashboard, showing existing blog posts and the option to add a new post.
        Users can add a new blog post by providing a title and contents.

    Updating and Deleting Posts:
        Users can update or delete their existing posts from the dashboard.

    Log Out:
        Clicking on the logout option in the navigation signs the user out.

    Session Handling:
        Users idle for more than a set time are prompted to log in again before adding, updating, or deleting posts.

## To run the application:

    Ensure your folder structure follows the MVC paradigm.
    Use the express-handlebars package for views, MySQL2 and Sequelize for the database, and express-session for authentication.
    Utilize the dotenv package for environment variables, bcrypt for password hashing, and connect-session-sequelize for session storage.
