import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const supabase = createClient('https://unyomucsmtbxdqawvana.supabase.co', 'sb_publishable_buDnymqn0L6RVX0ORpTwKg_a2AaHjVz')

export default async function handler(req, res) {


  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'github',
    options: {
      // Point this to your other Vercel function that handles the code
      redirectTo: `https://velora-cyan-kappa.vercel.app/`,
      skipBrowserRedirect: true // This gives us the URL instead of redirecting
    },
  });

  if (error) return res.status(500).json({ error: error.message });

  // Send the user to the GitHub Authorization page
  return res.redirect(data.url);
}
