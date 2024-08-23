
# School Management API

## Overview
This Node.js and Express.js API allows users to add new schools and retrieve a list of schools sorted by proximity to a specified location. The data is stored in a MySQL database.

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/school-management-api.git
   cd school-management-api
2. Install Dependencies:
   ```bash
   npm install

3. Create a .env file in the root directory and add your MySQL connection details:
   ```bash
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_password
   DB_NAME=school_management
   DB_PORT=3306

4.Run the Server:

    npm start


The server will run on http://localhost:3000.


API Endpoints
Add School
Endpoint: /addSchool
Method: POST
Description: Adds a new school to the database.
Payload:
     ```bash
     
      {
         "name": "Example School",
        "address": "123 Example St",
         "latitude": 40.712776,
         "longitude": -74.005974
     }



List Schools
Endpoint: /listSchools
Method: GET
Description: Retrieves a list of schools sorted by proximity to the provided location.
Query Parameters:
latitude (User's latitude)
longitude (User's longitude)
Example Request:
      ```bash
      
      http://localhost:3000/listSchools?latitude=40.712776&longitude=-74.005974

License
This project is licensed under the MIT License. See the LICENSE file for details.








                   


