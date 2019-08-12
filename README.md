# PDF generation from HTML using Puppeteer and Handlebars

### Master branch using Puppeteer

```
yarn
yarn dev
```

### Puppeteer-core branch using a Dockerized version of headless Chrome

```
docker pull browserless/chrome
docker run -d -p 3000:3000 browserless/chrome
```

```
yarn
yarn dev
```

Resources:  
https://hub.docker.com/r/browserless/chrome/
