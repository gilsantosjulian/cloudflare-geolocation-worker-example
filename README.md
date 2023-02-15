# 👷 `worker-template` Hello World

A template for kick starting a Cloudflare worker project.

[`index.js`](https://github.com/cloudflare/worker-template/blob/master/index.js) is the content of the Workers script.

#### Wrangler

To generate using [wrangler](https://github.com/cloudflare/wrangler)

```
wrangler generate projectname https://github.com/cloudflare/worker-template
```

Further documentation for Wrangler can be found [here](https://developers.cloudflare.com/workers/tooling/wrangler).

### 1. Get Location Data - Location-based personalization at the edge with Cloudflare Workers

Geolocation data is now accessible and free for all developers on Workers platform, including users on the free plan! [Location-based personalization at the edge with Cloudflare Workers](https://blog.cloudflare.com/location-based-personalization-using-workers/). Location-based personalization helps to show what’s most relevant to the users, be it tickets for movies in their area or content in their local language.

With geolocation data available on the server side, there’s no configuration needed for users to set their location.

### 2. Geolocation Worker Example

Hello World! This is a simple Worker to show us the available geolocation data fields and how to access them. Refer to the source code and live demo to learn more.

With this worker and thanks to the latest Cloudflare update, we can obtain more information on the geolocation of users. According to the ticket (where the country region/state is required), this configuration allows us to get the information in the request.cf object instead of request.headers.get('cf-ipcountry') as is currently implemented. 

The *“cf”* object contains two important parameters for our use case.

- Region `string | null`: If known, the ISO 3166-2 name for the first level region associated with the IP address of the incoming request, for example, "Texas".

- RegionCode `string | null`: If known, the ISO 3166-2 code for the first-level region associated with the IP address of the incoming request, for example, "TX".

### 3. Install and run Wrangler [Get started guide - Cloudflare Workers docs](https://developers.cloudflare.com/workers/get-started/guide/)

1. Create an account (https://dash.cloudflare.com/sign-up)
2. Install Wrangler globally
- ```npm install -g wrangler```

3. Depending on your case, there’s two posible options to start a project, you can create from zero a project - using init command - or use a Workers templates - using generate command

    a. Init: Create a skeleton Wrangler project (https://developers.cloudflare.com/workers/wrangler/commands/)

    - ```wrangler init [NAME] [-y / --yes] [--from-dash]```

    b. Generate

    - ```wrangler generate [project_name] [template]```

4. Start a local server for developing your Worker

  - ```wrangler dev [SCRIPT] [OPTIONS]```

  - ```wrangler dev --local index.js```

  -*—local* flag run the preview of the Worker directly on your local machine (local browser) - easy to test

  - Automatically the browser will be open showing some data fields described on the worker

### 4. Worker example to get User’s geolocation - Region code
```
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
```


### US - Example
<img width="767" alt="Pasted Graphic 3" src="https://user-images.githubusercontent.com/23086872/219118597-4ab59074-c996-49b5-82e1-135647bb511b.png">


### CA - Example
<img width="795" alt="Pasted Graphic 2" src="https://user-images.githubusercontent.com/23086872/219118637-7c7f29c1-68b0-4735-b9df-f7953ded45bc.png">

### Posible issues

Cannot read property 'country of undefined - __‘cf’__ object not being set

- Where are you editing the worker from? the request.cf object isn’t set in the dashboard editor or cloudflareworkers.com 1, it’s only set if you use wrangler dev or if the worker is published to the workers.dev subdomain or a custom domain
