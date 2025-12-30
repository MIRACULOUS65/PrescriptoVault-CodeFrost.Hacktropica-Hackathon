# Supabase Setup Instructions

## ⚠️ CRITICAL: Configure Email Template for OTP (DO THIS FIRST!)

> [!IMPORTANT]
> **You MUST configure the email template in Supabase Dashboard to send OTP codes instead of magic links!**

### Quick Fix:

1. Go to: https://supabase.com/dashboard/project/ljhluphagwtitgbbkgou
2. Click **Authentication** → **Email Templates**
3. Find the **"Confirm signup"** or **"Magic Link"** template
4. **Replace** `{{ .ConfirmationURL }}` **with** `{{ .Token }}`
5. **Save** the template

**Example OTP Template:**
```html
<h2>Your Verification Code</h2>
<p>Enter this code to sign in:</p>
<h1 style="font-size: 32px; letter-spacing: 8px;">{{ .Token }}</h1>
<p>This code expires in 10 minutes.</p>
```

**See `SUPABASE_OTP_FIX.md` for detailed instructions and a complete template.**

---

## Prerequisites

You need access to the Supabase project:
- **URL**: https://ljhluphagwtitgbbkgou.supabase.co
- **Anon Key**: sb_publishable_fGZPcwXilwD-tQgodqutLA_vELPXGQ9

## Database Setup

### Step 1: Run the SQL Schema

1. Go to your Supabase Dashboard: https://supabase.com/dashboard/project/ljhluphagwtitgbbkgou
2. Navigate to **SQL Editor** in the left sidebar
3. Click **New Query**
4. Copy the entire contents of `src/lib/supabase/schema.sql`
5. Paste into the SQL editor
6. Click **Run** to execute the schema

This will create:
- `users` table with columns: id, email, role, name, verified, created_at, updated_at
- Row Level Security (RLS) policies
- Triggers for auto-creating user profiles
- Auto-update triggers for timestamps

### Step 2: Configure Email Authentication

1. In Supabase Dashboard, go to **Authentication** → **Providers**
2. Ensure **Email** provider is enabled
3. Go to **Authentication** → **Email Templates**
4. Customize the **Magic Link** template if desired (this is the OTP email)
5. Go to **Authentication** → **Settings**
6. Under **Auth Providers**, ensure:
   - **Enable email confirmations** is OFF (we're using OTP instead)
   - **Secure email change** is ON
   - **Enable phone confirmations** is OFF

### Step 3: Configure OTP Settings

1. In **Authentication** → **Settings**
2. Under **Email Auth**:
   - Set **OTP expiry** to 600 seconds (10 minutes) or your preferred duration
   - Ensure **Enable email OTP** is ON

### Step 4: Test Email Delivery

1. Go to **Authentication** → **Settings** → **SMTP Settings**
2. If you haven't configured custom SMTP, Supabase will use their default email service
3. For production, configure your own SMTP provider (recommended)

## Environment Variables

The `.env.local` file has already been created with:

```env
NEXT_PUBLIC_SUPABASE_URL=https://ljhluphagwtitgbbkgou.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=sb_publishable_fGZPcwXilwD-tQgodqutLA_vELPXGQ9
```

## Testing the Setup

### Test 1: Database Schema

Run this query in Supabase SQL Editor to verify the table exists:

```sql
SELECT * FROM public.users LIMIT 1;
```

You should see the table structure (even if empty).

### Test 2: RLS Policies

Run this query to check policies:

```sql
SELECT * FROM pg_policies WHERE tablename = 'users';
```

You should see 3 policies: view own profile, update own profile, insert own profile.

### Test 3: Trigger

The trigger will automatically create a user profile when someone signs up. This will be tested during the authentication flow.

## Troubleshooting

### Issue: Emails not being sent

**Solution**: 
- Check Supabase Dashboard → **Authentication** → **Logs** for email delivery errors
- Verify email provider settings
- For development, check spam folder

### Issue: "relation 'users' does not exist"

**Solution**:
- Re-run the schema.sql file
- Ensure you're in the correct Supabase project
- Check that the SQL executed without errors

### Issue: RLS blocking access

**Solution**:
- Verify RLS policies are created correctly
- Check that the user is authenticated (auth.uid() returns a value)
- Temporarily disable RLS for debugging: `ALTER TABLE users DISABLE ROW LEVEL SECURITY;` (re-enable after testing)

### Issue: Trigger not creating user profile

**Solution**:
- Check trigger exists: `SELECT * FROM pg_trigger WHERE tgname = 'on_auth_user_created';`
- Verify function exists: `SELECT * FROM pg_proc WHERE proname = 'handle_new_user';`
- Check Supabase logs for trigger errors

## Next Steps

After completing the database setup:

1. Restart the development server to ensure environment variables are loaded
2. Navigate to http://localhost:3000
3. Click "Enter Portal" or "Get Started"
4. Test the complete authentication flow

## Security Notes

- The publishable key is safe to expose in client-side code
- Row Level Security (RLS) ensures users can only access their own data
- Never expose the service_role key in client-side code
- For production, configure custom SMTP for email delivery
