This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.







###############PROJECT ###########################


The primary objective of the shopping website is to provide an engaging and efficient e-
commerce platform for users to browse, select, and purchase a wide range of products. The 
website aims to create a positive user experience by implementing features such as user 
authentication, a well-organized product catalog, ratings and reviews, and personalized settings.


list of features


1. Login page, Signup page: Requires user identification such as username or a password 
and Drives registrations from new users.

Word done by Teammates : 
Anwar, Garima, Sibi

Apis: 
        Garima has created api for users login, register, logout, getting all user by id, updating the user by userid, deleting the user by userid.

functionality for backend and front end : 
            sibi has done wrok on front end login, signup pages and finctionality  
            Garima has done JWT token, authentication and input verifications.
            Anwar has created Schema for the users, styling auth.logout functionality .

2. Main page: 

api's : Anwar has created api's products and stored all the routes in productRoutes
create-product,
fetch-product
fetch-product-details
fetch-categories


functionalities:           

a. List of product Categories  -  Garima has done the categories page and functionality 
b. Specific products under categories - Anwar has done the products page  and functionality
c. Specific product details - sibi has done the product details page and functionality


3. Contact us page : 
API ROUTE- contactRoutes

Frontend-Funtionality- contactForm, which will take name, email and message from the customer and will be successfully stored in the database.

Garima  did contactus page.
                  
4. About Page : 
              

5. Search filter to get products

                               
6. ADD, delete, update to cart: 

  Garima, Anwar, sibi did the cart part 

api's : sibi has created api's for cart
add-product,
fetch-cart

8. Settings:
API Routes- userRoutes.js , apis for getting all the user information by ID, updating information by ID and deleting user by ID

Frontend-Functionality:
a. Update your profile
b. Change password
c. Delete account

  Anwar, sibi, Garima did the setting part

