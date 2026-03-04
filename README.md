# CSLS - Comprehensive Student Learning System

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app), designed to be a lite Learning Management System (LMS).

## Table of Contents

- [CSLS - Comprehensive Student Learning System](#csls---comprehensive-student-learning-system)
- [Table of Contents](#table-of-contents)
- [Project Features](#project-features)
- [Technology Stack](#technology-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [1. Clone the Repository](#1-clone-the-repository)
  - [2. Install Dependencies](#2-install-dependencies)
  - [3. Environment Variables Setup](#3-environment-variables-setup)
    - [NEXTAUTH_SECRET](#nextauth_secret)
    - [DATABASE_URL (Vercel Postgres)](#database_url-vercel-postgres)
  - [4. Database Schema Push (Prisma)](#4-database-schema-push-prisma)
  - [5. Run the Development Server](#5-run-the-development-server)
- [Learning More](#learning-more)
- [Deployment](#deployment)

## Project Features

### Core Functionality
- **Authentication:** Secure user login and registration.
- **Role Management:** Define and assign roles (e.g., Admin, Teacher, Student) with appropriate permissions.
- **Student Progress Tracking:** Monitor student performance, completion rates, and grades.
- **Class Management:** Create, manage, and enroll students in classes.
- **Lessons Management:**
    - **Video Lessons:** Upload unlisted videos to YouTube and embed them within the platform.
    - **Text-based Lessons:** Create and manage textual lesson content.
- **Assignments and Tests:** Create, assign, and grade assignments and tests.

### User Interfaces
- **Back Office UI:** For administrative tasks (e.g., user management, platform configuration, analytics).
- **Teacher UI:** For managing classes, lessons, assignments, and tracking student progress.
- **Student UI:** For accessing lessons, submitting assignments, taking tests, and viewing their progress.

## Technology Stack

- [Next.js](https://nextjs.org/) (with [TypeScript](https://www.typescriptlang.org/))
- [Tailwind CSS](https://tailwindcss.com/)
- Database: [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres)
- ORM: [Prisma](https://www.prisma.io/)
- Authentication Library: [NextAuth.js](https://next-auth.js.org/)

## Getting Started

Follow these steps to get your development environment set up.

### Prerequisites

Ensure you have Node.js (v18.x or higher) and npm (or yarn/pnpm/bun) installed on your machine.

### 1. Clone the Repository

```bash
git clone https://github.com/zayarmoekaung/csls_lms.git
cd csls_lms
```

### 2. Install Dependencies

Install the project dependencies using your preferred package manager:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

### 3. Environment Variables Setup

Create a `.env` file in the root of your project. This file will store sensitive information and configuration. Below are the required variables:

#### NEXTAUTH_SECRET

This is a secret key used by NextAuth.js to sign and encrypt session tokens. Generate a strong, random string (e.g., using `openssl rand -base64 32` in your terminal).

```
NEXTAUTH_SECRET="<your-generated-strong-secret>"
```

#### DATABASE_URL (Vercel Postgres)

This project uses Vercel Postgres. You will need to provision a database instance via the [Vercel dashboard](https://vercel.com/dashboard). Once provisioned, retrieve your `DATABASE_URL` connection string.

```
DATABASE_URL="<your-vercel-postgres-connection-string>"
```

Your `.env` file should look similar to this:

```
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your_generated_secret_here"
DATABASE_URL="postgres://user:password@host:port/database?sslmode=require"
```

### 4. Database Schema Push (Prisma)

After configuring your `DATABASE_URL`, push the Prisma schema to your database. This will create all the necessary tables.

```bash
npx prisma db push
```

If you encounter any issues related to data loss, and you are certain you want to proceed, you can add `--accept-data-loss` (use with caution, especially in production).

### 5. Run the Development Server

Once the database is set up, you can run the Next.js development server:

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

## Learning More

To learn more about Next.js and related technologies, check out the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [NextAuth.js Documentation](https://next-auth.js.org/)
- [Prisma Documentation](https://www.prisma.io/docs/)
- [Vercel Postgres Documentation](https://vercel.com/docs/storage/vercel-postgres)

## Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
