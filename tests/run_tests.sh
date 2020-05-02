#!/bin/bash

set -euo pipefail

if [[ ! -x "$(command -v geckodriver)" ]]; then
    echo 'Error: geckodriver not found in PATH'
    exit 1
fi

if [[ ! -x "$(command -v chromedriver)" ]]; then
    echo 'Error: chromedriver not found in PATH'
    exit 1
fi

if [[ ! -d 'venv' ]]; then
    echo -e 'Creating virtual environment ... \c'
    python3 -m venv venv
    echo 'created!'
fi

echo -e 'Activating virtual environment ... \c'
source venv/bin/activate
echo 'activated!'

echo -e 'Installing dependencies ... \c'
pip install -q -r tests/requirements.txt
echo 'installed!'

if [[ ! -d 'logs' ]]; then
    echo -e 'Creating logs directory ... \c'
    mkdir -p logs
    echo 'created!'
fi

echo 'Running automation tests ...'
python tests/dmv.py firefox
python tests/dmv.py chromium
echo 'Tests passed!'