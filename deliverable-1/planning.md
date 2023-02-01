# YOUR PRODUCT/TEAM NAME
> _Note:_ This document will evolve throughout your project. You commit regularly to this file while working on the project (especially edits/additions/deletions to the _Highlights_ section). 
 > **This document will serve as a master plan between your team, your partner and your TA.**

## Product Details
 
#### Q1: What is the product?

 > Short (1 - 2 min' read)
 * Start with a single sentence, high-level description of the product.
 * Be clear - Describe the problem you are solving in simple terms.
 * Specify if you have a partner and who they are.
 * Be concrete. For example:
    * What are you planning to build? Is it a website, mobile app, browser extension, command-line app, etc.?      
    * When describing the problem/need, give concrete examples of common use cases.
    * Assume your the reader knows nothing about the partner or the problem domain and provide the necessary context. 
 * Focus on *what* your product does, and avoid discussing *how* you're going to implement it.      
   For example: This is not the time or the place to talk about which programming language and/or framework you are planning to use.
 * **Feel free (and very much encouraged) to include useful diagrams, mock-ups and/or links**.

The product is a robust and straightforward rest API that allows university faculty to efficiently anonymize sensitive data, e.g. student peer reviews. The problem that many faculty members face is the handling of this data: often, it needs to be processed in large quantities and stored anonymously. Manually anonymizing this data is not only needlessly laborious, but it is also a privacy concern, because students expect that their answers are kept confidential.

Our product will facilitate the anonymization of this data by way of a rest API. This will provide a flexible interface for faculty to use our product, regardless of what technology they are using. Our product will be able to anonymize a list of text fields, given the sensitive data (names), and the terms to replace them with. Our product will also have the capability to anonymize spreadsheets via csv upload, with a target column and the value to replace the sensitive data with.

#### Q2: Who are your target users?

  > Short (1 - 2 min' read max)
 * Be specific (e.g. a 'a third-year university student studying Computer Science' and not 'a student')
 * **Feel free to use personas. You can create your personas as part of this Markdown file, or add a link to an external site (for example, [Xtensio](https://xtensio.com/user-persona/)).**

Partner Pete: 26 Year old Manager working at small software Company with a Bachelor's in Computer Science. He tends to take on a lot so he generally ha a busy schedule, partially because of the small size of his team. However, as manager he has plenty of experience working and communicating with different people. 

Scenario: His company has a small staff, so he uses the CSC301 partnership program in order to get an important project done for the company. He wants to leave a testimonial where he discusses the team he was partenered with and his experience with the partnership program. However, he is very busy and does not have the time to edit out or write around sensitive information such as teammate and course staff names.  

Teamwork Tom: Tom is a 21 year old Computer Science student in his third year pursuing a degree at the University of Toronto. he is a hard worker, and having worked in many group projects before, he will not hesitate to communicate any grivances he has with teammates that are difficult to work with or whom do not pull their weight. However, he will also take the time to leave positive feedback for teammates he finds success with. 

Scenario: Tom has just finished his CSC301 Partnership Program project with a small team of 6. He wants to be able to leave an honest peer evaluation regarding the good and bad experiences he has had with his group. However, he is taking many CS courses this semester and does not have the time to look up the appropriate regulations within the course regarding the anonymity of his teammates in peer reviews. Ideally he would just write what he thinks, and submit it. 

 - University professors
 - University IT professionals
 - University software developers

#### Q3: Why would your users choose your product? What are they using today to solve their problem/need?

> Short (1 - 2 min' read max)
 * We want you to "connect the dots" for us - Why does your product (as described in your answer to Q1) fits the needs of your users (as described in your answer to Q2)?
 * Explain the benefits of your product explicitly & clearly. For example:
    * Save users time (how and how much?)
    * Allow users to discover new information (which information? And, why couldn't they discover it before?)
    * Provide users with more accurate and/or informative data (what kind of data? Why is it useful to them?)
    * Does this application exist in another form? If so, how does your differ and provide value to the users?
    * How does this align with your partner's organization's values/mission/mandate?

TODO: contact David and ask about how future users are solving this currently

Users will choose our product because:

- It guarantees that the data being anonymized is not stored anywhere. This is important because it allows our user’s and their customers to be assured about the confidentiality their information.
- It saves time. Instead of users manually finding personally identifiable data, our product will automate this process and apply anonymization techniques to the types they specify.
- It supports several formats of data, including text, JSON data, CSV files, and potentially PDFs. This also gives users the ability to indicate whether they want a specific column, or category of text to be anonymized.
- Our API’s will be flexible and support a variety of anonymization techniques, which can be indicated by the user in the request body. This provides our users with a diverse approach towards how they might want to anonymize their data. For example, they may choose “Data Masking”, which can replace the data they want with alternative characters.
- *******Maybe:*******  It provides a higher level of automation as it gives users the option to pick our algorithm that uses AI/NLP to find personally identifiable information, and anonymize it.

In the present, most people are designing their own code to handle anonymizing their unique datasets using the following methods:

- Data Masking: The process of altering values to hide the original data. Altering techniques include character shuffling, encryption, and character substitution.
- Pseudonymization: Replacing private data with pseudonyms, also known as fake identifiers. For example, a common pseudonym is John Smith, which can be used to replace someone's first and last name.
- Generalization: Making the data less specific by removing or replacing parts of the data, but keeping the rest. For example, we can remove the house number in an address, but keep the road name.
- Data Swapping: Shuffling the dataset by rearranging rows or columns.
- Perturbation: Randomly modifying sensitive data, such as by rounding or multiplying numerical values or replacing words with synonyms.
- Synthetic Data: Replacing sensitive data with data that resembles the original.
- Encryption: Using algorithms to make data uninterpretable. However, encryption algorithms can be decrypted into the original data.

**Example: Original Data**
| lastName    | firstName | age |  SIN        | creditCard           | 
| ----------- | --------- | --- | ----------- | -------------------- |
| Rahman      | Rafee     | 20  | 999888777   | 1234 4567 8910 1112  |

**Example: New Data (name is pseudonymized, age is generalized, SIN and creditCard are masked)**
| lastName    | firstName | age |  SIN        | creditCard           | 
| ----------- | --------- | --- | ----------- | -------------------- |
| Smith      | John     | < 30  | @!*^#@$!(  | XXXX XXXX XXXX XXXX  |

There are some libraries out there that people may use to anonymize their data such as pynonymizer and Faker. The pynonimizer library only supports pseudonymization by using the Faker library to generate random pseudonyms for attributes like e-mails, names, and more. However, institutions cannot rely on libraries because they must follow strict GDPR regulations, and similarly may not trust third-party software.  

By providing flexible anonymization methods, we will support our project partner’s goal of creating an automated and seamless process of anonymizing data following GDPR guidelines for organizational needs.

#### Q4: What are the user stories that make up the Minumum Viable Product (MVP)?

 * At least 5 user stories concerning the main features of the application - note that this can broken down further
 * You must follow proper user story format (as taught in lecture) ```As a <user of the app>, I want to <do something in the app> in order to <accomplish some goal>```
 * User stories must contain acceptance criteria. Examples of user stories with different formats can be found here: https://www.justinmind.com/blog/user-story-examples/. **It is important that you provide a link to an artifact containing your user stories**.
 * If you have a partner, these must be reviewed and accepted by them. You need to include the evidence of partner approval (e.g., screenshot from email) or at least communication to the partner (e.g., email you sent)

- As a university software developer, I want to use an endpoint to anonymize a batch of sensitive student responses, in order to speed up the review process and preserve privacy.

- As a university faculty member, I want to be able to anonymize columns of a spreadsheet, in order to make the data in it not sensitive anymore.

#### User Story 1:

**As a** PhD student conducting a research experiment about improving student’s mental health,

**I want to** anonymize a spreadsheet containing personally identifiable data such as survey respondent names, student numbers, and e-mails

**so that** I can provide this spreadsheet to my research assistants to conduct analyses on the data.

 **Acceptance Criteria:**

**Given** that the PhD student wants to anonymize some data,

**When** they send a request to our API route with the CSV, names of columns to anonymize, and the anonymization technique name,

**Then**
1.  On response code 200, a CSV with the anonymized data should be returned. It must match the columns that they wanted anonymized and the anonymization technique they specified.
2.  On response code 400, a message stating “Bad Request” is returned.
3.  On response code 404, a message stating “Server Error” is returned.

#### User Story 2: 
 **As a** Partner that will own and distribute the project.
 
 **I want to** posses an unbreakable and efficient program that will annonymize the data provided for the client.
 
 **so that** I can use for my own work and provide to the public for their own use.
 
**Acceptance Criteria:** The project annonymizes the provided data, given every edge case, in a elegant and efficient manner.

**Given** that the partner is intrested in possesing such a project,

**When** the project is not up to their standard,

**Then**
1. The partner and the team will meet for the issues to be communicated
2. The team will solve the issues and test the program
3. The team will present the new solution to the partner for review

TODO: add more / break these up

#### Q5: Have you decided on how you will build it? Share what you know now or tell us the options you are considering.

> Short (1-2 min' read max)
 * What is the technology stack? Specify languages, frameworks, libraries, PaaS products or tools to be used or being considered. 
 * How will you deploy the application?
 * Describe the architecture - what are the high level components or patterns you will use? Diagrams are useful here. 
 * Will you be using third party applications or APIs? If so, what are they?

We plan to build this API primarily using Flask, a python framework for web backends. Since this is a rest API, we plan to specifically use the flask-restful library as well to expedite development and focus more on processing the data.
Any future frontend implementations will likely be done in React.
We plan to deploy our application on a hosting service with a free tier, such as Heroku or Azure. This could be done directly, or within a docker container.
As for product architecture, we plan on having multiple endpoints to our API, with each having one or more methods to interact with it (GET, POST, etc). 
We do not expect to use any third party applications or APIs, assuming python libraries do not count as third party.


----
## Intellectual Property Confidentiality Agreement 
> Note this section is **not marked** but must be completed briefly if you have a partner. If you have any questions, please ask on Piazza.
>  
**By default, you own any work that you do as part of your coursework.** However, some partners may want you to keep the project confidential after the course is complete. As part of your first deliverable, you should discuss and agree upon an option with your partner. Examples include:
1. You can share the software and the code freely with anyone with or without a license, regardless of domain, for any use.
2. You can upload the code to GitHub or other similar publicly available domains.
3. You will only share the code under an open-source license with the partner but agree to not distribute it in any way to any other entity or individual. 
4. You will share the code under an open-source license and distribute it as you wish but only the partner can access the system deployed during the course.
5. You will only reference the work you did in your resume, interviews, etc. You agree to not share the code or software in any capacity with anyone unless your partner has agreed to it.

**Your partner cannot ask you to sign any legal agreements or documents pertaining to non-disclosure, confidentiality, IP ownership, etc.**

Briefly describe which option you have agreed to.

Our group has agreed to option two.

----

## Teamwork Details

#### Q6: Have you met with your team?

Do a team-building activity in-person or online. This can be playing an online game, meeting for bubble tea, lunch, or any other activity you all enjoy.
* Get to know each other on a more personal level.
* Provide a few sentences on what you did and share a picture or other evidence of your team building activity.
* Share at least three fun facts from members of you team (total not 3 for each member).

Our team met up last weekend to do an escape room at YorkVille called E-Exit, followed by dinner at a nearby korean restaurant. The escape room was fun and challenging, we nearly solved it within the time limit.

TODO: add evidence

Fun facts:
- Nathan was born in Hawaii
- Sayna does Muay Thai
- 


#### Q7: What are the roles & responsibilities on the team?

Describe the different roles on the team and the responsibilities associated with each role. 
 * Roles should reflect the structure of your team and be appropriate for your project. One person may have multiple roles.  
 * Add role(s) to your Team-[Team_Number]-[Team_Name].csv file on the main folder.
 * At least one person must be identified as the dedicated partner liaison. They need to have great organization and communication skills.
 * Everyone must contribute to code. Students who don't contribute to code enough will receive a lower mark at the end of the term.

List each team member and:
 * A description of their role(s) and responsibilities including the components they'll work on and non-software related work
 * Why did you choose them to take that role? Specify if they are interested in learning that part, experienced in it, or any other reasons. Do no make things up. This part is not graded but may be reviewed later.


#### Q8: How will you work as a team?

Describe meetings (and other events) you are planning to have. 
 * When and where? Recurring or ad hoc? In-person or online?
 * What's the purpose of each meeting?
 * Other events could be coding sessions, code reviews, quick weekly sync meeting online, etc.
 * You should have 2 meetings with your project partner (if you have one) before D1 is due. Describe them here:
   * You must keep track of meeting minutes and add them to your repo under "documents/minutes" folder
   * You must have a regular meeting schedule established for the rest of the term.  

Our team plans to have one hour calls over Discord every Friday afternoon (we determined this is the time period where we all have the best availability). Each meeting, we will assess our current tasks, assign any unassigned tasks, and go over any upcoming project requirements. Meeting in person is not feasible weekly because a few of our members have a long commute. Things like coding sessions and reviews will be scheduled on the fly, since they require fewer people and are easier to coordinate.

TODO: second meeting with David
  
#### Q9: How will you organize your team?

List/describe the artifacts you will produce in order to organize your team.       

 * Artifacts can be To-Do lists, Task boards, schedule(s), meeting minutes, etc.
 * We want to understand:
   * How do you keep track of what needs to get done? (You must grant your TA and partner access to systems you use to manage work)
   * **How do you prioritize tasks?**
   * How do tasks get assigned to team members?
   * How do you determine the status of work from inception to completion?

Our main artifact will be a GitHub Project board linked to our repository. Each new task will have a corresponding ticket, with any relevant sub-steps or sub-tasks included as needed. 
We will prioritize by having a "High Priority" column on our kanban board. This way, task assignees know which tickets to handle first.
Tasks will be assigned according to people's skills and availability. Our team members should be careful not to self-assign too much and ensure everyone is doing a fair share of work.

#### Q10: What are the rules regarding how your team works?

**Communications:**
 * What is the expected frequency? What methods/channels will be used? 
 * If you have a partner project, what is your process for communicating with your partner?

Currently, we have set up meetings on Fridays from 5-6, which will be held either on discord or Zoom. We currently communicate through discord primarily. We also communicate with our partner through email, but the members of our team with slack will communicate with our partner through slack for more urgent matters. 

**Collaboration: (Share your responses to Q8 & Q9 from A1)**
 * How are people held accountable for attending meetings, completing action items? Is there a moderator or process?
 * How will you address the issue if one person doesn't contribute or is not responsive? 

People will be held accountable for completing action items through the Github Projects tab, where different team members will be assigned tasks. 
