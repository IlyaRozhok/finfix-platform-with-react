#!/bin/bash

cd backend && npm run dev &
cd frontend && npm start &
wait