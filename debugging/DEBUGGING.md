# Debugging Analysis

# ----- Assignment 2 -----

## Scenario 1: Employee CRUD Operations

-   **Breakpoint Location:** employeeService.ts, line 26
-   **Objective:** I'm trying to see the body of the post request I sent from Postman.

### Debugger Observations

-   **Variable States:**
name = 'Emily Johnson'
position = 'Sales Manager'
department = 'Sales'
email = 'emily.johnson@example.com'
phone = '204-555-7890'
branchId = '3'

-   **Call Stack:**
The function took the body and is attempting to create a new employee. The new employee has just passed the check for all required fields being met and has been given an ID.

-   **Behavior:**
The new employee is added to the employee array and the data is sent back to the controller to display the correct information.

### Analysis

-   What did you learn from this scenario?
I learned how you could use external resources like postman to send requests and data to my application.

-   Did you observe any unexpected behavior? If so, what might be the cause?
I didn't observe any real unexpected behaviour. I just am amazed with what we are able to do with these applications we are making, and didn't expect that we'd be building things that talk to other online resources.

-   Are there areas for improvement or refactoring in this part of the code?
No, I beleive that I've already done all the refactoring needed. I noticed earlier that using the code we had in the demo, empoyee objects could be created without all neccesary data so I went back to refactor it and not allow for that.

-   How does this enhance your understanding of the overall project?
It shows me how I can set up a workspace in postman to test all endpoints to ensure my functions work as intended.

## Scenario 2: Branch Management Logic

-   **Breakpoint Location:** branchController.ts, line 27
-   **Objective:** I'm trying to understand how the controller is able to call the service function and send a response with the information gathered from the service function.

### Debugger Observations

-   **Variable States:**
branches = (array of 10 branches)

-   **Call Stack:**
The function recieved a request from Postman and called the service function to gather all the branches.

-   **Behavior:**
The function now uses the data from the service funtion to send a response.

### Analysis

-   What did you learn from this scenario?
I learned about the importance of the api's modular structure. It keeps things organized, makes the program scaleable and its cool how you can have different files exchanging information.

-   Did you observe any unexpected behavior? If so, what might be the cause?
Not really. I was hoping I'd be able to see more from the debugger but in heindsight, there was only the debugger variable. I was sort of wanting to get some more information of how these requests and responses were being handled.

-   Are there areas for improvement or refactoring in this part of the code?
I dont think so. The only refactoring I could think of is potentially adding a filter to this part, but I believe that is not the intended purpose of the get request for this endpoint.

-   How does this enhance your understanding of the overall project?
It gives me clarity on what all of these files are for. When I initially looked at the file structure in module one I was a little intimidated. Now I can see how all these files actually help keep things organized and easier to mannage.

## Scenario 3: Logical Relationships

-   **Breakpoint Location:** employeeService.ts, line 132
-   **Objective:** I wanted to eplore how the employees get filtered by branch ID.

### Debugger Observations

-   **Variable States:**
employeesInBranch = (array of 5 employees)

-   **Call Stack:**
The function has just filtered all the employees by the branch ID that was provided.

-   **Behavior:**
Now the function will return the array of employees matching with the branch ID to the controller function.

### Analysis

-   What did you learn from this scenario?
I learned of a way you can utilize the filter function to filter data by a provided input value.

-   Did you observe any unexpected behavior? If so, what might be the cause?
I didn't notice any unexpected behaviour.

-   Are there areas for improvement or refactoring in this part of the code?
I don't think so. The function works well, its consise and uses adequate error handling.

-   How does this enhance your understanding of the overall project?
It tells me that perhaps in the future when I want to filter data I should first go to the filter function instead
of trying to create my own filter.

# ----- Assignment 3 -----

## Scenario 1: Validation Logic

-   **Breakpoint Location:** validate.ts, line 47
-   **Objective:** I'm trying to see the joi validation catch when the fields are empty strings.

### Debugger Observations

-   **Variable States:**
data.address = ''
data.name = ''
data.phone = ''

-   **Call Stack:**
The function just put all parameters, body and query into a variable and now is validating it against the given schema.

-   **Behavior:**
The schema will prevent the new branch from being created before the request gets to the controller.

### Analysis

-   What did you learn from this scenario?
I learned how you can use Joi to create validation rules and how to validate all imputs by putting them all into one variable.

-   Did you observe any unexpected behavior? If so, what might be the cause?
I didn't observe any unexpected behaviour.

-   Are there areas for improvement or refactoring in this part of the code?
I know there is different ways we can validate incoming data, instead of putting the inputs in one variable, but for this I think it's fine.

-   How does this enhance your understanding of the overall project?
It shows me how to create validation schemas and seemlesly integrate them into the project.

## Scenario 2: Firestore Operations

-   **Breakpoint Location:** firestoreRepository.ts, line 229
-   **Objective:** I'm trying to see what happens when the function is given valid data but the document id isn't in the repository.

### Debugger Observations

-   **Variable States:**
error.message = '5 NOT_FOUND: No Document to Update...'
error.code = 5
collectionName = 'branches'
data = {name: 'test'}
id = 'CLj2oJFKqMW1drBBxet'


-   **Call Stack:**
The function looked for the id in the firestore repository and couldn't find it.

-   **Behavior:**
The function will throw an error with a properly formatted message.

### Analysis

-   What did you learn from this scenario?
I learned how to look for a specific document in a firestore database and how to handle the error when the document isn't found.

-   Did you observe any unexpected behavior? If so, what might be the cause?
I didn't observe any unexpected behaviour.

-   Are there areas for improvement or refactoring in this part of the code?
I dont think so. The code looks concise.

-   How does this enhance your understanding of the overall project?
It gives me insight as to how I can write code to interact with the firestore database in different ways.

## Scenario 3: Error Handling Middleware

-   **Breakpoint Location:** errorHandler.ts, line 37
-   **Objective:** I wanted to see how the error handler gets the type of error, code, and status code to create helpful error messages.

### Debugger Observations

-   **Variable States:**
err.code = 'DOCUMENT_NOT_FOUND'
err.name = 'ServiceError'
err.statusCode = 500
err.message = 'Failed to get branch CLj2oJFKqMW1drBBxet'

-   **Call Stack:**
The function has been called because an error was caught.

-   **Behavior:**
The function will craft the error message with all the proper information in the proper format.

### Analysis

-   What did you learn from this scenario?
I learned how to create helpful and consistant error messages using custom error handling middleware.

-   Did you observe any unexpected behavior? If so, what might be the cause?
I didn't notice any unexpected behaviour.

-   Are there areas for improvement or refactoring in this part of the code?
I don't think there is for this particular function.

-   How does this enhance your understanding of the overall project?
It shows me how I can handle all sorts of different errors caught all over the api and give the proper response to each of them.