"use client";

import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuthStore } from "@/store/auth-store";

export default function Profile() {
  const router = useRouter();
  const { user, signout } = useAuthStore();

  console.log("User", user);

  const handleSignOut = async () => {
    await signout();
    router.push("/projects/auth");
  };

  const initials = user
    ? `${user.firstName[0]}${user.lastName[0]}`.toUpperCase()
    : "...";

  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle>Profile</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-center">
          <Avatar className="h-24 w-24">
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
        </div>
        <div className="space-y-1 text-center">
          <h3 className="font-medium">
            {user ? `${user.firstName} ${user.lastName}` : "Loading..."}
          </h3>
          <p className="text-sm text-muted-foreground">{user?.email}</p>
        </div>
        <Button variant="outline" className="w-full" onClick={handleSignOut}>
          Sign Out
        </Button>
      </CardContent>
    </Card>
  );
}
