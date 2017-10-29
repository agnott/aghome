# aghome
Home screen dashboard for the AG's.

### Environment Setup
1. Install [nvm](https://github.com/creationix/nvm)
2. Install correct Node version with nvm (8.8+)
  - `nvm install 8.8`
3. Clone the repository
  - `git clone git@github.com:agnott/aghome.git`
4. Install dependencies
  - `npm install`
5. Create a `.env` file in the project root and populate with the following information
  ```
    API_PORT=[8001]
    API_VERSION=[0.0.1]  # This may change

    DEV_PORT=[8000]
  ```

### Contributing Basics
1. Check out master
  - `git checkout master`
2. Pull most recent code from GitHub
  - `git pull`
3. Check out a new branch
  - `git checkout -b [name of branch]`
4. Make your local code changes
5. Check the status of your changes and make sure they match up with what you plan to see
  - `git status`
6. Add files to the commit index
  - `git add [file(s)]`
  - Make sure to not commit purposely ignored files (e.g. `.env`)
  - Use `git reset [file(s)]` if you accidentally added files to the commit index
7. Commit your files with a useful message
  - `git commit -m "[message]"`
  - Some useful prefixes for labeling commits can be found [here](https://github.com/quantopian/zipline/issues/96)
8. Push your commits to GitHub
  - `git push origin [name of branch]`
9. Navigate to the repository's webpage and open a Pull Request for your branch
  - You will now be able to see all of the code you've changed in one place
10. Make sure the code passes all tests and there are no merge conflicts
  - If changes are necessary, repeat from step 4
11. Make sure somebody looks over your code before you merge, ideally by asking for a review

### Running Locally
#### API Server
To start the local server, run `npm run server`. This will run the server from `http://localhost:[API_PORT]` and make API endpoints available from the base `http://localhost:[API_PORT]/api/*`. This server will automatically restart when any changes are made inside the `/api/` directory.

#### Dashboard Server
To start the local dashboard server (so you can use the dashboard and test changes), run `npm start`. This will make the dashboard available at `http://localhost:[DEV_PORT]`. This will automatically refresh when code changes are made in the `/src/` directory. Console logs and errors will be displayed in the [Google Chrome DevTools](https://developer.chrome.com/devtools).
