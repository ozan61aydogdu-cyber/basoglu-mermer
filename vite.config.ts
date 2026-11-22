import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

const securityHeaders = {
  "Content-Security-Policy": "default-src 'self'; base-uri 'self'; object-src 'none'; frame-src 'self' https://maps.google.com https://www.google.com; img-src 'self' data: https://images.unsplash.com https://upload.wikimedia.org https://smfmermer.com https://www.martasmermer.com.tr https://tezgahsepeti.com https://eyla.com.tr https://www.gramerstones.com https://img500.exportersindia.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; script-src 'self' 'unsafe-inline' 'unsafe-eval'; connect-src 'self' ws://127.0.0.1:5173 ws://localhost:5173; frame-ancestors 'none'; form-action 'self' https://wa.me",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
  "Cross-Origin-Opener-Policy": "same-origin",
  "Cross-Origin-Resource-Policy": "same-origin",
  "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
};

export default defineConfig({
  base: "/basoglu-mermer/",
  plugins: [react(), tailwindcss()],
  server: { headers: securityHeaders },
  preview: { headers: securityHeaders },
});
