import { userAuthStore } from "@/store/auth.store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Mail, User, Shield, Edit, Settings } from "lucide-react";

export default function Profile() {
  const { isAuthenticated, user } = userAuthStore();

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <p className="text-muted-foreground">
              Please sign in to view your profile.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Profile</h1>
          <p className="text-muted-foreground">
            Manage your account information and settings
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Profile Card */}
          <div className="md:col-span-1">
            <Card>
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={user.profileUrl} alt={user.name} />
                    <AvatarFallback className="text-lg">
                      {getInitials(user.name)}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <CardTitle className="text-xl">{user.name}</CardTitle>
                <p className="text-sm text-muted-foreground">{user.email}</p>
                {user.isAdmin && (
                  <Badge variant="secondary" className="mt-2 w-fit mx-auto">
                    <Shield className="h-3 w-3 mr-1" />
                    Admin
                  </Badge>
                )}
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
                <Button variant="outline" className="w-full">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Account Information */}
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Account Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Basic Information */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">
                    Basic Information
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <User className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">
                          Full Name
                        </p>
                        <p className="text-base">{user.name}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Mail className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">
                          Email Address
                        </p>
                        <p className="text-base">{user.email}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Account Details */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">
                    Account Details
                  </h3>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        User ID
                      </p>
                      <p className="text-xs font-mono bg-muted px-2 py-1 rounded mt-1">
                        {user.id}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        Account Type
                      </p>
                      <div className="mt-1">
                        <Badge variant={user.isAdmin ? "default" : "secondary"}>
                          {user.isAdmin ? "Administrator" : "Standard User"}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>

                {user.isAdmin && (
                  <>
                    <Separator />
                    <div>
                      <h3 className="text-lg font-semibold mb-4">
                        Administrator Privileges
                      </h3>
                      <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                        <div className="flex items-center space-x-2 mb-2">
                          <Shield className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                          <p className="font-medium text-blue-900 dark:text-blue-100">
                            Admin Access
                          </p>
                        </div>
                        <p className="text-sm text-blue-700 dark:text-blue-300">
                          You have administrative privileges that allow you to
                          manage courses, users, and system settings.
                        </p>
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
