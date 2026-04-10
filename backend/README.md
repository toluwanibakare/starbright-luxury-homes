# Starbright Backend API

Node.js + Express + MySQL backend for the Starbright real estate project.

## Stack

- Node.js
- Express.js
- MySQL with `mysql2`
- Nodemailer
- Multer
- dotenv

## Features

- Property listing CRUD
- Local image and video uploads
- Inquiry and contact form handling
- SMTP email notifications
- Live chat with 24-hour active thread logic
- Comments moderation
- Static file serving for `/uploads`
- Versioned API routes under `/api/v1`

## Folder Structure

```txt
backend/
  database/
    schema.sql
  src/
    config/
    controllers/
    middleware/
    models/
    routes/
    services/
    utils/
    app.js
    server.js
  uploads/
    images/
    videos/
  .env.example
  package.json
```

## Setup

### Localhost

1. Copy `.env.example` to `.env`
2. Update MySQL and SMTP values
3. Create the database and import `database/schema.sql`
4. Install dependencies:

```bash
npm install
```

5. Start development server:

```bash
npm run dev
```

The API will run on `http://localhost:5000/api/v1` unless your `.env` changes it.

### Production / cPanel

1. Upload the `backend/` folder to your server
2. Create `.env` with production credentials and domain URLs
3. Import `database/schema.sql` into your production MySQL database
4. Install dependencies in the backend directory
5. Set your Node.js app startup file to:

```txt
src/server.js
```

6. Run production with:

```bash
npm start
```

Use environment values like:

```env
APP_URL=https://yourdomain.com
CLIENT_URL=https://yourdomain.com
```

Then proxy `/api` or point your frontend to:

```txt
https://yourdomain.com/api/v1
```

## Environment Variables

See `.env.example`.

Important keys:

- `PORT`
- `NODE_ENV`
- `APP_URL`
- `CLIENT_URL`
- `DB_HOST`
- `DB_PORT`
- `DB_USER`
- `DB_PASSWORD`
- `DB_NAME`
- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_USER`
- `SMTP_PASS`
- `SMTP_FROM`
- `ADMIN_EMAIL`

## Static Uploads

Uploaded files are saved locally:

- `uploads/images`
- `uploads/videos`

They are served by Express at:

```txt
/uploads/...
```

Example:

```txt
http://localhost:5000/uploads/images/123-example.jpg
```

## API Routes

### Properties

- `GET /api/v1/properties`
- `GET /api/v1/properties/:id`
- `GET /api/v1/properties/slug/:slug`
- `POST /api/v1/properties`
- `PUT /api/v1/properties/:id`
- `DELETE /api/v1/properties/:id`

### Media

- `POST /api/v1/properties/:id/images`
- `POST /api/v1/properties/:id/video`
- `DELETE /api/v1/media/:id`

### Inquiries

- `POST /api/v1/inquiries`
- `GET /api/v1/inquiries`
- `GET /api/v1/inquiries/:id`
- `PATCH /api/v1/inquiries/:id/read`
- `DELETE /api/v1/inquiries/:id`

### Chats

- `POST /api/v1/chats/start`
- `POST /api/v1/chats/:conversationId/message`
- `GET /api/v1/chats/:conversationId/messages?email=user@example.com`
- `GET /api/v1/admin/chats`
- `GET /api/v1/admin/chats/:conversationId`
- `POST /api/v1/admin/chats/:conversationId/reply`
- `PATCH /api/v1/admin/chats/:conversationId/close`
- `PATCH /api/v1/admin/chats/:conversationId/read`

### Comments

- `POST /api/v1/comments`
- `GET /api/v1/comments`
- `PATCH /api/v1/comments/:id/approve`
- `PATCH /api/v1/comments/:id/reject`
- `DELETE /api/v1/comments/:id`

### Contact

- `POST /api/v1/contact`

### Health

- `GET /api/v1/health`

## Chat Thread Logic

- A user must provide `name`, `email`, and a first `message` to start chatting
- If the latest conversation for that email is still `active` and the last message is within 24 hours, the API reuses that conversation
- If more than 24 hours have passed, the old conversation is marked `expired`
- If admin closes a conversation, it becomes `closed` and cannot accept new messages
- The frontend should start a new conversation when the API returns a conflict for an inactive thread

## Sample Responses

### Success

```json
{
  "success": true,
  "message": "Property fetched successfully.",
  "data": {
    "id": 1,
    "title": "Luxury Duplex",
    "slug": "luxury-duplex"
  },
  "meta": null
}
```

### Error

```json
{
  "success": false,
  "message": "Property not found.",
  "error": {
    "statusCode": 404,
    "details": null
  }
}
```

## Sample Mail Templates

### Admin Notification

- Subject: listing inquiry subject or `New website inquiry`
- Body includes name, email, phone, source, property id, and message

### Auto Reply

- Subject: `We received your message`
- Body confirms receipt and tells the user the team will reply shortly

## Notes

- Admin authentication is not included in this first backend pass
- Uploaded files are stored locally only
- Routes are built to work cleanly with localhost and production through environment variables
