#!/bin/bash

echo Starting Server...
gunicorn -w 4 -b 127.0.0.1:8000 "app:create_app()" --daemon
