# @repo/database

Shared database configuration and schema for project-zucchini using Drizzle ORM and PostgreSQL.

## Overview

This package provides a shared database layer for both web and admin apps, supporting:

- **User Registration** - Complete user data with Firebase Auth integration
- **Admin Authentication** - Email-based admin verification
- **Payment Tracking** - Razorpay payment details and verification

## Schema

### Tables

1. **users** - User registration data
   - Firebase Auth UID integration
   - Personal information (name, email, phone, gender)
   - Academic information (institute, university, roll number)
   - ID card document URL
   - Verification status (boolean only)

2. **transactions** - Transaction and payment data (one-to-one with users)
   - Payment receipt URL
   - Transaction ID
   - Payment method (QR or Razorpay)
   - Verification status and timestamp

3. **admins** - Admin users
   - Firebase Auth UID integration
   - Email-based authentication

4. **razorpay_payments** - Razorpay payment details (one-to-one with transactions)
   - Links to transactions table
   - Order ID, Payment ID, Signature
   - Verification status

See [schema documentation](./src/schema.ts) for complete field details.

## Setup

1. Copy `.env.example` to `.env` and add your PostgreSQL connection string:

   ```bash
   cp .env.example .env
   ```

2. Update the `DATABASE_URL` in `.env`:
   ```
   DATABASE_URL=postgresql://username:password@localhost:5432/database_name
   ```

## Scripts

- `pnpm db:generate` - Generate migrations from schema changes
- `pnpm db:push` - Push schema changes directly to database (for development)
- `pnpm db:migrate` - Apply migrations to database
- `pnpm db:studio` - Open Drizzle Studio to browse and manage your database

## Schema

The schema is defined in `src/schema.ts`. You can add more tables or modify existing ones as needed.
