Steps to create project
- npm init --yes
- npm install --save-dev cypress

To open cypress
./node_modules/.bin/cypress open 
or
npm run cypress:open

Inside cypress/integration you'll find the booking test specs

Inside cypress/support/commands.js you'll find all the shared commands (these are imported through support/index.js)

Inside /cypress/fixtures/bookingpage_selectors.json you'll find some generic selectors for the page.




