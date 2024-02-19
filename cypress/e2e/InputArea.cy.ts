/* eslint-disable max-len */
describe('InputArea Component', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('loads issues when "Load" button is clicked', () => {
    const repoUrl = 'https://github.com/facebook/react';

    cy.window().then((win) => {
      win.localStorage.setItem('repoLink', repoUrl);
    });

    cy.get('button').contains('Load').click();

    cy.get('#issues').should('be.visible');
  });

  it('loads issues when Enter key is pressed', () => {
    const repoUrl = 'https://github.com/facebook/react';

    cy.window().then((win) => {
      win.localStorage.setItem('repoLink', repoUrl);
    });

    cy.get('input[type="text"]').type(repoUrl).type('{enter}');

    cy.get('#issues').should('be.visible');
  });
});
