//search for value

Cypress.Commands.add('search',(value)=>{
    cy.get('#search-desktop').type(value).type('{enter}')
    cy.get('.m-search-header__headline > div').should('contain',value)
})

Cypress.Commands.add('pagination',()=>{
    cy.get('.ng-star-inserted > .m-button').click()
    cy.url().should('include', '&page=2')
    cy.get(':nth-child(5) > .ng-tns-c96-14').click()
    cy.url().should('include', '&page=5')
})

Cypress.Commands.add('storeAndCookie',(webstore)=>{
    cy.visit(webstore)
    cy.get('.col-4 > .m-button').click()
})


Cypress.Commands.add('selectSize',()=>{
    cy.get('.m-select__display').click()
    cy.get('.a-product-variation__title').each(($el)=>{
        if ($el.text() === '41')
        cy.wrap($el).click()
    })
     })

