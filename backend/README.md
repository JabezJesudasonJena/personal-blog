# Personal Blog Backend

## Setup

	Fork or Clone this repo 
> In backend/.env add variables
    ```
		PORT=
		JWT_SECRET=
		DATABASE_URL
    ```

-- Database

	The Database used is POSTGRES

	The queries are performed using Prisma ORM

	> Data Models
			model User {
				id 	Int @id @default(autoincrement())
				email String @unique
				name String?
				role String
				pass String
			
				article Article[]
				
			}
			
			model Article{
				id Int @id @default(autoincrement())
				title String
				content String
				authorId Int
			
				user User @relation(fields: [authorId], references: [id])
			}


## Requests
### Auth
- POST /api/auth 
  
  SignUp USer
- GET /api/auth

    Sign In in User
### Article
  - POST /api/article
    
    Creates new Article
  - GET /api/article

    Returns all Articles
  - GET /api/article/user

    Returns the articles the user has created
