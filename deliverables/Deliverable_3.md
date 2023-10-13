# Analysis

Group 4: **TimeSculptor**

**Date:** October 15, 2023

**Group Members:**

- Gabriel Valentin
- Izaac Molina
- Joey Banazsak
- Kimberly Allison
- Nicholas Wiley
- Noah Schwartz

## 1. System Description

UI design is often built around the needs of neurotypical people. As a result, many apps miss UI features that improve ease of use for people with learning disabilities. One example of this is with Calendar apps, which, while extensive, often have complex UIs that aren't learning disability friendly. As a result, there should be a calendar app that prioritizes accessibility by following UI guidelines that accomodate those with learning disabilities. For those that have a learning disability who could greatly benefit from a scheduling app designed specifically with their needs in mind, TimeSculptor accomodates these needs by adhering to UI styling guidelines laid out by [Pavlov (2014)](https://www.scirp.org/html/7-9301792_43152.htm) and [Moreno et al. (2023)](https://link.springer.com/article/10.1007/s10209-023-00986-z). For example, Pavolv (2014) states that a key aspect of accesibile UIs is to ensure that all ideas have an associated picture. Apps like Google Calendar, Outlook, and Apple Calendar do not prioritize this, as events are typically just shown as text (with some niche exceptions like birthdays in Google Calendar). TimeSculptor will put these needs at the forefront, ensuring that the app adheres as closely as possible to them. Overall,
TimeSculptor is a scheduling app built for people with learning disabilities, our expected consumer segment. It provides a much easier and accessible interface that adheres to research based on building UI that is learning disability friendly.

The system requirements for TimeSculptor are defined thusly. First, **users** must be able to register with a valid _email_, _username_, and _password_. Each **user** will also **_have_** different personalized **settings**, which enable them to personalize their experience. For example, they can change their **notification** preferences, such as turning them _on/off_ or changing the _frequency_ at which notifications are sent. Each **notification** has a set _date_ it is sent out, as well as _content_ that will remind the **user** to update their **schedule**, and/or of upcoming **events**. Aside from this, the **user** can build a **schedule** that is **_tied to them_**, which is **_comprised_** of **days** will **_contain_** various **events**. The **schedule** will have different _view options_, such as list, daily, or weekly. The **schedule** also **_has_** inidividual **days**, which have a _date_, possible associated _holidays_, and have **events** that are **_scheduled within_** them. Each **event** **_contained_** within the **schedule** will have relevant information, like the _name_, _date_, _start time_, _end time_, _associated color_, and _related picture_. There are also **_recurring events_** which **_are a_** form of event that reoccur on a _time interval_, such as daily, weekly, or monthly. Another feature of TimeSculptor will be that it allows **users** to be **_friends_**, enabling users to compare their **schedules** via **compare requests**. In these **compare requests**, a **user** will **_initiate_** a request, which can then be **_accepted_** by another **user**. These **compare requests** will have a _header_, _content_, _sent date_, and _accepted date_. Once **_accepted_**, each of the **users** can use the **compare request** to **_view_** the other's **schedule** in order to schedule an **event** together.

Make UML class diagrams of:

# Gabriel

### User
  Attributes :
  - Username : String
  - UserID : Int

### Schedule
  Attributes :
  - Insert attributes here

  
# Nick

### Event
  **Attributes:**
    - Name: String
    - Date: Date
  
  **Methods:**
    - +CreateEvent()
    - +RemoveEvent()
    - +EditEvent()

### Recurring - subclass of event
  Extends Event
  **Attributes:**
    - RecurrenceInterval: Data
  
  **Methods:**
    - +CreateRecurringEvent()

# Noah

### Notification

**Attributes:**
- Content: String
- SentDate: Date
  
**Methods:**
- CreateNotification()
- RemoveNotification()
- EditNotification()
- 
### Settings

**Attributes:**
- NotificationPreferences: String
- ViewOptions: String

**Methods:**
- CreateSettings()
- RemoveSettings()
- EditSettings()

# Kimberly

### Compare Requests

### Day
