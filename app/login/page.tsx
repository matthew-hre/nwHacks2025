import { signInWithGithub } from "./actions";

import logo from "@/public/assets/icons/logo.png";

export default function LoginPage() {
  return (
    <div className="absolute w-full min-h-screen top-0 bottom-0 left-0 right-0 z-50 bg-[var(--background)]">
      <form className="w-full h-full flex flex-col items-center justify-center space-y-6 pb-64">
        <img src={logo.src} alt="logo" className="w-2/3" />
        <button
          formAction={signInWithGithub}
          className="
                bg-brand-brown
                text-white
                font-sans
                text-xl
                py-2
                px-4
                rounded-full
                "
        >
          Sign in with GitHub
        </button>
      </form>
    </div>
  );
}
