# Interview Scheduler

Interview scheduler allows users to book meetings with interviewers on any given day

## Features 

- View booked interviews and spots remaining for a given day on the sidebar and main menu
- Book or cancel any interviews
- Edit the student name or selected mentor for a specific interview
- See the interviewers that are available on a given day when creating a booking
- Confirm changes before cancelling an interview
- Display error messages in case of a network issue


## Final Product

!["Main page display & Book/Edit interview functionality"](https://github.com/TheoMLP/scheduler/blob/master/docs/Book_interview_functionality.png?raw=true)

!["Confirm delete functionality"](https://github.com/TheoMLP/scheduler/blob/master/docs/confirm_delete_functionality.png?raw=true)

!["Responsive loading and deleting functionality"](https://github.com/TheoMLP/scheduler/blob/master/docs/responsive_loading_functionality.png?raw=true)

## Getting Started

1. Fork this repository, then clone it.
2. Install the dependencies using the `npm install` command.
3. Start the Webpack Development Server using`npm start`. The app will be served at <http://localhost:8000/>.
4. Go to <http://localhost:8000/> in your browser.
5. Enjoy the full features of the website (Look at the remaining spots for a given day and the available interviewers)

## Run the Webpack Development Server

```sh
npm start
```

## Run the Jest Test Framework

```sh
npm test
```

## Run the Cypress Test Framework

```sh
npm run cypress
```

## Run Storybook Visual Testbed

```sh
npm run storybook
```

## Dependencies

- react
- react-dom
- react-scripts
- axios
- classnames
- normalize.css
- Express
- Chance
- Node 5.10.x or above