import { netlify } from "./netlify.mjs";

const envVars = await netlify(
  `/accounts/${process.env.NETLIFY_ACCOUNT_ID}/env?site_id=${process.env.NETLIFY_SITE_ID}`,
  { method: "GET" }
);

const envVar = envVars?.find(
  (item) => item.key === process.env.DATABASE_ENV_VAR
)?.values;

const branchedEnvVar = envVar?.find(
  (item) =>
    item?.context_parameter === process.env.GITHUB_HEAD_REF &&
    item.context === "branch"
);

if (Boolean(branchedEnvVar)) {
  console.log(
    `Deleting ${process.env.DATABASE_ENV_VAR} environment variable...`
  );

  await netlify(
    `/accounts/${process.env.NETLIFY_ACCOUNT_ID}/env/${process.env.DATABASE_ENV_VAR}/value/${branchedEnvVar.id}?site_id=${process.env.NETLIFY_SITE_ID}`,
    {
      method: "DELETE",
    }
  );

  console.log(`${process.env.DATABASE_ENV_VAR} environment variable deleted.`);
} else {
  console.log(
    `Could not found find ${process.env.DATABASE_ENV_VAR} linked to branch: ${process.env.GITHUB_HEAD_REF}`
  );
}
