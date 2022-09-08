export const netlify = (url, options = {}) =>
  fetch(`https://api.netlify.com/api/v1/${url}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${process.env.NETLIFY_ACCESS_TOKEN}`,
      "Content-Type": "application/json",
    },
  }).then((res) => {
    if (res.body) {
      return res.json();
    }
  });
