# PDF generation from HTML using Puppeteer and Handlebars

### Master branch using Puppeteer

```
yarn
yarn dev
```

### Puppeteer-core branch using a Dockerized version of headless Chrome

```
docker pull browserless/chrome
```

Start container:
```
docker run -d -p 4444:3000 browserless/chrome
```

Or use Docker compose:
```
docker-compose up -d
```

```
yarn
yarn dev
```

Resources:  
https://hub.docker.com/r/browserless/chrome/
