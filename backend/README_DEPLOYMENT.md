# Backend Deployment Notes

## Render setup

If you deploy the backend as a separate Render service, use these settings:

- Root Directory: `backend`
- Build Command: `npm install`
- Start Command: `npm start`

## Common issue

`Error: Cannot find module 'express'` means the backend dependencies were not installed in the folder where Render ran the start command.

This usually happens when Render is pointing at the repo root instead of the `backend/` folder.
