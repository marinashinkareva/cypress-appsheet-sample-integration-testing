/// <reference types="Cypress" />

context('Cypress - Appsheet - Login - Editing rows', () => {
  beforeEach(() => {

    cy.request({
      method: 'POST',
      url: 'https://api.appsheet.com/api/v1/apps/4d3324d7-c4a1-4349-860f-45adee1243f8/tables/Sample/Action', // baseUrl is prepended to url
      headers: {
        // set content-type headers
        'content-type': 'binary/octet-stream',
        'ApplicationAccessKey': '6QAwV-R4wLJ-Xwem3-4BG9M-4GWr6-10TGI-58K1r-8tB2V'
      },
      form: true, // indicates the body should be form urlencoded and sets Content-Type: application/x-www-form-urlencoded headers
      body: {
        // username: 'jane.lane',
        // password: 'password123'
        Action: 'Edit',
        Properties: {
          Locale: 'en-US',
          Location: '47.623098, -122.330184',
          Timezone: 'Pacific Standard Time'
        },
        Rows: [
          {
            Step: '1: Position the patient',
            Title: 'Marina.. Smth great happening very soon!',
            Details: '33',
            Image: 'New.Step1.jpg'
          }
          ]
      }
    })

    // cy.visit('http://localhost:8080/commands/network-requests')
  //  cy.visit('https://api.appsheet.com/api/v1/apps/a8c58a79-0607-490b-a77d-cd85aa16e87f/tables/Sample/Action')
  // marina
  })

  // Manage AJAX / XHR requests in your app

  it('cy.server() - control behavior of network requests and responses', () => {
    // https://on.cypress.io/server

    cy.server().should((server) => {
      // the default options on server
      // you can override any of these options
      expect(server.delay).to.eq(0)
      expect(server.method).to.eq('GET')
      expect(server.status).to.eq(200)
      expect(server.headers).to.be.null
      expect(server.response).to.be.null
      expect(server.onRequest).to.be.undefined
      expect(server.onResponse).to.be.undefined
      expect(server.onAbort).to.be.undefined

      // These options control the server behavior
      // affecting all requests

      // pass false to disable existing route stubs
      expect(server.enable).to.be.true
      // forces requests that don't match your routes to 404
      expect(server.force404).to.be.false
      // whitelists requests from ever being logged or stubbed
      expect(server.whitelist).to.be.a('function')
    })

    cy.server({
      method: 'POST',
      delay: 1000,
      status: 422,
      response: {},
    })

    // any route commands will now inherit the above options
    // from the server. anything we pass specifically
    // to route will override the defaults though.
  })

  it('cy.request() - make an XHR request', () => {
    // https://on.cypress.io/request
    cy.request('https://jsonplaceholder.cypress.io/comments')
      .should((response) => {
        expect(response.status).to.eq(200)
        expect(response.body).to.have.length(500)
        expect(response).to.have.property('headers')
        expect(response).to.have.property('duration')
      })
  })


  it('cy.request() - verify response using BDD syntax', () => {
    cy.request('https://jsonplaceholder.cypress.io/comments')
    .then((response) => {
      // https://on.cypress.io/assertions
      expect(response).property('status').to.equal(200)
      expect(response).property('body').to.have.length(500)
      expect(response).to.include.keys('headers', 'duration')
    })
  })

  it('cy.request() with query parameters', () => {
    // will execute request
    // https://jsonplaceholder.cypress.io/comments?postId=1&id=3
    cy.request({
      url: 'https://jsonplaceholder.cypress.io/comments',
      qs: {
        postId: 1,
        id: 3,
      },
    })
    .its('body')
    .should('be.an', 'array')
    .and('have.length', 1)
    .its('0') // yields first element of the array
    .should('contain', {
      postId: 1,
      id: 3,
    })
  })

 
})
