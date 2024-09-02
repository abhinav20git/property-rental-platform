# Property Rental Platform




## Overview

**Next Door** is a robust property rental platform designed to streamline the process of finding and renting properties. The platform provides a seamless user experience with functionalities that include property listings, user authentication, payment processing, and more. Developed over 10 days for the purpopse of completion of assigment given by **Totality Crop**, this platform leverages modern web technologies and tools to ensure efficiency, scalability, and a pleasant user experience.

## Tech Stack

- **Frontend**:
  - **React**: For building dynamic user interfaces.
  - **Next.js**: Framework for server-side rendering and static site generation.
  - **Tailwind CSS**: For designing responsive and modern UI.
  - **React Hook Form**: For managing forms and validations.
  - **React Icons**: For including customizable icons.
  - **Framer Motion**: For animations and interactive UI elements.
  - **Headless UI & Radix UI**: For building accessible components.
  - **CLSX**: For utility class merging.
  - **Tailwind Merge**: For merging Tailwind CSS classes.

- **State Management**:
  - **Redux & Redux Toolkit**: For managing global state, with a focus on reducing database calls by storing essential data in the Redux store.

- **Authentication & Authorization**:
  - **NextAuth.js**: For handling authentication and OAuth integrations with GitHub and Google.
  - **Cookies-Next & Nookies**: For managing cookies and sessions.

- **Backend**:
  - **Appwrite**: For backend services, including user management, file storage, and database operations.
  - **Nodemailer**: For handling emails, particularly in the "Contact Us" page.
  - **Razorpay**: For processing payments securely.

- **Additional Tools**:
  - **QSS**: For parsing and stringifying query strings.
  - **Mini-SVG Data URI**: For optimizing SVGs for web use.

## Key Features

- **User Authentication**: Supports GitHub and Google OAuth login, along with traditional email/password registration and login.
- **Property Listings**: Displays a wide array of properties with options to filter and sort according to user preferences.
- **Payment Integration**: Seamless payment process using Razorpay.
- **State Management**: Efficient data management with Redux to minimize database calls and ensure fast data retrieval.
- **3D UI Integration**: Utilizes the Acernity 3D UI library to enhance user interaction.
- **Email Notifications**: Automated email handling via Nodemailer on specific actions like contact form submissions.
- **Responsive Design**: Ensures a seamless experience across devices, utilizing Tailwind CSS and other UI libraries.
- **SEO and Performance Optimizations**: Leveraging Next.js capabilities for server-side rendering and static generation.

## Project Structure

- **/src**: Contains the main source code including pages, components, and API routes.
- **/public**: Houses static assets like images and fonts.
- **/styles**: Tailwind CSS configuration and global styles.

## Data Flow and Modeling

The data flow in Next Door is designed to ensure that user actions are processed efficiently, with minimal delay, and securely. Here’s a high-level overview of how data flows through the application:

1. **User Actions**: Users interact with the frontend (React components) which triggers API calls.
2. **API Layer**: Next.js API routes handle requests and interact with Appwrite to fetch/store data.
3. **State Management**: Redux stores essential data to minimize API calls and improve performance.
4. **Database**: Appwrite manages user data, property listings, and other backend data.
5. **Payments**: Razorpay API handles payment processing securely.

---

## Getting Started

To get started with the project locally:

1. Clone the repository.
2. Install dependencies using `npm install` or `yarn`.
3. Configure environment variables as needed.
4. Run the development server using `npm run dev` or `yarn dev`.
5. Access the app on `http://localhost:3000`.

## Future Enhancements

- **Advanced Search Filters**: Implement more detailed search filters for property listings.
- **User Reviews and Ratings**: Allow users to leave reviews and rate properties.
- **Admin Dashboard**: Develop an admin dashboard for property management.
- **Mobile App**: Extend the platform with a React Native mobile app.

---

## Contributions

Contributions are welcome! Feel free to open issues or submit pull requests.

## License

This project is licensed under the MIT License.



## Tech Stack 
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
 ![React Hook Form](https://img.shields.io/badge/React--Hook--Form-EC5990?style=for-the-badge&logo=reacthookform&logoColor=white)
![React Icons](https://img.shields.io/badge/React--Icons-61DAFB?style=for-the-badge&logo=react&logoColor=white)
 ![Framer Motion](https://img.shields.io/badge/Framer--Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)
 ![Headless UI](https://img.shields.io/badge/Headless_UI-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
 ![Radix UI](https://img.shields.io/badge/Radix--UI-20232A?style=for-the-badge&logo=react&logoColor=white)
 ![CLSX](https://img.shields.io/badge/CLSX-61DAFB?style=for-the-badge&logo=react&logoColor=white)
 ![Tailwind Merge](https://img.shields.io/badge/Tailwind--Merge-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

 ![Redux](https://img.shields.io/badge/Redux-764ABC?style=for-the-badge&logo=redux&logoColor=white)

 ![NextAuth.js](https://img.shields.io/badge/NextAuth.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
 ![Cookies-Next](https://img.shields.io/badge/Cookies--Next-000000?style=for-the-badge&logo=nextdotjs&logoColor=white) ![Nookies](https://img.shields.io/badge/Nookies-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)


 ![Appwrite](https://img.shields.io/badge/Appwrite-F02E65?style=for-the-badge&logo=appwrite&logoColor=white)
 ![Nodemailer](https://img.shields.io/badge/Nodemailer-0D3F77?style=for-the-badge&logo=nodemailer&logoColor=white)
 ![Razorpay](https://img.shields.io/badge/Razorpay-2B3DB4?style=for-the-badge&logo=razorpay&logoColor=white)


 ![QSS](https://img.shields.io/badge/QSS-20232A?style=for-the-badge&logo=react&logoColor=white)
 ![Mini-SVG Data URI](https://img.shields.io/badge/Mini--SVG--Data--URI-20232A?style=for-the-badge&logo=react&logoColor=white)
