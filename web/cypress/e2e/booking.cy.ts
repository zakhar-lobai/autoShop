describe('Booking flow (smoke)', () => {
  it('loads home page and responds 200', () => {
    cy.request('/').its('status').should('eq', 200);
    cy.visit('/');
    cy.get('body').should('exist');
    cy.get('#root').should('exist');
  });

  it('serves manifest and icons', () => {
    cy.request('/manifest.json').its('status').should('eq', 200);
    cy.request('/favicon.ico').its('status').should('eq', 200);
    cy.request('/logo192.png').its('status').should('eq', 200);
    cy.request('/logo512.png').its('status').should('eq', 200);
    cy.request('/robots.txt').its('status').should('eq', 200);
  });

  it('has a non-empty title and main app container', () => {
    cy.visit('/');
    cy.title().should('not.eq', '');
    cy.get('#root').find('*').should('have.length.greaterThan', 0);
  });

  it('renders at least one link and one image on home', () => {
    cy.visit('/');
    cy.get('a').its('length').should('be.greaterThan', 0);
    cy.get('img').its('length').should('be.greaterThan', 0);
  });

  it('manifest contains name fields', () => {
    cy.request('/manifest.json').then((resp) => {
      expect(resp.status).to.eq(200);
      expect(resp.headers['content-type']).to.contain('application/json');
      expect(resp.body).to.have.property('name');
      expect(resp.body).to.have.property('short_name');
    });
  });
});
