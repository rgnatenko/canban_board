describe('CanbanTable Component', () => {
  const repoUrl = 'https://github.com/facebook/react';

  beforeEach(() => {
    cy.visit('http://localhost:3000');

    cy.window().then((win) => {
      win.localStorage.setItem('repoLink', repoUrl);
    });

    cy.get('button').contains('Load').click();
  });

  it('should update local storage when issues are dragged and dropped', () => {
    let initialLocalStorageState: string | null;

    cy.window().then((win) => {
      initialLocalStorageState
        = win.localStorage.getItem(repoUrl);
    });

    cy.get('#draggable-item').eq(0).as('dragItem');
    cy.get('#droppable-area').as('dropZone');

    cy.get('@dragItem').trigger('dragstart');
    cy.get('@dropZone')
      .trigger('dragover', { force: true })
      .trigger('drop', { force: true });

    cy.window().then((win) => {
      const updatedLocalStorageState
        = win.localStorage.getItem(repoUrl);

      expect(updatedLocalStorageState).not.to.equal(initialLocalStorageState);
    });
  });
});
