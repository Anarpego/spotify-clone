# spotify-clone

Desarrollo Web A - Jornada Domingo

---
## Integrantes del grupo:

Anibal Pérez / 0910-18-20886


José Tomín  / 0910-18-4339

---

> Se espera un despligue con los servicios de Google Cloud Platform

## FRONTEND - José Tomín

Hecho en react se desplegara en Google App Engine
---

![front1](https://user-images.githubusercontent.com/57972305/190946089-35c48d95-d467-482a-bed4-53070a3fff05.jpg)
---

![front2](https://user-images.githubusercontent.com/57972305/190946148-db5887c7-8262-4b93-b772-bc42406afedf.jpg)
---

![front3](https://user-images.githubusercontent.com/57972305/190946172-10f4c65c-7c6b-422c-a10d-3883fdad6c81.jpg)

---

![front4](https://user-images.githubusercontent.com/57972305/190946182-584222db-e044-420a-8312-34d4a36b1968.jpg)


## Backend - Anibal Pérez

Actualmente hay un microservicio de streaming para la lectura de los álbumes  y las canciones con su respectivo gateway que en este caso se levanta gracias a npm. Se espera desplegar al finalizar los microservicios restantes en Google Kubernetes Engine.

---

¿ Por qué se esta desplegando la base de datos y no se usaron contenedores sidecar con cloud sql proxy? por temas de tiempo creimos que era mejor decisión hacer esto de desplegar la base de datos en kubernetes que no es considerada buena practica pero cumple su función como proyecto de universidad.

En la carpeta backend se encuentran los yamls para la creacion de los servicios y las configuraciones como la del proxy, se esta considerando usar ArgoCD para la creación de todos los servicios y para el futuro bastion de Keycloack aunque keycloack todavia no esta implementado en nada, la unica implementación para la autenticación es JTW actualmente.

En el directorio Backend esta el Docker Compose para levantar toda la infraestructura del backend.

---

## Pruebas - Anibal y José

> Capturas de las pruebas realizadas mostrando el funcionamiento de la aplicación con sus microservicios.

Vista general del perfil

![test1](https://user-images.githubusercontent.com/90074254/200213510-f67dc545-3e74-4b67-bbb5-4ea2c5bcd5b2.jpeg)

Editor del perfil con el tipo de plan que tiene activo

![test2](https://user-images.githubusercontent.com/90074254/200213604-a1642cbd-6430-41e0-8c7d-0a4e9b8b74c5.jpeg)

Radio del usuario

![test3](https://user-images.githubusercontent.com/90074254/200213672-5c2a0e9f-569d-4e8f-b24b-b8fab6810666.jpeg)




