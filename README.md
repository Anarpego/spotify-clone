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

Actualmente hay un microservicio de streaming para la lectura de los álbumes  y las canciones con su respectivo gateway que en este caso se levanta gracias a npm y, se espera desplegar al finalizar los microservicios restantes en Google Kubernetes Engine.

Cuando se despligue a kubernetes el gateway pasara a ser un ingress con el helm chart de Ingress-Nginx (https://artifacthub.io/packages/helm/ingress-nginx/ingress-nginx) que generara un load balancer y solo tendra una IP ya que servira como proxy inverso tomando todos nuestros servicios internos y exponiendolos.

> Nota al ingeniero: Aun no se ha podido desplegar en GCP, pero no es un experimento. Esta app esta basada en un proyecto al que yo ya contribui, dockerice y desplegue aplicando pipelines de CI/CD.




