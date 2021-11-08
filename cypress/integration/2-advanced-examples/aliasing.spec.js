/// <reference types="cypress" />

context('Aliasing', () => {
  // context 내 각 it이 실행되기 전에 공통으로 특정 페이지에 방문
  beforeEach(() => {
    cy.visit('http://localhost:8080/commands/aliasing')
  })

  it('.as() - alias a DOM element for later use', () => {
    // https://on.cypress.io/as

    // Alias a DOM element for use later
    // We don't have to traverse to the element
    // later in our code, we reference it with @

    cy.get('.as-table').find('tbody>tr')
      .first().find('td').first()
      .find('button').as('firstBtn')
    // .get() : 선택자 또는 별칭으로 하나 이상의 DOM 요소를 가져오기
    // .find() : 하위 돔요소 가져오기
    // get vs contains vs find

    // when we reference the alias, we place an
    // @ in front of its name
    cy.get('@firstBtn').click()

    cy.get('@firstBtn')
      .should('have.class', 'btn-success')
      .and('contain', 'Changed')
  })

  it('.as() - alias a route for later use', () => {
    // Alias the route to wait for its response
    cy.intercept('GET', '**/comments/*').as('getComment')

    // we have code that gets a comment when
    // the button is clicked in scripts.js
    cy.get('.network-btn').click()

    // https://on.cypress.io/wait
    // '@getComment'가 해결될 때까지 기다린다.
    cy.wait('@getComment').its('response.statusCode').should('eq', 200)
    // TODO : checkpoint : pin을 찍어놓고 command + shift + c (select element) 하면 cypress highlight를 target ..
  })
})
