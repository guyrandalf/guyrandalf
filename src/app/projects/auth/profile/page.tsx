import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import Profile from "@/components/auth/profile";

export default function ProfilePage() {
  return (
    <div className="space-y-8 py-8">
      <h1 className="text-4xl font-bold">My Profile</h1>
      <div className="rounded-lg border p-6 mx-auto w-full max-w-md">
        <Card className="w-full max-w-md mx-auto">
          <Profile />
        </Card>
      </div>
    </div>
  );
}
