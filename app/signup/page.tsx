'use client'
import { GalleryVerticalEnd } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormEvent } from "react"; // Import FormEvent

// Assuming LoginForm is in this path
import { LoginForm } from "../components/login-form";

export default function LoginPage() {
  const router = useRouter();

  // This is the core login logic
  const handleLogin = (credentials: { email: string; password: string; }) => {
    // Trim whitespace from inputs to prevent login failures due to extra spaces
    const trimmedEmail = credentials.email.trim();
    const trimmedPassword = credentials.password.trim();

    if (
      trimmedEmail === "harrshh077@gmail.com" &&
      trimmedPassword === "Harsh" // Password is case-sensitive
    ) {
      // If credentials are correct, navigate to the dashboard
      router.push("/dashboard");
    } else {
      // If incorrect, show an error
      alert("Invalid email or password");
    }
  };

  // This function handles the form's submission event
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    // Prevent the browser from reloading the page
    event.preventDefault();

    // Create a FormData object from the form element
    const formData = new FormData(event.currentTarget);

    // Extract the email and password values with safety checks
    const email = formData.get("email");
    const password = formData.get("password");

    // Check if both fields have values before proceeding
    if (!email || !password) {
      alert("Please fill in both email and password fields");
      return;
    }

    // Call the login logic function with the extracted credentials
    handleLogin({ email: email.toString(), password: password.toString() });
  };

  return (
    // Added bg-black for a dark background
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium text-white">
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <GalleryVerticalEnd className="size-4" />
            </div>
            MERN MATRIX
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            {/* Pass the handleSubmit function to the LoginForm's onSubmit prop */}
            <LoginForm onSubmit={handleSubmit} />
          </div>
        </div>
      </div>
      <div className="relative hidden lg:block">
        <img
          src="https://images.unsplash.com/photo-1621361365424-06f0e1eb5c49?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHByb2dyYW1taW5nfGVufDB8fDB8fHww"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}