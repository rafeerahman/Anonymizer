
# Team 17, Control Alt Elite

## Iteration 02 - Review & Retrospect

 * When: 2023-03-13
 * Where: Online (Discord)

## Process - Reflection

#### Q1. What worked well

One decision that worked well was establishing clear roles and responsibilities with Discord. This helped to minimize confusion and duplication of efforts, as each team member knew exactly what their responsibilities were and who to turn to for help with specific tasks. This approach also helped to build trust among team members, as everyone knew that they could rely on their colleagues to complete their assigned tasks. This can be seen in our project documentation, which clearly outlines the responsibilities of each team member and the expected timelines for completing their work.

Also, our team's willingness to learn and adapt to new techniques was a key factor in our success. This allowed us to stay up-to-date with the latest best practices and technologies, which helped us to deliver a high-quality product. For example, we were able to incorporate new features into our project by learning how to use new software and tools such as uwsgi, react-bootstrap, and Flask Restful framework. This flexibility and willingness to learn is evident in our project code, which uses modern techniques and tools to deliver a robust and scalable solution.

#### Q2. What did not work well

* Better planning: Overall our group managed time pretty well, but some of our work stacked up close to the deliverable deadline.  Due to multiple group members having several midterms and deadlines during the same period,  we had to leave the majority of testing for the backend and frontend integration until the day before the deadline, which made the situation a bit stressful as we were approaching the deadline. Additionally, we faced compatibility issues such as different Python versions, which required us to spend more time fixing it than we anticipated. We think that more planning could have helped to prevent this.

* Kanban (Github Issues Board) usage inconsistency: Some group members reported only using the kanban board intermittently. This could be partially due to some redundancy in group communication: our primary communication channel is our team discord server, so features discussed there first were not always reflected on the Github Project. We could try to remedy this by linking github issues in our discussions on the server and see if kanban use becomes more consistent.

* Planning mishap: Our team also misunderstood the timing of our first project demo, and we needed to use our group extension to schedule the demo and receive feedback. Going forward, we will be sure to read assignment and deliverable handouts clearly and confirm our partner's expectations regarding deliverable requirements.

#### Q3(a). Planned changes

**Consistent feedback/reviews to manage our work effectively:**

We plan to implement more frequent feedback and performance reviews to ensure that everyone on the team is meeting expectations and working effectively. By establishing clear guidelines for work quality and deadlines, and providing regular feedback on performance, we can ensure that everyone on the team is working at their best and delivering high-quality work. This will also help to identify any issues or challenges early on, and allow us to address them before they become bigger problems.

**Implementing a GitHub hook to discord:**
Another planned process-related change we are considering is setting up a GitHub hook on Discord. This would allow us to receive notifications for any changes or updates made to our project's GitHub repository, such as new pull requests, commits, or issues. By receiving these notifications in real-time, we can stay up-to-date on the latest developments and respond to any issues or requests in a timely manner. This can also help to improve collaboration and communication among team members, as everyone will be aware of any changes or updates made to the project.

**Usage of branches:**
After creating branches, specify a specific person to review the pull request and merge it to main early on. We plan to do this by pinging one of the team members on discord. This is in contrast with waiting until close to the deadline to merge many branches, or waiting on someone to review the pull request. 

Another planned process-related change we are considering is to use more fine-grained branches for functions instead of dividing the codebase into large components such as frontend and backend. While dividing the codebase into components can be helpful for organization and modularity, it can also make it difficult to track changes and manage conflicts, especially if multiple team members are working on the same component. By using more fine-grained branches for functions, we can isolate changes to specific functions or features, making it easier to review and merge changes. This can also help to minimize conflicts and reduce the risk of introducing bugs or issues into the codebase. Additionally, using fine-grained branches can help to improve collaboration among team members, as each team member can work on their own branch and merge their changes into the main branch when ready.

#### Q3(b). Integration & Next steps

Our integration involved mostly configuration between the backend and frontend to send and receive data from our REST api, as well as coordinating their respective docker containers and setting up supporting Github Actions workflows. We found the assignment to be a useful exercise in integrating distinct code bases. One aspect of the assignment that was not initially clear was whether we should resume working in the project repo, or the Assignment 2 repos. 

## Product - Review

#### Q4. How was your product demo?
 * We prepared for our demo by creating a 10-minute video for our partner that covers all the functionality of our project thus far. 
 * Our video details functionality of our REST API and our responsive web frontend, as well as our devops setup and GitHub Actions workflows.
 * Our partner accepted the features, but also requested minor changes to our backend and the "playground" portion of our frontend. Our partner introduced a stretch goal as well, suggesting we try identifying people's names automatically with our API.
 * We think this demo was very valuable, and highlighted areas to focus on for our next demo. David's feedback was concise and actionable, so we look forward to improving the project to his specifications. It was interesting to see how his feedback pointed to possible blind spots we may not have focused on.

