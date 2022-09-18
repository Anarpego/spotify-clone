

describe('Login del usuario con credenciales válidas, hasta la página de modificación de datos (y modificar algún dato)', () => {
  it('passes', () => {

    cy.viewport(1500, 800)
    cy.visit('http://localhost:3000/app/login')

    cy.get('h2').should('contain.text','Sign in')


    // * Fill email and password to login
    cy.get('input#email').type('leomessi@gmail.com')

    cy.get('input#password').type('hola123')

    // cy.get('button')
    // .should('contain.text','Login')
    cy.get('.btn').click()

    cy.get('.opt-Account').should('contain.text', 'Account')
  
    cy.get('.opt-Account').click();

    cy.get('.btn-editProfile').click();


    // * Modify name
    cy.get('input#name').clear();
    cy.get('input#name').type('Nombre de prueba')


    // * Update 
    cy.get('.btn-updateUser').click()

    //cy.get('.btn-profileInfo').click()

  });




})