const apiUrl = Cypress.config('reqresUrl')

describe('Reqres API', () => {
    it('Verify to register successfully', () => {
        const registerData = {
            email: 'eve.holt@reqres.in',
            password: 'pistol'
          }
        cy.request({
            method: 'POST',
            url: `${apiUrl}/api/register`,
            body: {
                email: registerData.email,
                password: registerData.password
            }
        })
        .should((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.id).to.eq(4);
            expect(response.body.token).to.eq('QpwL5tke4Pnpja7X4');
        });
    })

    it('Verify to failed register', () => {
        const invalidDataRegister = {
            email: 'peter@sydney@fife',
            password: ''
          }
        cy.request({
            method: 'POST',
            url: `${apiUrl}/api/register`,
            body: {
                email: invalidDataRegister.email,
                password: invalidDataRegister.password
            },
            failOnStatusCode: false
        })
        .should((response) => {
            expect(response.status).to.eq(400);
            expect(response.body.error).to.eq('Missing password');
        });
    })  
})