# PCS

## Description
PCS is a project aimed at [briefly describe the purpose of the project].

## Deployment Instructions
To deploy the project, follow these steps:
1. Clone the repository:
   ```bash
   git clone https://github.com/MargaretOluwadare/PCS.git
   ```
2. Navigate to the project directory:
   ```bash
   cd PCS
   ```
3. Install the required dependencies:
   ```bash
   npm install
   ```
4. Start the deployment:
   ```bash
   npm start
   ```

## Setup Guide
1. Ensure you have the following installed on your machine:
   - Node.js (version >= 14)
   - npm (Node package manager)

2. Clone the repository using the command above.

3. Install dependencies and start the application using the deployment instructions.

## Environment Variables
You need to set the following environment variables for the application to function properly:
- `DATABASE_URL`: The connection string for the database.
- `PORT`: The port on which the application will run (default is 3000).
- `SECRET_KEY`: A key used for encrypting sensitive information.

Create a `.env` file in the root of the project and add the aforementioned variables.

## Development Workflow
1. Create a new branch for each feature or fix:
   ```bash
   git checkout -b feature/my-new-feature
   ```

2. Make changes and commit them:
   ```bash
   git commit -m "Add new feature"
   ```

3. Push the changes to the main repository:
   ```bash
   git push origin feature/my-new-feature
   ```

4. Create a pull request to merge your changes into the main branch.
