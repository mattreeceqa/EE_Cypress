///<reference types="cypress" />

Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});

const globals = require('../fixtures/globals.json');
const bookingpage_selector = require('../fixtures/bookingpage_selectors.json');

describe('Hotel Booking Tests', function () {
  beforeEach(function () {
    cy.visit(globals.homePage);
  });

  it('Loads the homepage elements', function () {
    cy.title().should('contain', 'Hotel booking form')
    cy.getPageElements();
    cy.assertText(bookingpage_selector.firstName, 'Firstname');
    cy.assertText(bookingpage_selector.Surname, 'Surname');
    cy.assertText(bookingpage_selector.Price, 'Price');
    cy.assertText(bookingpage_selector.Deposit, 'Deposit');
    cy.assertText(bookingpage_selector.Checkin, 'Check-in');
    cy.assertText(bookingpage_selector.Checkout, 'Check-out');
  })

  it('Add a booking with deposit', function () {
    cy.wait(1000)
    cy.getBookingCount().then(existingbookings => {
      cy.addDepositBookingData();
      cy.saveBooking();
      cy.wait(5000);
      cy.verifyFirstName('First');
      cy.verifySurname('Last');
      cy.verifyDeposit('true')
      cy.getBookingCount().should('be.greaterThan', existingbookings)
      cy.deleteBooking();
    })
  })

  it('Add a booking with no deposit', function () {
    cy.wait(1000)
    cy.getBookingCount().then(existingbookings => {
      cy.addNoDepositBookingData();
      cy.saveBooking();
      cy.wait(5000);
      cy.verifyFirstName('Firstnd');
      cy.verifySurname('Lastnd');
      cy.verifyDeposit('false');
      cy.getBookingCount().should('be.greaterThan', existingbookings)
      cy.deleteBooking();
    })
  });

  it('Add and then delete a booking', function () {
    cy.addDepositBookingData();
    cy.saveBooking();
    cy.wait(5000);
    cy.getBookingCount().then(existingbookings => {
      cy.wait(1000);
      cy.deleteBooking();
      cy.wait(1000);
      cy.getBookingCount().should('be.lessThan', existingbookings)
    })
  })

  it('Attempt a booking with missing mandatory data', function () {
    cy.getBookingCount().then(existingbookings => {
      cy.addInvalidBookingData();
      cy.saveBooking();
      cy.getBookingCount().should('be.equal', existingbookings)
    })
  })

});