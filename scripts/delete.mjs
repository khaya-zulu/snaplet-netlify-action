import { netlify } from "./netlify.mjs";

const envVars = await netlify(
  `/accounts/${process.env.NETLIFY_ACCOUNT_ID}/env?site=${process.env.NETLIFY_SITE_ID}`,
  { method: "GET" }
);

const envVar = envVars?.find((item) => item.key === "DATABASE_URL")?.values;

const branchedEnvVar = envVar?.find(
  (item) =>
    item?.context_parameter === process.env.GITHUB_HEAD_REF &&
    item.context === "branch"
);

if (Boolean(branchedEnvVar)) {
  console.log("Deleting DATABASE_URL environment variable...");

  await netlify(
    `/accounts/${process.env.NETLIFY_ACCOUNT_ID}/env/DATABASE_URL/value/${branchedEnv.id}?site=${process.env.NETLIFY_SITE_ID}`,
    {
      method: "DELETE",
    }
  );

  console.log("DATABASE_URL environment variable deleted.");
}
