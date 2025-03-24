# Employee Directory and Branch Management


## Project Overview

This is an application to manage employees and branches.
It is useful for adding, removing, edditing, and gathering employee and branch information.

## Installation Instructions

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. **Initialize the Project**:
   ```bash
   npm init -y
   ```

3. **Install TypeScript**:
   ```bash
   npm install typescript ts-node @types/node --save-dev
   ```

4. **Install Express**:
   ```bash
   npm install express
   npm install @types/express --save-dev
   ```

5. **Install Swagger Packages**:
   ```bash
   npm install swagger-ui-express swagger-jsdoc --save-dev
   npm install @types/swagger-ui-express @types/swagger-jsdoc --save-dev
   ```

6. **Install Jest**:
   ```bash
   npm install jest ts-jest @types/jest supertest @types/supertest --save-dev
   ```

7. **Install Morgan**:
   ```bash
   npm install morgan
   npm install @types/morgan --save-dev
   ```

8. **Install the Firebase Admin Node.js SDK**:
   ```bash
   npm install firebase-admin
   ```

9. **Install Joi**:
   ```bash
   npm install joi
   ```

10. **Install Redocly CLI**:
    ```bash
    npm install -D @redocly/cli
    ```

11. **Install dotenv**:
    ```bash
    npm install dotenv
    ```

12. **Install Helmet.js**:
    ```bash
    npm install helmet
    ```

13. **Install cors**:
    ```bash
    npm install cors
    npm install @types/cors --save-dev
    ```

## Example Usage

### Sample Request

**Create Branch**
```typescript
const createBranch = async () => {
    const url = 'http://localhost:3000/branch'; // Replace with your actual Express endpoint
    const branchData: Omit<Branch, 'id'> = {
        name: 'New Branch',
        address: '123 Main Street, Winnipeg, MB',
        phone: '123-456-7890',
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer YOUR_BEARER_TOKEN', // Replace with your bearer token
            },
            body: JSON.stringify(branchData),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Error: ${errorData.message}`);
        }

        const data: Branch = await response.json();
        console.log('Branch created successfully:', data);
    } catch (error) {
        console.error('Error creating branch:', error.message);
    }
};

createBranch();
```

### Sample Response

**Successful Response**
```json
{
  "id": "abc123",
  "name": "Downtown Branch",
  "address": "123 Main Street",
  "phone": "123-456-7890",
  "createdAt": "2025-03-23T19:24:00Z",
  "updatedAt": "2025-03-23T19:24:00Z"
}
```

**Invalid Input**
```json
{
  "error": "Invalid branch name"
}
```

**Internal Server Error**
```json
{
  "error": "Internal server error"
}
```

## Link to Public Documentation

Open your browser and go to `https://ngowler.github.io/Employee-Branch-API-Documentation`.

## Accessing OpenAPI Locally

Open your browser and go to `http://localhost:3000/api-docs`.

## Secure Setup Instructions

1. Create your .env file at the root of your project directory.

2. Insert the following environment variables
   - NODE_ENV
   - PORT
   - FIREBASE_PROJECT_ID
   - FIREBASE_PRIVATE_KEY
   - FIREBASE_CLIENT_EMAIL
   - SWAGGER_SERVER_URL
   - TRUSTED_ORIGIN
