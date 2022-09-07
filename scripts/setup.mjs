import { netlify } from "./netlify.mjs";

console.log("Setting deploy preview environment variable...");

const test = await netlify(
  `/accounts/${process.env.NETLIFY_ACCOUNT_ID}/env/DATABASE_URL?site_id=${process.env.NETLIFY_SITE_ID}`,
  {
    method: "PATCH",
    body: JSON.stringify({
      context: "deploy-preview",
      value: process.env.DATABASE_URL,
    }),
  }
);

console.log({ test });

console.log("Setting has been set.");
