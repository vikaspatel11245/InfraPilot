#!/bin/bash

echo "=========================================================="
echo "          InfraPilot Local System Bootstrapper"
echo "=========================================================="

# Check if pnpm is installed
if ! command -v pnpm &> /dev/null
then
    echo "[Error] pnpm is required to manage workspaces. Installing..."
    npm install -g pnpm
fi

echo "[Step 1] Bootstrapping monorepo workspace dependencies..."
pnpm install

echo "[Step 2] Executing build compiler checks across packages..."
pnpm build

echo "[System Ready] Launch local console using: pnpm dev"
