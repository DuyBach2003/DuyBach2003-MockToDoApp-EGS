Steps to run the project: 

Step 1: Clone the repository (git clone https://github.com/DuyBach2003/MockToDoApp-EGS.git) 

Step 2: Install dependencies using npm install 

Step 3: Setup PostgreSQL database
- If you do not have PostgreSQL, you can install it at this link: https://www.enterprisedb.com/downloads/postgres-postgresql-downloads
- Create a database named mockToDoApp: CREATE DATABASE "mockToDoApp";
- Create the 'postgres' user:
CREATE USER postgres WITH PASSWORD '1234';
GRANT ALL PRIVILEGES ON DATABASE "mockToDoApp" TO postgres;
- Create the todos table:
CREATE TABLE todos (
    id BIGINT PRIMARY KEY,
    title VARCHAR(255) NOT NULL
);

Step 4: Run the backend and frontend servers:

Backend:
- cd backend
- npm run start

Frontend:
- cd frontend
- npm start
