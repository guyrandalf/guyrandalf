import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import Signup from "@/components/auth/sign-up";
import Signin from "@/components/auth/sign-in";

export default function AuthDemoPage() {
  return (
    <div className="space-y-8 py-8">
      <h1 className="text-4xl font-bold">User Authentication</h1>
      <div className="rounded-lg border p-6 mx-auto w-full max-w-md">
        <Card className="w-full max-w-md mx-auto">
          <Tabs defaultValue="signin" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="signin">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            <TabsContent value="signup">
              <div className="p-6">
                <Signup />
              </div>
            </TabsContent>
            <TabsContent value="signin">
              <div className="p-6">
                <Signin />
              </div>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
}
