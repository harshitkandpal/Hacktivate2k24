# Cyber Phishing Dashboard ⚡

A high-tech, modern command center UI designated for AI-driven operational target intelligence and phishing simulation testing. It features a completely responsive, dark glassmorphic cybersecurity-themed user interface equipped with analytical telemetry charts and intelligence data grids. 

## Features

- **Dashboard Operations Center**: Extract and display target network domain data
- **Manual & CSV Batch Target Ingestion**: Rapidly inject new targets for simulation campaigns
- **AI Payload Generation Interface**: Uses Gemini API/Custom ML to craft sophisticated simulation emails
- **Telemetry Charts**: Interactive analytics charting infiltration success and failure rates.
- **Modern Cyber Aesthetics**: Complete neon, glassmorphism, responsive interface.

## Quick Start Guide

### 1. Environment Configuration

To prevent exposing credentials to public repositories (like GitHub), we use environment variables.

1. Clone the repository and navigate to the project root.
2. Create a new file named `.env` in the root directory.
3. Copy the contents of `.env.example` into your new `.env` file and replace the placeholder strings with your actual Firebase Configuration credentials.

```bash
REACT_APP_FIREBASE_API_KEY="your_firebase_api_key_here"
REACT_APP_FIREBASE_AUTH_DOMAIN="your_firebase_auth_domain_here"
# ...other firebase config
REACT_APP_GEMINI_API_KEY="your_gemini_api_key_here"
```

*Note: The `.env` file is excluded from git via `.gitignore` to ensure your keys remain safe!*

### 2. Installation

Install all required dependencies:

```bash
npm install
```

### 3. Launch Development Server

Once your environment is set up and dependencies are installed, you can launch the app locally:

```bash
npm start
```

This will run the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Theme & UI

This application leans heavily on **Tailwind CSS**. Custom cyber-themed colors such as `cyber-primary` and `cyber-accent` have been configured directly into the Tailwind input directives using standard Hex colors like `#00ffcc`.
