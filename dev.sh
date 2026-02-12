#!/bin/bash
# Quick dev server restart script

# Kill any process on port 3000
lsof -ti:3000 | xargs kill -9 2>/dev/null

# Wait a moment
sleep 1

# Start dev server with proper node path
export PATH="/Users/dmk/.nvm/versions/node/v24.11.0/bin:$PATH"
npm run dev
