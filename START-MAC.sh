#!/bin/bash
echo ""
echo "============================================"
echo "  Lucky Star Jar — Setup & Start"
echo "============================================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
  echo "ERROR: Node.js is not installed."
  echo "Please download and install it from: https://nodejs.org"
  echo "Then run this script again."
  read -p "Press Enter to exit..."
  exit 1
fi

echo "Installing dependencies (this may take a minute)..."
npm install

echo ""
echo "Starting the app..."
echo "Opening http://localhost:5000 in your browser..."
echo ""
echo "Press Ctrl+C to stop the app."
echo ""

# Open browser after a short delay
(sleep 3 && open http://localhost:5000) &

npm run dev
