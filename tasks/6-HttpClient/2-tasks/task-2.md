### Task 2

###Description

In this task you should create a new feature read information about employee by `id`

**Component name**: employee

**URL for the component**: employees/:id

*Information about fields you can find in the Payload section.*

###API

**Host**: http://dummy.restapiexample.com/api/v1

**Endpoint**: /employee/:id

**Method**: GET

**Description**: Get a single employee data

**Payload**

```json
{
  "id": {
    "type": "number",
    "required": true
  },
  "employee_name": {
    "type": "string",
    "required": true
  },
  "employee_salary": {
    "type": "number",
    "required": true
  },
  "employee_age": {
    "type": "number",
    "required": true
  }
}
```

