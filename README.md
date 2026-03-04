This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Database Setup (Vercel Postgres & Prisma)

This project uses [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres) for the database and [Prisma](https://www.prisma.io/) as the ORM.

### 1. Provision Vercel Postgres

Follow the official Vercel documentation to provision a new Vercel Postgres database for your project:
[https://vercel.com/docs/storage/vercel-postgres/quickstart](https://vercel.com/docs/storage/vercel-postgres/quickstart)

### 2. Configure DATABASE_URL

Once your Vercel Postgres database is provisioned, retrieve your `DATABASE_URL` from the Vercel dashboard. Then, create or update your `.env` file in the project root with the following:

```
DATABASE_URL="<your-vercel-postgres-connection-string>"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="<your-nextauth-secret>"
```

Replace `<your-vercel-postgres-connection-string>` with the actual connection string from Vercel. Ensure `NEXTAUTH_URL` and `NEXTAUTH_SECRET` are also set correctly.

### 3. Push Prisma Schema to Database

After configuring `DATABASE_URL`, apply the Prisma schema to your database by running:

```bash
npx prisma db push
```

This command will create the necessary tables in your Vercel Postgres database based on `prisma/schema.prisma`.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
