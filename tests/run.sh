#!/bin/bash

set -euo pipefail

echo -e "Looking for geckodriver ... \c"
if [ -x "$(command -v geckodriver)" ]; then
    echo "found!"
else
    echo "missing!" && exit 1
fi

echo -e "Looking for chromedriver ... \c"
if [ -x "$(command -v chromedriver)" ]; then
    echo "found!"
else
    echo "missing!" && exit 1
fi

echo -e "Activating virtual environment ... \c" && source venv/bin/activate && echo "activated!"

#TODO: run tests