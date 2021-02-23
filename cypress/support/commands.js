const bookingpage = require('../fixtures/bookingpage_selectors.json');

Cypress.Commands.add('assertText', (element, text) => {
  cy.get(element).should('have.text', text);
});

Cypress.Commands.add('getPageElements', () => {
  cy.get(bookingpage.h1);
  cy.get(bookingpage.firstName);
  cy.get(bookingpage.Surname);
  cy.get(bookingpage.Price);
  cy.get(bookingpage.Checkin);
  cy.get(bookingpage.Checkout);
});

Cypress.Commands.add('getBookingCount', () => {
  cy.get('.row[id]').its('length')
});

Cypress.Commands.add('getLastBooking', () => {
  var bookingid = cy.get('.row[id]').last
  console.log('booking id is', bookingid)
});

Cypress.Commands.add('addDepositBookingData', () => {
  cy.get(bookingpage.inputFirst).type('First')
  cy.get(bookingpage.inputSurname).type('Last')
  cy.get(bookingpage.inputPrice).type('99')
  cy.get(bookingpage.selectDeposit).trigger('mouseover').select('true')
  cy.get(bookingpage.inputCheckIn).type('2020-01-20')
  cy.get(bookingpage.inputCheckOut).type('2020-01-21')
  cy.get(bookingpage.firstName).click()//click off to close date picker
});

Cypress.Commands.add('addInvalidBookingData', () => {
  cy.get(bookingpage.inputFirst).type('Invalid')
  cy.get(bookingpage.inputSurname).type('Test')
  cy.get(bookingpage.inputPrice).type('99')
});

Cypress.Commands.add('addNoDepositBookingData', () => {
  cy.get(bookingpage.inputFirst).type('Firstnd')
  cy.get(bookingpage.inputSurname).type('Lastnd')
  cy.get(bookingpage.inputPrice).type('99')
  cy.get(bookingpage.selectDeposit).trigger('mouseover').select('false')
  cy.get(bookingpage.inputCheckIn).type('2020-01-20')
  cy.get(bookingpage.inputCheckOut).type('2020-01-21')
  cy.get(bookingpage.firstName).click()//click off to close date picker
});

Cypress.Commands.add('saveBooking', () => {
  cy.get(bookingpage.Save, {timeout: 10000}).click()
});

Cypress.Commands.add('deleteBooking', () => {
  cy.get(bookingpage.Delete).last().click()
});

Cypress.Commands.add('verifyFirstName', (value) => {
  cy.get('.row[id]').last().children('.col-md-2').should(($div) => {
    expect($div.get(0).innerText).to.eq(value)
  })
});

Cypress.Commands.add('verifySurname', (value) => {
  cy.get('.row[id]').last().children('.col-md-2').should(($div) => {
    expect($div.get(1).innerText).to.eq(value)
  })
});

Cypress.Commands.add('verifyDeposit', (value) => {
  cy.get('.row[id]').last().children('.col-md-2').should(($div) => {
    expect($div.get(2).innerText).to.eq(value)
  })
});
