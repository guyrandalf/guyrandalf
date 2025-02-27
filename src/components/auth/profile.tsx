"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuthStore } from "@/store/auth-store";

interface ProfileProps {
  initialUser: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
}

export default function Profile({ initialUser }: ProfileProps) {
  const router = useRouter();
  const { setUser, signout } = useAuthStore();

  useEffect(() => {
    setUser(initialUser);
  }, [initialUser, setUser]);

  const handleSignOut = async () => {
    await signout();
    router.push("/projects/auth");
  };

  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle>Profile</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-center">
          <Avatar className="h-24 w-24">
            <AvatarFallback>
              {initialUser.firstName[0]}
              {initialUser.lastName[0]}
            </AvatarFallback>
          </Avatar>
        </div>
        <div className="space-y-1 text-center">
          <h3 className="font-medium">
            {initialUser.firstName} {initialUser.lastName}
          </h3>
          <p className="text-sm text-muted-foreground">{initialUser.email}</p>
        </div>
        <Button variant="outline" className="w-full" onClick={handleSignOut}>
          Sign Out
        </Button>
      </CardContent>
    </Card>
  );
}
