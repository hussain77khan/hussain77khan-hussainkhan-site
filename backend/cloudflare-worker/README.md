# HK Admin API — Cloudflare Worker

This Worker is the secure bridge between `/admin` and GitHub. The GitHub token and admin password remain server-side as Cloudflare encrypted secrets.

## Required variables
- ADMIN_USERNAME = admin
- GITHUB_OWNER = your GitHub username
- GITHUB_REPO = hussain-khan-site
- GITHUB_BRANCH = main
- ALLOWED_ORIGIN = your 4EVERLAND site URL (later replace/add your custom domain)

## Required secrets
- ADMIN_PASSWORD = your private admin password
- SESSION_SECRET = a long random string (32+ bytes recommended)
- GITHUB_TOKEN = GitHub fine-grained token restricted to this repository with **Contents: Read and write** only

After deploying the Worker, copy its URL into `admin/config.js`, commit and push. Then open `/admin/` on your website.
