# Test Task README

## The Task
The goal of this project is to create a web application that allows users to enter a GitHub repository URL, load its issues using the GitHub API, and display them in three columns: ToDo, In Progress, and Done. Users should be able to drag and drop issues between columns to change their status. Additionally, the application should persist the current issue positions (column and order) between sessions for each repository.

## What I Did
I have developed a web application that fulfills the requirements specified in the task. Here's an overview of what my implementation includes:

- Users can enter a GitHub repository URL in the input field at the top of the page and press "Load" to fetch the repository's issues using the GitHub API.
- The application displays the fetched issues in three columns: ToDo (containing all new issues), In Progress (opened issues with assignees), and Done (closed issues).
- Users can drag-n-drop issues between columns to change their status. The application updates the issue positions dynamically.
- Current issue positions (column and order) are stored between sessions for each repository. This ensures that users can see their changes even when switching between repositories or refreshing the page.
- Users can visit the profile of the repository owner and access the repository itself through the links provided below the input field.

## What Technologies I Used
To implement this application, I utilized the following technologies:

- **React 18 with hooks**: Leveraging the latest version of React with functional components and hooks for state management and component lifecycle.
- **Typescript**: Ensuring type safety and enhancing code readability and maintainability.
- **UI library**: I chose [React Bootstrap](https://react-bootstrap.netlify.app) for its comprehensive set of components and ease of use in creating a visually appealing user interface.
- **State manager**: I opted for [Redux toolkit](https://redux-toolkit.js.org) to manage the application state efficiently, enabling seamless communication between components and persistence of issue positions.
- **Testing**: For testing, I used [Cypress tool](https://www.cypress.io) to ensure the reliability and stability of the application through unit and integration tests.
