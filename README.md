This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Requirements

- Docker.
- Docker Compose.
- Google Cloud SDK.
- Node.js 16 (we recommend using `nvm` to support multiple Node.js versions)

## Getting Started

Just before we get started, make sure you are running Node 16.

```bash
node --version # should output something similar to v16.x.x
```

In case you are using nvm, switch to the right version by typing the following command.

```bash
nvm use 16
```

Now that we know we are running on the right environment, let's sping up the app.
To facilitate fullstack development but still enable a stable environment,
we provide two different setups with a few targets facilitate switching between them.

### Developing with the last stable release of the CODE Library's Server

```bash
make start
```

### Developing client and server together

```bash
make start-fullstack
```

By now you should be able to open [http://localhost:3000](http://localhost:3000) in your browser to see the application running.

## Deployment workflows

We have two environments for deployment: staging and production. The first is running on Heroku + Netlify, while the former runs on GCP. Each one is triggered based on the name of the branch being pushed to the repository.

- Pushes to master will trigger a deployment to the staging environment.
- Creating or updating a pull requests will also trigger a deployment to the staging environment.
- Tags prefixed with a "v" (i.e., v1.0.0) will trigger a deployment to the production environment.
