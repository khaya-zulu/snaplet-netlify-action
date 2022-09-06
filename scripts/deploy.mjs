import { netlify } from "./netlify.mjs";

console.log("Creating deployment...");

await netlify(`/deploys`, {
  method: "POST",
  body: JSON.stringify({ branch: process.env.GITHUB_HEAD_REF }),
});

console.log("Deployment created.");
