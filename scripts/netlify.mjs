export const netlify = (url, options = {}) => {
  console.log(`https://api.netlify.com/api/v1/${url}`);
  return fetch(`https://api.netlify.com/api/v1/${url}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${process.env.NETLIFY_ACCESS_TOKEN}`,
      "Content-Type": "application/json",
    },
  }).then((res) => res.body && res.json());
};
