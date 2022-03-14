This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

To have a consistent configuration across all environemnts: development, staging and production, we'll always access our apps through HTTPS. In order to make this possible in a local environment, we need to generate self-signed certificates and tell our machines to trust them before spinning up the app.

The following commands will do the job for you depending on the platform you're using to run the application.

### on MacOS

```bash
make init-on-mac
```



### on Linux
If your machine is runnning a Linux distribution, the process to trust self-signed certificates is as follows.

```bash
make init-on-linux
```


By now you should be able to open [https://client.codelibrary.dev](https://client.codelibrary.dev) with your browser to see the application running.
