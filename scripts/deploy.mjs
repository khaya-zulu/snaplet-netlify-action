import { netlify } from "./netlify.mjs";

const buildHookEndpoint = `/sites/${process.env.NETLIFY_SITE_ID}/build_hooks`;

const buildHooks = await netlify(buildHookEndpoint, { method: "GET" });

let buildHook = buildHooks.find(
  (hook) => hook.branch === process.env.GITHUB_HEAD_REF
);

if (!Boolean(buildHook)) {
  buildHook = await netlify(buildHookEndpoint, {
    method: "POST",
    body: JSON.stringify({
      branch: process.env.GITHUB_HEAD_REF,
    }),
  });
}

console.log("Creating deployment...");
await fetch(buildHook.url, { method: "POST" });
console.log("Deployment created.");
