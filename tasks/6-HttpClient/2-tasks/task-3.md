### Task 3

###Description

In this task, you should improve the employee page by adding the opportunity to update employee. 

**Component name**: employee

**URL for the component**: employees/:id

*Information about fields you can find in the Payload section.*

###API

**Host**: http://dummy.restapiexample.com/api/v1

**Endpoint**: /update/:id

**Method**: PUT

**Description**: Update an employee record

**Payload**

```json
{
  "name": {
    "type": "string",
    "required": true
  },
  "salary": {
    "type": "number",
    "required": true
  },
  "age": {
    "type": "number",
    "required": true
  }
}
```

