#!/bin/bash

set -euo pipefail

if [[ ! -x "$(command -v geckodriver)" ]]; then
    echo 'Error: geckodriver not found in PATH' && exit 1
fi

if [[ ! -x "$(command -v chromedriver)" ]]; then
    echo 'Error: chromedriver not found in PATH' && exit 1
fi

if [[ ! -d 'venv' ]]; then
    echo -e 'Creating virtual environment ... \c' && python3 -m venv venv && echo 'created!'
fi

echo -e 'Activating virtual environment ... \c' && source venv/bin/activate && echo 'activated!'

echo -e 'Installing dependencies ... \c' && pip install -q -r requirements.txt && echo 'installed!'

echo 'Running DMV automation tests in Firefox ...' && python tests/dmv.py firefox
echo 'Running DMV automation tests in Chromium ...' && python tests/dmv.py chromium