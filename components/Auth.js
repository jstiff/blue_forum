import { useState } from "react";
import { supabase } from "../utils/supabaseClient";

export default function Auth() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  const handleLogin = async (email) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signIn({ email });
      if (error) throw error;
      alert(
        "Check your email for the login link! Look at spam folder if not in inbox."
      );
    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  async function signInWithSocial(provider) {
    const { user, session, error } = await supabase.auth.signIn({
      provider: provider,
    });
  }

  return (
    <div className="columns">
      <div className="column is-half is-offset-one-quarter">
        <h3 className="title">Join the discussion</h3>
        <div className="mb-4">
          <p className="is-size-5 mb-1">Social Login</p>{" "}
          <button
            className="button is-fullwidth is-info mb-1"
            onClick={() => signInWithSocial("google")}
          >
            Sign in with Google
          </button>
          <button
            className="button is-fullwidth is-dark"
            onClick={() => signInWithSocial("github")}
          >
            Sign in with Github
          </button>
        </div>

        <div>
          <p className="is-size-5 mb-1">Or via email</p>
          <div>
            <input
              className="input mb-2"
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <button
              onClick={(e) => {
                e.preventDefault();
                handleLogin(email);
              }}
              className="button is-primary is-fullwidth"
              disabled={loading}
            >
              <span>{loading ? "Loading" : "Send magic link"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
