# Rubik's Cube

An online Rubik's cube for beginners.

If it takes too long to visit github, visit https://gitee.com/chenyxuan/rubikscube-mirror for code and https://rubikscube-mu.vercel.app for deployment.

## Quick Build

Clone this repo and run (require nodejs 16.x and openssl)

```
npm install
npx webpack
npm test
npm run dev
```

Then you can visit http://localhost:8080/ for a demo in development mode.

## Releases

For prodcution, run

```
npm run build
```

The components will be compiled in `dist` folder in production mode.
