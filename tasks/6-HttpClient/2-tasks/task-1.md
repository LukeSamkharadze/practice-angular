### Task 1

###Description

In this task you should create a new feature register employee.

**Component name**:  employee-register

**URL for the component**: employee/register

On this page you should add a form for registration a new employee. *Information about inputs you can find in the Payload section.*

###API

**Host**: http://dummy.restapiexample.com/api/v1

**Endpoint**: /create

**Method**: POST

**Description**: Create new record in database

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

