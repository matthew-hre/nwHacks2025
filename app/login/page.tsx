import { signInWithGithub } from "./actions";

export default function LoginPage() {
  return (
    <>
      <form>
        <button formAction={signInWithGithub}>Sign in with GitHub</button>
      </form>
    </>
  );
}
