# RHB Wear — Boutique Website

A responsive front-end storefront built with HTML, CSS and vanilla JavaScript.

## Files
- `index.html` — page structure and storefront content
- `style.css` — responsive styling and Ivory / Dusty Rose / Champagne Gold theme
- `script.js` — product catalogue, filters, sorting, search, shopping bag and WhatsApp checkout

## Run locally
Open `index.html` in a browser. For a local development server, run:
`python -m http.server 8000`
Then visit `http://localhost:8000`.

## Before launch
1. Replace the sample product names, prices and image URLs in `script.js` with your actual inventory and product photography.
2. Replace `STORE_WHATSAPP` in `script.js` with your business WhatsApp number, including country code and digits only (for example, 92...).
3. Configure shipping charges, return policy, privacy policy and contact/social links.
4. Connect a backend for secure admin login, permanent product/order storage, inventory and customer data.
5. Integrate a supported Pakistani payment gateway before advertising online card payments. The current checkout prepares a WhatsApp order and does not process card payments.
6. Use properly licensed images that you own or have permission to use.

This is a front-end starter, not a deployed production store. Do not collect or store customer payment-card details in this static website.
