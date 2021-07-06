# Intern API
Simple REST API for sandbox tasks

## Routes
### GET
- `/` - main route
- `/users` - users collection
- `/users/:id` - user by id

### POST
- `/users`

REQUEST-DTO
```
{
    name: string;
    surname: string;
    patronymic: string;
    dateBirth: Date;
    gender: string;
}
```
RESPONSE-DTO
```
{
    id: number;
    fullName: string;
    dateBirth: Date;
    gender: string;
    avatar: string;
}
```
