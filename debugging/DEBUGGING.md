# Debugging Analysis

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
It tells me that perhaps in the future when I want to filter data I should first go to the filter function instead of trying to create my own filter.