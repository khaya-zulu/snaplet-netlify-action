import { netlify } from "./netlify.mjs";

console.log("Setting deploy preview environment variable...");

await Promise.all([
  netlify(
    `/accounts/${process.env.NETLIFY_ACCOUNT_ID}/env/DATABASE_URL?site_id=${process.env.NETLIFY_SITE_ID}`,
    {
      method: "PATCH",
      body: JSON.stringify({
        context: "branch-deploy",
        value: process.env.DATABASE_URL,
      }),
    }
  ),
  netlify(
    `/accounts/${process.env.NETLIFY_ACCOUNT_ID}/env/DATABASE_URL?site_id=${process.env.NETLIFY_SITE_ID}`,
    {
      method: "PATCH",
      body: JSON.stringify({
        context: "deploy-preview",
        value: process.env.DATABASE_URL,
      }),
    }
  ),
]);

console.log({ test });

console.log("Setting has been set.");
