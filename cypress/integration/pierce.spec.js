/// <reference types="Cypress" />
 
const stores = ['www.24mx.ie','www.24mx.pl']

describe('this is a testsuite that runs all its tests on both urls', () => {
    
    stores.forEach((store) => {
        
        it(`Should visit start page, check topsellers and accept cookie on ${store}`, () => {
            cy.visit(store);
            cy.log('LOOK here, we are logged in',store)
            cy.get('.m-consent > .row').should('be.visible')
            cy.get('.m-consent__ad > a.ng-tns-c88-9 > .ng-tns-c88-9').click()
            cy.url().should('include', 'campaign/topsellers') 
            cy.get('.col-4 > .m-button').click()

        })

        it(`Should search for a wrong and correct product on ${store}`, () => {
            cy.storeAndCookie(store)
            cy.fixture('data').then((word) => {
                cy.search(word.searchWrong)})
            cy.get('.qa-pl-items-grid').should('not.exist')
            cy.get('.m-input__reset > .ng-fa-icon > .svg-inline--fa').click()
            cy.fixture('data').then((word) => {
                cy.search(word.searchOk)})
            cy.get('.qa-pl-items-grid')
            .children()
            .should('have.length', 39);
        })

        it(`Should check pagination on ${store}`, () => {
            cy.storeAndCookie(store)
            cy.search('gear')
            cy.get('.m-pagination__pages > .text-center').should('be.visible')
            cy.get('.m-pagination__current-page').should('be.visible')
            cy.url().should('include', '&page=1') 
            cy.pagination()
        })

        it(`Should open Product Page and check elements on ${store}`, () => {
            cy.fixture('data').then((product) => {
                cy.storeAndCookie(store+product.url)})
            cy.get('.m-breadcrumbs > .container').should('be.visible')
            cy.get('.row--tight > .d-xl-block').should('be.visible')
            cy.get('.m-image-slider__slide > .ng-star-inserted').should('be.visible')
            cy.get('.o-productpage__sidebar-inner').should('be.visible')
        })

        it(`Should open Product Page on ${store} and add product to cart`, () => {
            cy.storeAndCookie(store+'/motocross-gear/mx--trial-boots_c312/motocross-boots_c313/oneal-rider-mx-boots-orange_pid-PM-4913344?nosto=is-startpage-gearup3')
            cy.get('.m-select__display').should('be.visible')
            cy.selectSize()
            cy.get('p-button.ng-star-inserted > .m-button').click()
            cy.get('.m-overlay__content').should('be.visible')
        })

      })

   

})