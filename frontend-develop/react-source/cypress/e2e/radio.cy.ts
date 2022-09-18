
describe('radio spec', () => {
  it('Ingresar a página de radio del usuario, agregar canción a favoritos, ir a página de favoritos y comprobar que la canción esté agregada.', () => {
    cy.viewport(1500, 800);
    cy.visit('http://localhost:3000/app/login');

    cy.get('h2').should('contain.text', 'Sign in');


    // * Fill email and password to login
    cy.get('input#email').type('leomessi@gmail.com');
    cy.get('input#password').type('hola123');

    // * Submit login
    cy.get('.btn').click();


    // * Go to radio page
    cy.get('.opt-Radio').should('contain.text', 'Radio');
    cy.get('.opt-Radio').click();



    // * click play three times

    // * Song 1
    cy.get('.btn-next').click();
    cy.get('.btn-play').click(); // - play
    cy.wait(4000);
    cy.get('.btn-next').click(); // - next

    cy.wait(4000);
    cy.get('.btn-next').click(); // - play
    cy.wait(4000);
    cy.get('.btn-next').click(); // - next



    // * Go to history page
    cy.get('.opt-Played').should('contain.text', 'Played');
    cy.get('.opt-Played').click();


  })
})