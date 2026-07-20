import type { NextConfig } from "next";

const securityHeaders = [
  // Nu lăsa alte site-uri să pună site-ul într-un <iframe> (clickjacking).
  { key: "X-Frame-Options", value: "DENY" },
  // Browserul nu ghicește tipul unui fișier după conținut, doar după Content-Type.
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Nu trimite URL-ul complet (poate conține query params) către alte site-uri la click pe link.
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Dezactivează accesul la cameră/microfon/locație — site-ul nu are nevoie de ele.
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
  // Forțează HTTPS la reconectare timp de 2 ani.
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains",
  },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
