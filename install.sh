#!/bin/bash

# Install the frontend boilerplate
if ! type "git" > /dev/null; then
  echo "Frontend boilerplate requires Git to install, please install it then try again."
  exit
fi

if ! type "node" > /dev/null; then
  echo "Frontend boilerplate requires Node to install, please install it then try again."
  exit
fi
 
# Read project name
echo -n "Project name: "
read NAME </dev/tty

if [ -z "$NAME" ]; then
    echo "Invalid project name, cannot be empty"
    exit
fi

if [ -d "$NAME" ]; then
    echo "The directory $NAME already exists, please use another name"
    exit
fi

git init "$NAME"
cd "$NAME"
git pull git@github.com:gosukiwi/frontend-boilerplate.git
npm install
gulp
