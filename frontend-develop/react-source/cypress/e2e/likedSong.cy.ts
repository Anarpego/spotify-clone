import { wait } from "@testing-library/user-event/dist/utils";

describe('Ingresar a página de radio del usuario, agregar canción a favoritos, ir a página de favoritos y comprobar que la canción esté agregada', () => {
  it('passes', () => {

    cy.viewport(1500, 800);
    cy.visit('http://localhost:3000/app/login')


    // * LOGIN 
    cy.get('input#email').type('oswaldo@gmail.com')
    cy.get('input#password').type('hola123')
    cy.get('.btn').click()


    // * Go to Radio Screen
    cy.get('.opt-Radio').should('contain.text', 'Radio')
    cy.get('.opt-Radio').click();

    wait(4000);
    // * Like 5 songs
    cy.get('.likeSong-1').click();
    wait(4000);
    cy.get('.likeSong-2').click();
    wait(4000);
    cy.get('.likeSong-3').click();
    wait(4000);
    cy.get('.likeSong-4').click();
    wait(4000);
    cy.get('.likeSong-5').click();
    wait(4000);

    // * Go to radios page
    cy.get('.opt-Liked').should('contain.text', 'Liked');
    cy.get('.opt-Liked').click();

    wait(6000);


  });

});