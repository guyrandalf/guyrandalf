import Signup from "@/components/auth/sign-up";

export default function AuthDemoPage() {
  return (
    <div className="space-y-8 py-8">
      <h1 className="text-4xl font-bold">User Authentication</h1>
      <div className="rounded-lg border p-6 mx-auto w-full max-w-md">
        <Signup />
      </div>
    </div>
  );
}
