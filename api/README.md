# iPoll API: Built with Vapor 3.0 💧
	
## Routes

### Users

| Route | HTTP | Action |
|:-----:|:----:|:------:|
/api/users | GET | Returns all Users
/api/users | POST | Create User
/api/users/login | POST | Authentication Login
/api/users/**User.ID** | GET | Returns a user
/api/users/owned-courses/**User.ID** | GET | Returns Courses a User created
api/users/enrolled/**User.ID** | GET | Returns Courses a User is enrolled in
/api/users/enroll/**User.ID**/in-course/**Course.ID** | POST | Enrolls User in a Course

<br>

### Course

| Route | HTTP | Action |
|:-----:|:----:|:------:|
/api/courses | GET | Return all courses
/api/courses/**Course.ID** | GET | Returns a course
/api/course/**Course.ID**/teacher | GET | Returns the teacher of a course
/api/courses/**Course.ID**/students | GET | Returns all students
/api/courses/**Course.ID**/students/**User.ID** | POST | Enrolls a User in to Course
/api/courses/**Course.ID**/ | DELETE | Deletes a course
/api/courses/**Course.ID**/ | PUT | Updates a Course
/api/courses/search | GET | Search for a Course
   
<br>

### Token

| Route | HTTP | Action |
|:-----:|:----:|:------:|
/api/tokens | GET | Return all tokens (ONLY FOR DEVELOPMENT)
/api/tokens | DELETE | Deletes a Token
/api/tokens/**Token.ID** | GET | Returns a Token
/api/tokens/check-token | GET | Returns a 1 or 0 based on Token search
/api/tokens/find-token | GET | Returns a Token based on a DB query

<br>

### Quiz

| Route | HTTP | Action |
|:-----:|:----:|:------:|
/api/quizzes | GET | Return all Quizzes
/api/quizzes/for-course/**Course.ID** | POST | Creates a Quiz for a Course


