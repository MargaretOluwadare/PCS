# PANACEA CLEANING SERVICE (PCS)

## Description

PCS is a comprehensive cleaning service management platform featuring:

- **User Management**: Authentication and user profiles
- **Booking System**: Schedule and manage cleaning services
- **Staff Management**: Manage cleaning staff and assignments
- **Payment Processing**: Integrated Stripe payments
- **WhatsApp Integration**: Communicate via WhatsApp
- **Analytics**: Track bookings and revenue
- **Subscription Plans**: Recurring service management
- **Referral System**: Customer referral tracking

## Tech Stack

- **Backend**: Node.js + Express.js
- **Database**: MongoDB
- **Authentication**: JWT
- **Payments**: Stripe
- **Communications**: Twilio (WhatsApp)
- **Maps**: Google Maps API
- **Containerization**: Docker

## Prerequisites

- Node.js 18+
- npm or yarn
- MongoDB (local or Atlas)
- Docker (optional, for containerization)

## Quick Start

### Local Development

1. Clone the repository:

```bash
git clone https://github.com/MargaretOluwadare/PCS.git
cd PCS
```

2. Install dependencies:

```bash
npm install
```

3. Create `.env` file from `.env.example`:

```bash
cp .env.example .env
```

4. Update `.env` with your configuration:

```env
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb://localhost:27017/panacea
JWT_SECRET=your_secret_key_here
# ... add other variables
```

5. Start the development server:

```bash
npm start
```

The server will run on `http://localhost:5000`

### Using Docker

1. Build the Docker image:

```bash
docker build -t panacea-backend .
```

2. Run with docker-compose (includes MongoDB):

```bash
docker-compose up -d
```

3. Access the application:

```
http://localhost:5000/api/health
```

## Environment Variables

See `.env.example` for all available variables. Key variables:

| Variable | Description | Required |
|----------|-------------|----------|
| `MONGO_URI` | MongoDB connection string | Yes |
| `PORT` | Server port | Yes |
| `JWT_SECRET` | JWT signing secret | Yes |
| `TWILIO_SID` | Twilio account SID | Yes |
| `STRIPE_SECRET_KEY` | Stripe secret key | Yes |
| `GOOGLE_MAPS_API_KEY` | Google Maps API key | Yes |
| `FRONTEND_URL` | Frontend application URL | Yes |

## Project Structure

```
PCS/
├── backend/              # Backend API code
├── frontend/             # Frontend code
├── middleware/           # Express middleware
├── models/              # MongoDB schemas
├── tests/               # Test files
├── Dockerfile           # Docker configuration
├── docker-compose.yml   # Docker Compose setup
├── server.js            # Main application file
├── package.json         # Dependencies
└── README.md           # This file
```

## API Endpoints

### Health Check

```
GET /api/health
```

### Authentication

```
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
```

### Bookings

```
GET /api/bookings
POST /api/bookings
GET /api/bookings/:id
PUT /api/bookings/:id
DELETE /api/bookings/:id
```

### Staff

```
GET /api/staff
POST /api/staff
GET /api/staff/:id
PUT /api/staff/:id
DELETE /api/staff/:id
```

### Payments

```
POST /api/payments/process
GET /api/payments/:id
```

### Analytics

```
GET /api/analytics/overview
GET /api/analytics/bookings
GET /api/analytics/revenue
```

## Development Workflow

1. Create a feature branch:

```bash
git checkout -b feature/your-feature-name
```

2. Make your changes and commit:

```bash
git commit -m "Add your feature"
```

3. Push to your fork:

```bash
git push origin feature/your-feature-name
```

4. Create a Pull Request

## Testing

Run tests with:

```bash
npm test
```

Run with coverage:

```bash
npm run coverage
```

## Code Quality

Run linter:

```bash
npm run lint
```

Fix linting issues:

```bash
npm run lint:fix
```

## Deployment

For detailed deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md)

Quick deployment options:

- **Railway**: Connect repo at https://railway.app → set environment variables → deploy
- **Heroku**: `git push heroku main`
- **Docker**: `docker-compose up -d`

## Security

- Helmet.js for HTTP headers
- CORS protection
- Rate limiting
- Input validation and sanitization
- JWT authentication
- Environment variable management

## Performance

- MongoDB indexing
- Request caching
- Compression
- Error handling and logging
- Health checks

## Logging

- Winston logger
- File-based logging (error.log, combined.log)
- Console output in development
- Request logging with Morgan

## Support

For issues and questions:

1. Check existing issues
2. Review documentation
3. Create a new GitHub issue

## License

MIT

## Author

Margaret Oluwadare

## Contributing

Contributions welcome! Please read our contributing guidelines.

## Changelog

See [CHANGELOG.md](./CHANGELOG.md) for version history.