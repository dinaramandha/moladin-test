const apiUrl = Cypress.config('reqresUrl')
const validAuth = {
    email: 'eve.holt@reqres.in',
    password: 'cityslicka'
  }

const invalidAuth = {
    email: 'peter@klaven',
    password: ''
  }

describe('Reqres API', () => {
    it('Verify to login successfully', () => {
        cy.request({
            method: 'POST',
            url: `${apiUrl}/api/login`,
            body: {
                email: validAuth.email,
                password: validAuth.password
            }
        })
        .should((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('token');
        });
    })

    it('Verify to failed login', () => {
        cy.request({
            method: 'POST',
            url: `${apiUrl}/api/login`,
            body: {
                email: invalidAuth.email,
                password: invalidAuth.password
            },
            failOnStatusCode: false
        })
        .should((response) => {
            expect(response.status).to.eq(400);
            expect(response.body.error).to.eq('Missing password');
        });
    })  
})