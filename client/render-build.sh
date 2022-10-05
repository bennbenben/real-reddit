#!/usr/bin/env bash


#!/usr/bin/env bash
# exit on error
set -o errexit

export REACT_APP_RENDER_GIT_COMMIT=$RENDER_GIT_COMMIT

echo "Building... ⏳"
npm install
npm run build
echo "Build complete ✅"