# Backend

Backend del proyecto

## Getting started

### Build Dockerfile
 ``` 
 docker build -t mysql_infra .
 ```


### Initilized docker Image

 ``` 
 docker run --name "mysql_infra" -p 3306:3306 -v "/mysql:/var/lib/mysql" -e "MYSQL_ROOT_PASSWORD=S2_2022" -d mysql_infra
 ```

 ### Test
 Now we can verify. We will exec inside the container:

 ```
 docker exec -it mysql_infra bash
 ```

 Loggin on Mysql Example
 ```
 root@a18d0800e2a4:/# mysql -uroot -p                
 Enter password: (INSERT YOUR PASSWORD)
 ```