About

The GDP (Group Design Project) Model Recommender is a Node.js-based application designed to recommend AI project models tailored to users' specific requirements. This project is ideal for individuals or organizations with little knowledge of AI but with a clear need for AI-powered solutions.

The application not only assists in identifying the most suitable AI models but also extends its functionality to deploy servers for the selected models, offering a complete end-to-end solution.

Features

**Model Recommendation**: Suggests AI models based on user requirements.

**Deployment Assistance**: Automates the deployment of recommended models.

**User-Friendly API**: Simple and intuitive RESTful API for interacting with the system.

**Scalable Design**: Built to handle a variety of user requirements and scale as needed.

**Error Handling and Logging**: Ensures robust operation and easy debugging.

#Installation

To set up the project locally:

# Clone the repository
git clone https://github.com/Udhay707/GDP-Model-Recommender.git

# Navigate to the project directory
cd GDP-Model-Recommender

# Install dependencies
`npm install`

# Start the application
`npm start`

Prerequisites

Node.js version 18 or later.

# Docker
`docker pull udhay707/model-recommender`

`docker run -d -p 3000:3000 --env-file <.env> --name=model-recommender-container udhay707/model-recommender:latest`

A valid .env file with required configurations (see .env.example).

Usage

Start the server using npm start.

Access the API at http://localhost:3000 (default port).

Screenshots

![image](https://github.com/user-attachments/assets/19bb8c35-2c30-49b4-b10e-7d02043bddf9)
