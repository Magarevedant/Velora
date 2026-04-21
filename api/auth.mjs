import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const supabase = createClient('https://unyomucsmtbxdqawvana.supabase.co', 'sb_publishable_buDnymqn0L6RVX0ORpTwKg_a2AaHjVz')

async function () {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'github',
    options: {
    redirectTo: `http://localhost:8158/index.html`,
  },
  })
}()
