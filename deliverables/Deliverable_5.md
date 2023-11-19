# Analysis

Group 4: **TimeSculptor**

**Date:** October 30, 2023

**Group Members:**

- Gabriel Valentin
- Izaac Molina
- Joey Banazsak
- Kimberly Allison
- Nicholas Wiley
- Noah Schwartz

# Introduction
 TimeSculptor is a scheduling app that aims to provide a seemless and user friendly experience, with a particular emphasis on being accessible for people with learning disabilities. It provides an accessible interface that adheres to guidelines outlined in [Pavlov (2014)](https://www.scirp.org/html/7-9301792_43152.htm) and [Moreno et al. (2023)](https://link.springer.com/article/10.1007/s10209-023-00986-z). The primary expected consumer segment individuals who possess learning disabilities, but this ultimately makes the app accessible for everyone. Upon logging in, you are then given the options to create events or edit your schedule's current events. You can utilize color coding, and assigning different symbols to your events. 

[TimeSculptor](https://github.com/nickw409/TimeSculptor)

# Implemented Requirements

**Requirement:** change color switcher to preset colors, change red borders to black/no borders (depending on where)   
**Issue:** <https://github.com/nickw409/TimeSculptor/issues/57>  
**Pull request:** Fixes some CSS and changed the color picker from an HTML5 color pallette to the 3 primary and 3 secondary colors   
**Implemented by:** Noah Schwartz  
**Approved by:** Nick Wiley  
**Print screen:**   
![Color Code](../assets/colorcode.png)

**Requirement:** User login with credentials username, password.  
**Issue:** <https://github.com/nickw409/TimeSculptor/issues/49>   
**Pull request:** <https://github.com/nickw409/TimeSculptor/pull/52>   
**Implemented by:** Nick Wiley   
**Approved by:** Izaac Molina   
**Print screen:**    
![Login Screen](../assets/login_page.png)

**Requirement:** implement testing for the program
**Issue:** [54](https://github.com/nickw409/TimeSculptor/issues/54)     
**Pull request:** adding the tests [53](https://github.com/nickw409/TimeSculptor/pull/53)   
**Implemented by:** Joey Banaszak  
**Approved by:** Izaac Molina  
**Print screen:**    
![testing-output](../assets/tests_terminal_results.PNG)

**Requirement:** Implement basic UI and Event display Layout   
**Issue:** [44](https://github.com/nickw409/TimeSculptor/issues/44)  
**Pull request:** [35](https://github.com/nickw409/TimeSculptor/pull/36)  
**Implemented by:** Izaac Molina  
**Approved by:** Nick Wiley   
**Print screen:**   
![basic-layout](../assets/basic-layout.png)

**Requirement:** Edit and delete events from the display using action buttons  
**Issue:** [46](https://github.com/nickw409/TimeSculptor/issues/46)     
**Pull request:** [48](https://github.com/nickw409/TimeSculptor/pull/48)   
**Implemented by:** Izaac Molina   
**Approved by:** Nick Wiley  
**Print screen:**    
![delete](../assets/delete.png)
![edit](../assets/edit.png)

**Requirement:** Added a dropdown calendar for event date and time input           
**Issue:** [45](https://github.com/nickw409/TimeSculptor/issues/45)                
**Pull request:** [55](https://github.com/nickw409/TimeSculptor/pull/55)               
**Implemented by:** Kimberly Allison            
**Approved by:** Nick Wiley                
**Print screen:**     
![calendarInput](../assets/calendarInput.png)

**Requirement:** Implemented different icons to use for better accessability   
**Issue:** <https://github.com/nickw409/TimeSculptor/issues/65>  
**Pull request:** Icons - Worked on implementing different icons to add to the app.   
**Implemented by:** Gabriel Valentin  
**Approved by:** Nick Wiley  
**Print screen:**   
![firstSixIcons](../assets/firstsixicons.png)

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

http://enginick.com:9696

The system is being deployed on a Hostwinds server. The client connects to a Node server listening on port 9696 that servers a static React page
responsible for all UI. The server is also home to a REST API used to get user authentication.

# Licensing

We adopted the MIT License which is the most basic licensing a project can have. Essentially, it allows most distributions and duplications of the project to occur which could be quite helpful as the software develops more. We designed this project with specific learning disabilties in mind so we would like it to be as open to suggestions as possible.

# Readme File

[CODE_OF_CONDUCT.md](https://github.com/nickw409/TimeSculptor/blob/main/CODE_OF_CONDUCT.md)
[CONTRIBUTING.md](https://github.com/nickw409/TimeSculptor/blob/main/CONTRIBUTING.md)
[LICENSE.md](https://github.com/nickw409/TimeSculptor/blob/main/LICENSE.md)

# Look & Feel

- One design choice was to use a color scheme created by [Venngage](https://venngage.com/tools/accessible-color-palette-generator) which is a color pallete creator based on the [WCAG](https://www.w3.org/WAI/standards-guidelines/wcag/) guidelines of making websites accessible. Quote pulled from Vennage: "The color pairings follow WCAG 2.1 AA based on a contrast ratio of 4.5:1. The pairings have sufficient contrast for use with normal text, large text and graphics."
![Venngage](../assets/venngage.png)
![ColorCoded](../assets/eventcolors.png)
- Additionally, we have an icon for each event that ties in the information to info, improving accessibility. We plan on adding more icons in the future so the user can customize the icon that represents each event.
![ShowIcon](../assets/showicon.png)

# Lessons Learned

Throughout the course of creating this first release, we have learned a lot about the use of react.js, node.js, and jest. In particular, the group learned a great deal about how to design event listeners in React, as well as how to use the React mui library to implement useful features like dropdown menus and add/edit/delete dialogues. In the future, we want to will further improve the UI by thoroughly examining further acessibility requirements and applying them to our design. Additionally, some other immediate next steps for the project are to implement a full user registration and login system, designing a calendar view for events, implementing user settings, and setting up a SQL database for our classes.

# Demo

[TimeSculptorDemo](https://us04web.zoom.us/clips/share/BHVzMDQgk0IoAwByjY7bsPfttzbwm0oP82jQwe-Q-KXyR24fzQc)
