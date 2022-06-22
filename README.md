<h1 align="center">
  <br>
  <a href="https://next-quote.vercel.app"><img src="/public/next-quote.png" alt="Next Quote" width="200"></a>
  <br>
  <br>
  Next Quote - Which quote is funnier?
  <br>
</h1>

<h4 align="center">An application for voting on your favourite technology/development quotes. It's like ranking the stars but for geeks ✨.</h4>

<p align="center">
      <img src="https://vercelbadge.vercel.app/api/royappeldoorn/next-quote"
         alt="Gitter">
</p>

![next-quote](https://user-images.githubusercontent.com/22290247/175032567-2aa08625-e691-4519-9404-91237669da46.gif)

## Features

- Vote between two quotes
- See the overall results (cached and revalidated after 10 minutes once a user visits the /results page)

## Tech-stack

- [Next.js](https://nextjs.org/) SSR React framework (used for caching the /results page)
- [Tailwind.css](https://tailwindcss.com/) for utility-first CSS styling
- [Prisma](https://www.prisma.io/) as Database ORM
- [Planetscale](https://planetscale.com/) as MySQL database host

## Installation and Setup Instructions

Prerequisite:

- Local MySQL database / Planetscale database with local connection

Clone down this repository. You will need `node` and `npm` installed globally on your machine. 

Setup

1. `npm install`
2. Create `.env` file
3. Add a `DATABASE_URL=` variable with the connection string to your MySQL instance
4. Generate database schema - `npx prisma generate`
5. Seed the database with quotes - `npm run ts-node ./scripts/db-backfill.ts`
6. Run the dev server - `npm run dev`
