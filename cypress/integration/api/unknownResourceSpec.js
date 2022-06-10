const apiUrl = Cypress.config('reqresUrl')

describe('Reqres API', () => {
    it('Verify to get list unknown of user', () => {
        cy.request({
            method: 'GET',
            url: `${apiUrl}/api/unknown`
        })
        .should((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.data.length).to.eq(6);
            expect(response.body.page).to.eq(1);
            expect(response.body.total).to.eq(12);
        });
    })

    it('Verify to get unknown single user', () => {
        const userId = 23
        cy.request({
            method: 'GET',
            url: `${apiUrl}/api/unknown/${userId}`,
            failOnStatusCode: false
        })
        .should((response) => {
            expect(response.status).to.eq(404);
            expect(null).to.be.null;
        });
    })
})

