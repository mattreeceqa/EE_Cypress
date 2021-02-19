Steps to create project
- npm init --yes
- npm install --save-dev cypress

To open cypress
./node_modules/.bin/cypress open 
or
npm run cypress:open

- Inside cypress/integration are the test specs.  There is one spec for UI driven tests and a seperate one for API only tests.

- Inside cypress/support/commands.js are the shared commands (these are imported through support/index.js)

- Inside /cypress/fixtures/bookingpage_selectors.json are some generic selectors for the page.

- Please find the QA Report.doc for a breakdown of the test activities performed




