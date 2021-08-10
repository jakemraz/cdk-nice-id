#!/bin/sh

python3 -m pip install -r requirements.txt -t python
zip -r layer.zip python/*
rm -rf python