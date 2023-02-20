# 1. Summary of software

### a. paragraph for problem & partner

The product is a robust and straightforward rest API that allows university faculty to efficiently anonymize sensitive data, e.g. student peer reviews. The problem that many faculty members face is the handling of this data: often, it needs to be processed in large quantities and stored anonymously. Manually anonymizing this data is not only needlessly laborious, but it is also a privacy concern, because students expect that their answers are kept confidential.

Our product will facilitate the anonymization of this data by way of a rest API. This will provide a flexible interface for faculty to use our product, regardless of what technology they are using. Our product will be able to anonymize a list of text fields, given the sensitive data (names), and the terms to replace them with. Our product will also have the capability to anonymize spreadsheets via csv upload, with a target column and the value to replace the sensitive data with.

### b. paragraph existing any existing software/infrastructure (if applicable)

There are some libraries out there that people may use to anonymize their data such as pynonymizer and Faker. The pynonimizer library only supports one type of anonymization method, which is pseudonymization, by using the Faker library to generate random pseudonyms for attributes like e-mails, names, and more. Institutions  may want different anonymization methods, and they may not want to rely on these libraries because of the strict GDPR regulations they have to follow, and they also may not trust the third-party software.

By providing flexible anonymization methods, we will support our project partner’s goal of creating an automated and seamless process of anonymizing data following GDPR guidelines for organizational needs.

# 2. Division of project

### software architecture diagram

# 3. Paragraph for each sub-team

### Frontend

### Backend

### Dev Ops

