# Frontend

## Local Hosting Instructions - for development and debugging

### Getting the Repository
To begin working with this repository, make sure you have Git installed and set up: [**Git installation**](https://www.atlassian.com/git/tutorials/install-git). Mac OS X might additionally need [**homebrew**](https://brew.sh/). Then in **macOS terminal** or **Windows command prompt** copy and paste the following under your desired directory:
```
git clone https://github.com/CSC492-Send-Foodz/Frontend
```
Press Enter and you now have a git-versioned copy of the repository source code in your working directory.
Next, install and set up the **current version of Node.js** (14.7.0 + npm 6.14.7) for your OS: [**macOS with Homebrew**](https://nodejs.org/en/download/package-manager/#macos); [**Windows or macOS without Homebrew**](https://nodejs.org/en/download/). 

### Working with Git
There are many resources for developing with version control with Git. For starters, to understand the concepts, please visit [Git's documentation](https://git-scm.com/book/en/v2/Getting-Started-About-Version-Control). If you prefer, you can fully use Git's **command line instructions** in a terminal to follow clean version control guidelines. If you're just starting out, however, I recommend using a **GUI** such as [**GitKraken**](https://www.gitkraken.com/) or 
[**GitHub Desktop**](https://desktop.github.com/) because they visually provide clarity when managing multiple branches, blames, history, and commits.

### Running the App Locally
To host the dashboards locally, open `Frontend/app` with your preferred IDE. Then, in your IDE's terminal execute
```
npm install && npm run serve
``` 
This command will first install required packages locally for you and then deploys the app at `http://localhost:[PORT]/` locally or `http://[IP];[PORT]/` publicly. To view the app, just navigate to one of the two URLs. You might find it useful for debugging to get the [**Vue devtools** extension for Google Chrome or Firefox](https://github.com/vuejs/vue-devtools).

**NB**: If you enconter an error after `npm run serve` stating issues with missing babel modules, execute 
```
npm install --save @babel/compat-data && npm update --depth 5 @babel/preset-env
``` 
in your IDE's terminal followed by `npm run serve`.
