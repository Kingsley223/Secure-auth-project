# Secure Authentication & Session Engineering

A Node.js/Express authentication project demonstrating secure user authentication, password hashing, session management, secure cookies, logout/session invalidation, and HTTP security headers.

## Project Overview

This project was built as part of a cybersecurity lab focused on cookie-based authentication and secure session engineering.

The application uses **Express.js**, **bcrypt**, and **express-session** to create a simple authentication system with security-focused session configuration.

The main goal is to understand how authenticated sessions work and how common session-related security risks can be reduced.

## Technologies Used

* **Node.js** — JavaScript runtime
* **Express.js** — Web application framework
* **bcrypt** — Password hashing
* **express-session** — Server-side session management
* **Git & GitHub** — Version control and project hosting
* **curl** — API and authentication testing
* **Firefox DevTools** — Cookie and HTTP header inspection

## Security Features

### Password Hashing

User passwords are not stored as plain text.

Passwords are hashed using `bcrypt` before being stored, making it significantly harder to recover the original password if the database is compromised.

Authentication uses password comparison rather than comparing plain-text passwords.

### Secure Session Cookies

The application uses session cookies with security-focused settings such as:

* `httpOnly` — Helps prevent JavaScript from accessing the session cookie.
* `secure` — Ensures cookies are sent over HTTPS when enabled in the appropriate environment.
* `sameSite` — Helps reduce cross-site request forgery risks.
* Session expiration and timeout controls.

### Session Authentication

After successful login, the server creates an authenticated session.

Protected routes check whether the user has a valid session before allowing access.

Example protected endpoint:

```text
GET /dashboard
```

Unauthenticated requests are rejected.

### Logout and Session Invalidation

The `/logout` endpoint destroys the user's session so that the session can no longer be used after logout.

### Session Fixation Protection

The project demonstrates changing or regenerating the session identifier during authentication to reduce the risk of session fixation attacks.

### Cache-Control Protection

Sensitive authenticated responses are configured to prevent browsers and intermediate caches from storing private authentication-related content.

## Project Structure

```text
secure-auth/
├── cookies.txt
├── cookies1.txt
├── create-user.js
├── package.json
├── package-lock.json
├── server.js
└── node_modules/
```

### `server.js`

Contains the Express server, authentication routes, session configuration, protected dashboard route, and logout functionality.

### `create-user.js`

Used to create a user with a bcrypt-hashed password.

### `cookies.txt`

Used during `curl` testing to store authentication cookies.

### `cookies1.txt`

Used for additional cookie and session testing.

### `package.json`

Contains the project's dependencies and npm configuration.

## Installation

### 1. Clone the Repository

```bash
git clone <YOUR-GITHUB-REPOSITORY-URL>
cd secure-auth
```

### 2. Install Dependencies

```bash
npm install
```

The main dependencies are:

```text
express
express-session
bcrypt
```

## Running the Project

Start the server with:

```bash
node server.js
```

The application runs locally on:

```text
http://localhost:3000
```

## Creating a User

The project includes `create-user.js` for creating a user with a hashed password.

Run:

```bash
node create-user.js
```

The generated password hash can then be used by the application for authentication.

Do not store real passwords or sensitive credentials in the repository.

## Testing Authentication

### Login

A login request can be tested using `curl`:

```bash
curl -i -c cookies.txt -X POST http://localhost:3000/login \
-H 'Content-Type: application/json' \
-d '{"username":"admin_user","password":"YOUR_PASSWORD"}'
```

A successful login should return an HTTP `200 OK` response and set a session cookie.

### Access Dashboard

Use the saved cookie:

```bash
curl -i -b cookies.txt http://localhost:3000/dashboard
```

If the session is valid, the authenticated dashboard response should be returned.

Without a valid session, the endpoint should reject the request.

### Logout

```bash
curl -i -b cookies.txt -X POST http://localhost:3000/logout
```

After logout, attempting to access the dashboard with the invalidated session should fail.

## Checking Cookies in Firefox

The session cookie can also be inspected using Firefox Developer Tools.

1. Start the Node.js server.
2. Open the application in Firefox.
3. Log in.
4. Open Developer Tools.
5. Go to **Storage**.
6. Select **Cookies**.
7. Select the local application.
8. Inspect the session cookie.

The cookie configuration can be checked for security properties such as:

```text
HttpOnly
Secure
SameSite
```

## Security Testing

The project can be tested for several authentication and session-security behaviors.

### Test 1 — Login

Verify that valid credentials successfully create an authenticated session.

### Test 2 — Invalid Login

Verify that incorrect credentials are rejected.

### Test 3 — Protected Dashboard

Verify that `/dashboard` cannot be accessed without a valid authenticated session.

### Test 4 — Logout

Verify that logging out invalidates the session.

### Test 5 — Session ID Change

Verify that the session identifier changes appropriately during authentication to help prevent session fixation.

### Test 6 — Cookie Security

Inspect the session cookie in Firefox Developer Tools and verify its security attributes.

### Test 7 — Cache-Control Headers

Check the response headers:

```bash
curl -i http://localhost:3000/dashboard
```

Sensitive authenticated responses should include appropriate cache-control directives.

## Security Concepts Demonstrated

This project provides practical experience with:

* Authentication
* Password hashing
* Salted password hashes
* bcrypt
* Session-based authentication
* HTTP cookies
* Secure cookies
* `HttpOnly`
* `Secure`
* `SameSite`
* Session expiration
* Session invalidation
* Session fixation
* Browser caching
* HTTP security headers
* Protected routes
* Authentication testing with `curl`
* Browser security inspection

## Learning Objectives

By completing this project, the following concepts are demonstrated:

1. How password hashing protects stored credentials.
2. How bcrypt can be used for password authentication.
3. How server-side sessions maintain authentication state.
4. How cookies are used to identify sessions.
5. How secure cookie attributes improve session security.
6. How protected routes prevent unauthorized access.
7. How logout invalidates an authenticated session.
8. How session regeneration helps prevent session fixation.
9. How cache-control headers protect sensitive responses.
10. How authentication behavior can be tested using command-line tools and browser developer tools.

## Important Note

This is an **educational cybersecurity project** designed to demonstrate authentication and session-security concepts.

It is not intended to be deployed directly into a production environment without additional security measures, configuration, monitoring, error handling, secret management, HTTPS, and a proper database.

Never commit real passwords, API keys, session secrets, or other sensitive credentials to GitHub.

## Author

**KINGSLEY**

This project was created for cybersecurity learning and practical authentication and session-management training for students.
