# Password manager

For this challenge, I created a RESTful API using Express and an Angular SPA.

For the Angular app I created a component for the Password-Card form and another one for the Password-Card tile. Both components are used in the main app component directly.

Besides, I created a service for handling the communication with the API, and another one for showing errors. I also created a pipe for filtering the Password-Cards by name as required.

The backend stores the data in a file.

To run the app, you should start the backend and the frontend servers separately.

### Backend
- Create a copy of the ```.end.production``` file and name it ```.env```
- Configure the server port (default 3000)
- Create a 32 character ```ENCRYPTION_KEY```
- Run the dev server ```npm run dev```

### Frontend
- Create a copy of the ```/src/environments/environment.prod.ts``` file and name it ```/src/environments/environment.ts```
- Set the apiEndpoint matching the backend configuration (example, "http://localhost:3000/api/v1")
- Run the dev server ```npm start```
- Browse to [http://localhost:4200/](http://localhost:4200/)

## Assumptions and limitations
This app doesn't work for multiple users. That was not part of the requirements and it would have been much more complex to develop.

The API is not secured either. For that, I could have used some kind of authentication + JWT mechanism.

## Main Libraries & Dependencies
### Backend
- express 4.16.1
- cors 2.8.5
- dotenv 16.0.1
- uuid 8.3.2
  
### Frontend
- angular 13.3.0
- angular material 13.3.8
- rxjs 7.5.0