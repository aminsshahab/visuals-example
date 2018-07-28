# Trading Visualization Tool
A microservice that connects to a mock data endpoint to paint charts.

Starting this app will:
- Launch a local web server for the data feed on port 50000.
- Launch a local web server for the visualization client on port 50080.

---

## Setup

This application is containerized using Docker, so running it is quite simple.

- Ensure Docker is installed on your local system.

- Clone the repo: ```git clone git@github.com:tradery/visualization.git```

**Inside the app directory:**
- Launch the container through Docker: ```docker-compose up --build```

- Check the health of data server: ```curl -i localhost:3001/health```

- View the visualization tool in a browser: ```http://localhost:3000```

#### Contribution Best-Practices
- Add any new issue at any time, but please associate it with a person, labels, an appropriate milestone, and the Github project for this repository.
- Only add new issues to the (unsorted) Icebox.
- The project Backlog should include the most immediately on-desk work, sorted by priority.
- Each issue should move to the In Progress category of the project prior to actually starting work.
- Pull requests that close issues should be named something like, "Fixes #[issue number] - [issue name]"
- Merge requests should include all needed migrations, and updates to the README, such that anyone can build from master at anytime without any errors.
