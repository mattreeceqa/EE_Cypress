// ///<reference types="cypress" />

describe('API only hotel booking tests', function () {

  it('Create booking via API', function () {
    cy.request('POST', 'http://hotel-test.equalexperts.io/booking',
      {
        "firstname": "test",
        "lastname": "API",
        "totalprice": "99",
        "depositpaid": "true",
        "bookingdates":
        {
          "checkin": "2020-01-28",
          "checkout": "2020-01-28"
        }
      })
      .then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body).to.have.property('bookingid')
        expect(response.body).to.have.property('booking').to.contain({
          'firstname': 'test',
          'lastname': 'API',
          'totalprice': 99,
          'depositpaid': true,
          // 'checkin': '2020-01-28',
          // 'checkout': '2020-01-28'
        })
        let bookingid = (response.body).bookingid
        cy.wrap(bookingid).as('bookingid')
        cy.log('booking id is', bookingid)
      })
  });

  it('Delete booking via API', function () {
    cy.log('booking id is', this.bookingid)
    cy
      .request({
        method: "DELETE",
        url: `http://hotel-test.equalexperts.io/booking/${this.bookingid}`,
        headers: {
          'authorization': 'Basic YWRtaW46cGFzc3dvcmQxMjM='
        }
      })
      .then((response) => {
        expect(response.status).to.eq(201)
      })
  });

  it('Verify booking has been deleted via API', function () {
    cy.log('booking id is', this.bookingid)
    cy
      .request({
        method: "GET",
        url: `http://hotel-test.equalexperts.io/booking/${this.bookingid}`,
        failOnStatusCode: false,
      })
      .then((response) => {
        expect(response.status).to.eq(404)
      })
  });
})



