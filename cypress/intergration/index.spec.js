import cy from "cypress";

describe('Navigation', () => {
    it('should navigate to the main page with title named "Economic Dashboard"', () => {
        // Start from the index page
        cy.visit('/')

        // The new page should contain an title with "Economic Dashboard"
        cy.get("title").contains('Economic Dashboard')
    })
})
