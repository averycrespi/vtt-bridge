#!/bin/bash

# Run automation tests in Chromium.
#
# Arguments will be passed through to `dmv.py`.

set -euo pipefail

if [[ ! -x "$(command -v chromedriver)" ]]; then
    echo 'Error: chromedriver not found' && exit 1
fi

if [[ ! -d 'tests/venv' ]]; then
    echo 'Creating virtual environment ...' && python3 -m venv tests/venv
fi

echo 'Activating virtual environment ...' && source tests/venv/bin/activate
echo 'Installing dependencies ...' && pip install --quiet -r tests/requirements.txt

if [[ ! -d 'tests/logs' ]]; then
    echo 'Creating logs directory ...' && mkdir -p tests/logs
fi

echo "Running automation tests in Chromium ..."
python tests/main.py chromium "$@"
echo 'Tests passed!'