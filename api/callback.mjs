import { createServerClient } from '@supabase/ssr'
import cookie from 'cookie'

export default async function handler(req, res) {
  const { code, next = '/index.html' } = req.query;

  if (code) {
    const supabase = createServerClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_ANON_KEY, // Note: Use ANON key here, the cookies prove who the user is!
      {
        cookies: {
          getAll() {
            // Read existing cookies from the browser
            return cookie.parse(req.headers.cookie ?? '')
          },
          setAll(cookiesToSet) {
            // Write the new session cookies back to the browser
            const formattedCookies = cookiesToSet.map(({ name, value, options }) =>
              cookie.serialize(name, value, options)
            );
            res.setHeader('Set-Cookie', formattedCookies);
          },
        },
      }
    )

    // This triggers the cookie 'setAll' function automatically
    await supabase.auth.exchangeCodeForSession(code)
  }

  // Send the user back to the frontend
  res.redirect(303, next)
}
