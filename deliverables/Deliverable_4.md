# Analysis

Group 4: **TimeSculptor**

**Date:** October 29, 2023

**Group Members:**

- Gabriel Valentin
- Izaac Molina
- Joey Banazsak
- Kimberly Allison
- Nicholas Wiley
- Noah Schwartz

# Introduction
TimeSculptor is a scheduling app; targeted for people who struggle ADHD; provides a much easier and accessible interface for those people and features ADHD friendly User Interface. The expected consumer segment are individuals suffering from ADHD. Upon logging in, you are then given the options to create events or edit your schedule's current events. You can utilize color coding, and assigning different symbols to your events. 

[TimeSculptor](https://github.com/nickw409/TimeSculptor)

# Implemented Requirements

List in this section, the requirements and associated pull request that you implemented for this release, following the example below---
include the description of the requirement, a link to the issue, a link to the pull request(s) that implement the requirement, who implemented the requirement, 
who approved it, and a print screen that depicts the implemented feature (if applicable). I expect that you implement the features you specified in your MVP (c.f. D.2 Requirements).

Example:
Requirement: As someone who associates events with pictures, I would like to label events with pictures. 
Issue: <link to your GitHub issue>
Pull request: 
Implemented by: Gabriel Valentin
Approved by: 
Print screen: 

**Requirement:** change color switcher to preset colors, change red borders to black/no borders (depending on where) 
**Issue:** https://github.com/nickw409/TimeSculptor/issues/57
**Pull request:** Fixes some CSS and changed the color picker from an HTML5 color pallette to the 3 primary and 3 secondary colors 
**Implemented by:** Noah Schwartz
**Approved by:** Nick Wiley
**Print screen:**
![Color Code](../assets/colorcode.png)

Example:
Requirement: implement testing for the program

Issue: [54](https://github.com/nickw409/TimeSculptor/issues/54)

Pull request: adding the tests [53](https://github.com/nickw409/TimeSculptor/pull/53)

Implemented by: Joey Banaszak

Approved by: Izaac Molina

Print screen: 

![testing-output](../assets/tests_terminal_results.PNG)

Example:
Requirement: Implement basic UI and Event display Layout
Issue: [44](https://github.com/nickw409/TimeSculptor/issues/44)
Pull request: [35](https://github.com/nickw409/TimeSculptor/pull/36)
Implemented by: Izaac Molina
Approved by: Nick Wiley
Print screen: ![basic-layout](../assets/basic-layout.png)

Example:
Requirement: Edit and delete events from the display using action buttons
Issue: [46](https://github.com/nickw409/TimeSculptor/issues/46)
Pull request: [48](https://github.com/nickw409/TimeSculptor/pull/48)
Implemented by: Izaac Molina
Approved by: Nick Wiley
Print screen: 
![delete](../assets/delete.png)
![edit](../assets/edit.png)


Example:
Requirement:
Issue: <link to your GitHub issue>
Pull request: 
Implemented by: 
Approved by: 
Print screen: 

# Tests

For the testing of our program we decided to use jest as our automated testing software. 

An example of one of the test cases is the [events file](https://github.com/nickw409/TimeSculptor/blob/main/TimeSculptor/src/components/events.jsx) being tested by the [events.test file](https://github.com/nickw409/TimeSculptor/blob/main/TimeSculptor/src/components/__tests__/events.test.js). 
In this test we currently test to see that when an event is added to the users schedule, that it matches the information put in and that the data of the event is properly stored. 

link for testing: [Here](https://github.com/nickw409/TimeSculptor/tree/main/TimeSculptor/src/components/__tests__)

Below is the output of the current tests being ran:

![tests-being-ran](../assets/tests_terminal_results.PNG)

# Adopted Technologies

TimeSculptor is built in Javascript using Node.js and React.js, and will implement a SQL database. Node and React are common frameworks for web backend/frontend respectively, so they are not only reliable and have multiple features, but also are easier to learn due to their high level nature and breadth of available resources for learning the technologies. SQL is being used as it is what the group is most familiar with, and is an industry standard for database administration.

# Learning / Training

The team used a self directed approach to learning. This entailed learning the fundamentals of Javascript, then applying them to the required frameworks. For example, one tutorial series used was the [React tutorial series by Net Ninja](https://youtube.com/playlist?list=PL4cUxeGkcC9gZD-Tvwfod2gaISzfRiP9d&si=QC_JCSoPEDyJ02JL). Additionally, the team shared what they learned during meetings to solidify the groups' overall understanding of the technologies being used. Overall, this methodology enabled flexibility and approachability that enabled the team to learn the assigned technologies.

# Deployment

Provide a link for the system in production and describe how you are deploying your system. 

Some alternatives for deploying your system in the cloud: 
AWS. AWS Educate offers free credits for students. See the tutorial at https://docker-curriculum.com/ on how to create a container and deploy it on AWS. 
Digital Ocean or Azzure. As part of the GitHub Education benefits, as a student, you can get $100 at Digital Ocean and $100 at Microsoft Azzure cloud computing platforms (see more details at https://education.github.com/students).
Oracle Cloud. Oracle offers a free tier in its cloud environment that should be more than enough for your needs.
Firebase. Firebase can be a good choice if you are building a mobile phone app. 

# Licensing

Inform the license you adopted for your source code (remember to configure GitHub accordingly). Explain why you adopted this license. For more information, check https://choosealicense.com/.

# Readme File

You should also prepare your repository for receiving new contributors. You should prepare a Readme.md file. See an example at https://gist.github.com/PurpleBooth/109311bb0361f32d87a2   
In the Readme file, the current version should be stated. You should follow the Semantic Versioning schema (https://semver.org/). Tag the GitHub repository accordingly (https://git-scm.com/book/en/v2/Git-Basics-Tagging). 

[CODE_OF_CONDUCT.md](https://github.com/nickw409/TimeSculptor/blob/main/CODE_OF_CONDUCT.md)
[CONTRIBUTING.md](https://github.com/nickw409/TimeSculptor/blob/main/CONTRIBUTING.md)

# Look & Feel

Describe the approach you adopted to design your user interface. Include some screenshots.

# Lessons Learned

In retrospective, describe what your team learned during this first release and what you are planning to change for the second release. 

# Demo

[TimeSculptorDemo](https://www.youtube.com/watch?v=-RkIyF8fUwQ)
