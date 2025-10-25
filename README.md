# Overview

A simple task manager. Allow create and modify a project and its tasks. This program is intended to work as front-end of my other project: [express_sequelize_sqlite](https://github.com/rodnitt/express_sequelize_sqlite).

This project has no server implementation in scope. VS Code's extension Live Server was used for testing.

# Installation

Clone repository
```bash
git clone bla bla bla
```

Navigate to the config folder
```bash
cd task_manager/src/config
```

Modify the file ``config.js`` to add the back-end's url.
```javascript
export const SERVER_URL = "http://url/to/server" 
```

# Usage

It start in projects list screen. You can create a new project clicking in the button on header.
![projects list](https://github.com/rodnitt/task_manager/blob/main/images/project-list.jpg?raw=true)
The list constains cards which represent the projects and each one have counter for how many tasks are accomplished, a project name, a start date (represented with a flag) or a due date (represented with a clock) and a summary preview.

---
Clicking on a project card will show its tasks.
![tasks list](https://github.com/rodnitt/task_manager/blob/main/images/tasks-list-1.jpg?raw=true)
Tasks can have priority and statuses.

## Tasks statuses representation

- Backlog
![task in backlog](https://github.com/rodnitt/task_manager/blob/main/images/task-detail-backlog.jpg?raw=true)
- In progress
![task in progress](https://github.com/rodnitt/task_manager/blob/main/images/task-detail-inprogress.jpg?raw=true)
- Accomplished
![task accomplished](https://github.com/rodnitt/task_manager/blob/main/images/task-detail-accomplished.jpg?raw=true)

## Tasks priorities representation

- Urgent
![urgent task](https://github.com/rodnitt/task_manager/blob/main/images/task-detail-urgent.jpg?raw=true)
- Important
![important task](https://github.com/rodnitt/task_manager/blob/main/images/task-detail-important.jpg?raw=true)
- Normal
![normal task](https://github.com/rodnitt/task_manager/blob/main/images/task-detail-normal.jpg?raw=true)
- Optional
![optional task](https://github.com/rodnitt/task_manager/blob/main/images/task-detail-optional.jpg?raw=true)

## Task overtime representation

![overtimed task](https://github.com/rodnitt/task_manager/blob/main/images/task-overtime.jpg?raw=true)
