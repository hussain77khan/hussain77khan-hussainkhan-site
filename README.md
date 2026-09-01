# Hussain Khan Website v0.3.0

Static bilingual portfolio + secure content management foundation.

## Public site
Content is loaded from `data/content.json`. Main site, Films, Plugins, DCTL, Downloads, About and Contact are connected to this content model.

## Admin flow
`/admin/` → Login → Edit → Publish.

The admin never contains the GitHub token. Publishing is handled by a Cloudflare Worker in `backend/cloudflare-worker/`, which stores secrets server-side and commits `data/content.json` to GitHub. 4EVERLAND then redeploys from GitHub automatically.

## Before Admin works
1. Deploy the Cloudflare Worker.
2. Configure its vars/secrets.
3. Put the Worker URL in `admin/config.js`.
4. Commit and push.

## Fonts
The CSS remains prepared for PNU fonts. Keep your licensed font files private and add your own copies locally to `assets/fonts/` if permitted by your license.
