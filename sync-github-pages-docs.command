#!/bin/zsh

set -e

cd "$(dirname "$0")"

mkdir -p docs
cp index.html style.css app.js student-import-template.xlsx docs/

if [ ! -f docs/.nojekyll ]; then
  printf "Static GitHub Pages site. Do not process with Jekyll.\n" > docs/.nojekyll
fi

echo "Synced GitHub Pages files to docs/"
