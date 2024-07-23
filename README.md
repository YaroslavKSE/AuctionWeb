# Web Auction Site

## Overview

This project is an eBay-like e-commerce auction site aimed at addressing the absence of auction websites in Ukraine. The platform enables users to register, create auction listings with photos, place bids, comment on listings, and manage a watchlist of items they are interested in.

## Live Version
The live version of this application is accessible at: https://webauction.store/

## Features

- User Authentication: Sign up, log in, and log out functionality.
- Auction Listings: Create new auction listings with title, description, starting bid, and optional images and categories.
- Bidding System: Place bids on active listings.
- Watchlist: Add listings to a personal watchlist.
- Categories: Browse listings by category.
- Auction Management: Close auctions and determine winners.

## Architecture

The application follows a client-server architecture:

- Frontend: React-based single-page application
- Backend: Python Flask RESTful API
- Database: MongoDB

## Technologies Used

### Frontend
- React v18
- React Router for navigation
- Axios for API requests
- CSS for styling

### Backend
- Python 3.12
- Flask web framework
- Flask-PyMongo for MongoDB integration
- Flask-Login for user session management

### Database
- MongoDB

### Deployment
- Docker for containerization
- Docker Compose for multi-container Docker applications
- AWS (EC2, ECR) DigitalOcean (Spaces) for hosting

## Getting Started

To run this application locally, follow these steps:

1. Clone the repository:
   ```
   git clone https://github.com/YaroslavKSE/AuctionWeb.git
   ```

2. Set up environment variables:
   - Create a `.env` file in the `flask_backend` directory for backend environment variables.
   - Create a `.env` file in the `react-frontend` directory for frontend environment variables.

3. Build and run the Docker containers:
   ```
   docker-compose up --build
   ```

4. Access the application:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## Project Structure

- `flask_backend/`: Contains the Flask backend application
- `react-frontend/`: Contains the React frontend application
- `docker-compose.yml`: Defines and runs multi-container Docker applications
- `Dockerfile-backend`: Dockerfile for the Flask backend
- `Dockerfile-frontend`: Dockerfile for the React frontend

## License

This project is licensed under the MIT License - see the `LICENSE.md` file for details.
