import { netlify } from "./netlify.mjs";

console.log("--------", process.env, "-------");

if (process.env.CONTEXT === "deploy-preview") {
  console.log("Setting deploy preview environment variable...");

  await netlify(
    `/accounts/${process.env.NETLIFY_ACCOUNT_ID}/env/DATABASE_URL?site=${process.env.NETLIFY_SITE_ID}`,
    {
      method: "PATCH",
      body: JSON.stringify({
        context: "deploy-preview",
        value: process.env.DATABASE_URL,
      }),
    }
  );

  console.log("Setting has been set.");
}
