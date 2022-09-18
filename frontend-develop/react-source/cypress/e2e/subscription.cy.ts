describe('Ingresar a página de suscripciones, seleccionar suscripción premium, registrar al usuario, validar que llegó hasta la página de radio', () => {
  it('passes', () => {
    
    cy.viewport(1500, 800);
    cy.visit('http://localhost:3000/app/register');

    // * Register user
    cy.get('input#name').type('Juan Pedro');
    cy.get('input#email').type('micorreo@gmail.com');
    cy.get('input#password').type('hola123');
    cy.get('input#password2').type('hola123');


    //cy.get('button#registerBtn').click();
    cy.get('.nav-login').click();


    // * Login User
    cy.get('input#email').type('micorreo@gmail.com')
    cy.get('input#password').type('hola123')
    cy.get('.btn').click()
    
    // * Buy Premium
    cy.get('.opt-Account').click();

    cy.get('.btn-editProfile').click();

    cy.get('.btn-subscribe').click();
    cy.get('.btn-subUser').click();
    
    // * Go to radio page
    cy.get('.opt-Radio').should('contain.text', 'Radio');
    cy.get('.opt-Radio').click();




  })
})