const apiUrl = Cypress.config('reqresUrl')
const userId = 2

describe('Reqres API', () => {
    it('Verify to get lists user', () => {
        cy.request({
            method: 'GET',
            url: `${apiUrl}/api/users?page=${userId}`
        })
        .should((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.data.length).to.eq(6);
            expect(response.body.page).to.eq(userId);
            expect(response.body.total).to.eq(12);
        });
    })

    it('Verify to get single user', () => {
        cy.request({
            method: 'GET',
            url: `${apiUrl}/api/users/${userId}`
        })
        .should((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.data.id).to.eq(userId);
            expect(response.body.data.first_name).to.eq('Janet');
            expect(response.body.data.last_name).to.eq('Weaver');
            expect(response.body.data.email).to.eq('janet.weaver@reqres.in');
            expect(response.body.data.avatar).to.eq('https://reqres.in/img/faces/2-image.jpg');
        });
    })

    it('Verify to get single user not found', () => {
        const userId = 23
        cy.request({
            method: 'GET',
            url: `${apiUrl}/api/users/${userId}`,
            failOnStatusCode: false
        })
        .should((response) => {
            expect(response.status).to.eq(404);
        });
    })

    it('Verify to create user', () => {
        const userData = {
            name: 'morpheus',
            job: 'leader'
          }
        cy.request({
            method: 'POST',
            url: `${apiUrl}/api/users`,
            body: {
                email: userData.name,
                password: userData.job
            }
        })
        .should((response) => {
            expect(response.status).to.eq(201);
            cy.log(response)
            expect(response.body.email).to.eq(userData.name);
            expect(response.body.password).to.eq(userData.job);
        });
    })

    it('Verify to update user with PUT method', () => {
        const userData = {
            name: 'morpheus',
            job: 'zion resident'
          }
        cy.request({
            method: 'PUT',
            url: `${apiUrl}/api/users/${userId}`,
            body: {
                email: userData.name,
                password: userData.job
            }
        })
        .should((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.email).to.eq(userData.name);
            expect(response.body.password).to.eq(userData.job);
        });
    })

    it('Verify to update user with PATCH method', () => {
        const userData = {
            name: 'morpheus',
            job: 'zion resident'
          }
        cy.request({
            method: 'PATCH',
            url: `${apiUrl}/api/users/${userId}`,
            body: {
                email: userData.name,
                password: userData.job
            }
        })
        .should((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.email).to.eq(userData.name);
            expect(response.body.password).to.eq(userData.job);
        });
    })

    it('Verify to delete user with id = 2', () => {
        cy.request({
            method: 'DELETE',
            url: `${apiUrl}/api/users/${userId}`,
        })
        .should((response) => {
            expect(response.status).to.eq(204);
            expect(null).to.be.null;
        });
    })
})

