addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  let htmlContent = '';
  let htmlStyle = 'body{padding:6em; font-family: sans-serif;} h1{color:#f6821f;}';

  const { country, city, continent, region, regionCode, timezone } = request?.cf

  htmlContent += `<p> Country: ${country} </p>`;
  htmlContent += `<p> City: ${city} </p>`;
  htmlContent += `<p> Continent: ${continent} </p>`;
  htmlContent += `<p> Region: ${region} </p>`;
  htmlContent += `<p> RegionCode: ${regionCode} </p>`;
  htmlContent += `<p> Timezone: ${timezone} </p>`;

  let html = `<!DOCTYPE html>
<head>
  <title> Geolocation: Get user's Region </title>
  <style> ${htmlStyle} </style>
</head>
<body>
  <h1>Geolocation: Get user's Region!</h1>
  <p>You now have access to geolocation data about where your user is visiting from.</p>
  ${htmlContent}
</body>`;

  return new Response(html, {
    headers: {
      'content-type': 'text/html;charset=UTF-8',
    },
  });
}