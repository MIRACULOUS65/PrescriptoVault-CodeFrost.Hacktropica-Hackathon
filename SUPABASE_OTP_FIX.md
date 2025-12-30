# 🔧 ROOT FIX: Configure Supabase to Send OTP Codes Instead of Magic Links

## ⚠️ THE REAL PROBLEM

Supabase uses the **SAME** `signInWithOtp()` function for both:
- Magic links (clickable URLs)
- OTP codes (6-digit numbers)

The difference is determined by **YOUR EMAIL TEMPLATE** in the Supabase Dashboard!

## 🎯 THE ROOT CAUSE

Your Supabase email template currently contains `{{ .ConfirmationURL }}` which sends **magic links**.

To get **OTP codes**, you need to use `{{ .Token }}` instead.

---

## ✅ STEP-BY-STEP FIX (Do This in Supabase Dashboard)

### Step 1: Go to Supabase Dashboard

1. Open: https://supabase.com/dashboard/project/ljhluphagwtitgbbkgou
2. Click on **Authentication** in the left sidebar
3. Click on **Email Templates**

### Step 2: Find the Correct Template

Look for the template called **"Confirm signup"** or **"Magic Link"**

### Step 3: Edit the Email Template

**REPLACE THIS (Magic Link version):**
```html
<h2>Confirm your signup</h2>
<p>Follow this link to confirm your user:</p>
<p><a href="{{ .ConfirmationURL }}">Confirm your mail</a></p>
```

**WITH THIS (OTP Code version):**
```html
<h2>Your Verification Code</h2>
<p>Enter this code to sign in to PrescriptoVault:</p>
<h1 style="font-size: 32px; font-weight: bold; text-align: center; letter-spacing: 8px;">{{ .Token }}</h1>
<p style="color: #666;">This code will expire in 10 minutes.</p>
<p style="color: #666;">If you didn't request this code, you can safely ignore this email.</p>
```

### Step 4: Save the Template

Click **Save** at the bottom of the page.

### Step 5: Test Again

1. Go back to your app: http://localhost:3000
2. Click "Enter Portal"
3. Enter your email
4. Select a role
5. **Check your email** - you should now get a 6-digit code!

---

## 📧 COMPLETE EMAIL TEMPLATE (Copy-Paste Ready)

Here's a complete, professional OTP email template you can use:

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
    <h1 style="color: white; margin: 0; font-size: 24px;">PrescriptoVault</h1>
    <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0;">Secure Healthcare Platform</p>
  </div>
  
  <div style="background: #f9fafb; padding: 40px 30px; border-radius: 0 0 10px 10px;">
    <h2 style="color: #1f2937; margin-top: 0;">Your Verification Code</h2>
    <p style="color: #6b7280; font-size: 16px;">Enter this code to complete your sign-in:</p>
    
    <div style="background: white; border: 2px solid #10b981; border-radius: 8px; padding: 20px; margin: 30px 0; text-align: center;">
      <div style="font-size: 48px; font-weight: bold; letter-spacing: 12px; color: #10b981; font-family: 'Courier New', monospace;">
        {{ .Token }}
      </div>
    </div>
    
    <p style="color: #6b7280; font-size: 14px; margin-top: 30px;">
      ⏱️ This code will expire in <strong>10 minutes</strong>
    </p>
    
    <p style="color: #6b7280; font-size: 14px;">
      🔒 For security reasons, never share this code with anyone.
    </p>
    
    <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
    
    <p style="color: #9ca3af; font-size: 12px; text-align: center;">
      If you didn't request this code, you can safely ignore this email.
    </p>
    
    <p style="color: #9ca3af; font-size: 12px; text-align: center; margin-top: 20px;">
      Powered by Supabase ⚡
    </p>
  </div>
</body>
</html>
```

---

## 🔍 HOW TO VERIFY IT'S WORKING

After updating the template:

1. **Send a test email** from your app
2. **Check your inbox**
3. **You should see:**
   - Subject: Something like "Confirm your signup" or "Your verification code"
   - Body: A **6-digit number** displayed prominently
   - **NO clickable link** to confirm

4. **Enter the 6-digit code** in your app
5. **Success!** You should be redirected to your portal

---

## ❌ COMMON MISTAKES TO AVOID

1. **Don't use both** `{{ .Token }}` and `{{ .ConfirmationURL }}` in the same template
2. **Don't forget to save** the template after editing
3. **Make sure you're editing the right template** (Confirm signup / Magic Link)
4. **Clear your email cache** if you still see old emails

---

## 🆘 TROUBLESHOOTING

### Still Getting Magic Links?

1. **Check you edited the correct template:**
   - Go to Authentication → Email Templates
   - Look for "Confirm signup" or "Magic Link"
   - Verify it contains `{{ .Token }}` not `{{ .ConfirmationURL }}`

2. **Try a different email address:**
   - Sometimes email clients cache templates
   - Use a different email to test

3. **Check Supabase logs:**
   - Go to Authentication → Logs
   - Look for any errors

### Code Not Working?

1. **Check code expiration:**
   - OTP codes expire after 10 minutes by default
   - Request a new code if expired

2. **Check for typos:**
   - OTP codes are case-sensitive
   - Make sure you're entering all 6 digits correctly

---

## 📚 REFERENCE

**Supabase Documentation:**
- The key is in the email template: `{{ .Token }}` = OTP code, `{{ .ConfirmationURL }}` = magic link
- Both use the same `signInWithOtp()` function
- The template determines what gets sent

**Our Implementation:**
- `signInWithEmail()` calls `supabase.auth.signInWithOtp({ email })`
- No `emailRedirectTo` option (we removed it)
- Supabase looks at your email template
- If template has `{{ .Token }}`, it sends the code
- If template has `{{ .ConfirmationURL }}`, it sends a link

---

## ✅ FINAL CHECKLIST

- [ ] Go to Supabase Dashboard
- [ ] Navigate to Authentication → Email Templates
- [ ] Find "Confirm signup" or "Magic Link" template
- [ ] Replace `{{ .ConfirmationURL }}` with `{{ .Token }}`
- [ ] Save the template
- [ ] Test with your app
- [ ] Verify you receive a 6-digit code
- [ ] Enter the code and confirm it works

---

**Once you complete these steps, your authentication will work perfectly! 🎉**
