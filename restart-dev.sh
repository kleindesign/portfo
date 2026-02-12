#!/bin/bash
# Quick script to restart the dev server when HMR hangs

echo "Killing existing dev server..."
pkill -f "next dev"
sleep 2

echo "Starting fresh dev server..."
cd "$(dirname "$0")"
npm run dev
