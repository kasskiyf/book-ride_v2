"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Car } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, registerSchema } from "@/lib/types/auth";
import type { z } from "zod";

type LoginInputs = z.infer<typeof loginSchema>;
type RegisterInputs = z.infer<typeof registerSchema>;

export default function AuthPage() {
  const searchParams = useSearchParams();
  const showRegister = searchParams.get("register") === "true";
  const [accountType, setAccountType] = useState("personal");
  const { login, register, isLoading } = useAuth();

  const loginForm = useForm<LoginInputs>({
    resolver: zodResolver(loginSchema),
  });

  const registerForm = useForm<RegisterInputs>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      type: "personal",
    },
  });

  const onLogin = async (data: LoginInputs) => {
    try {
      await login(data.email, data.password);
    } catch (error) {
      // Error is handled by the auth context
    }
  };

  const onRegister = async (data: RegisterInputs) => {
    try {
      await register(data);
    } catch (error) {
      // Error is handled by the auth context
    }
  };

  return (
    <div className="container flex min-h-[calc(100vh-4rem)] items-center py-24">
      <Card className="mx-auto w-full max-w-[450px] p-8">
        <div className="mb-8 flex flex-col items-center space-y-2 text-center">
          <Link href="/" className="flex items-center space-x-2">
            <Car className="h-6 w-6" />
            <span className="font-bold">Jack's Ride</span>
          </Link>
          <h1 className="text-2xl font-semibold tracking-tight">
            Welcome to Jack's Ride
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your details to continue
          </p>
        </div>

        <Tabs defaultValue={showRegister ? "register" : "login"}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>

          <TabsContent value="login" className="space-y-4">
            <form onSubmit={loginForm.handleSubmit(onLogin)} className="space-y-4">
              <div className="space-y-2">
                <Input
                  type="email"
                  placeholder="Email"
                  {...loginForm.register("email")}
                />
                {loginForm.formState.errors.email && (
                  <p className="text-sm text-destructive">
                    {loginForm.formState.errors.email.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Input
                  type="password"
                  placeholder="Password"
                  {...loginForm.register("password")}
                />
                {loginForm.formState.errors.password && (
                  <p className="text-sm text-destructive">
                    {loginForm.formState.errors.password.message}
                  </p>
                )}
              </div>
              <Button className="w-full" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="register" className="space-y-4">
            <form
              onSubmit={registerForm.handleSubmit(onRegister)}
              className="space-y-4"
            >
              <Select
                value={accountType}
                onValueChange={(value) => {
                  setAccountType(value);
                  registerForm.setValue("type", value as any);
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select account type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="personal">Personal Account</SelectItem>
                  <SelectItem value="business">Business Account</SelectItem>
                  <SelectItem value="driver">Driver Account</SelectItem>
                </SelectContent>
              </Select>

              <div className="grid gap-4">
                {accountType === "business" && (
                  <div className="space-y-2">
                    <Input
                      placeholder="Company Name"
                      {...registerForm.register("companyName")}
                    />
                    {registerForm.formState.errors.companyName && (
                      <p className="text-sm text-destructive">
                        {registerForm.formState.errors.companyName.message}
                      </p>
                    )}
                  </div>
                )}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Input
                      placeholder="First Name"
                      {...registerForm.register("firstName")}
                    />
                    {registerForm.formState.errors.firstName && (
                      <p className="text-sm text-destructive">
                        {registerForm.formState.errors.firstName.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Input
                      placeholder="Last Name"
                      {...registerForm.register("lastName")}
                    />
                    {registerForm.formState.errors.lastName && (
                      <p className="text-sm text-destructive">
                        {registerForm.formState.errors.lastName.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <Input
                    type="email"
                    placeholder="Email"
                    {...registerForm.register("email")}
                  />
                  {registerForm.formState.errors.email && (
                    <p className="text-sm text-destructive">
                      {registerForm.formState.errors.email.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Input
                    type="password"
                    placeholder="Password"
                    {...registerForm.register("password")}
                  />
                  {registerForm.formState.errors.password && (
                    <p className="text-sm text-destructive">
                      {registerForm.formState.errors.password.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Input
                    type="password"
                    placeholder="Confirm Password"
                    {...registerForm.register("confirmPassword")}
                  />
                  {registerForm.formState.errors.confirmPassword && (
                    <p className="text-sm text-destructive">
                      {registerForm.formState.errors.confirmPassword.message}
                    </p>
                  )}
                </div>
                {accountType === "driver" && (
                  <>
                    <div className="space-y-2">
                      <Input
                        placeholder="Driver's License Number"
                        {...registerForm.register("driversLicense")}
                      />
                      {registerForm.formState.errors.driversLicense && (
                        <p className="text-sm text-destructive">
                          {registerForm.formState.errors.driversLicense.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Input
                        placeholder="Vehicle Registration"
                        {...registerForm.register("vehicleRegistration")}
                      />
                      {registerForm.formState.errors.vehicleRegistration && (
                        <p className="text-sm text-destructive">
                          {registerForm.formState.errors.vehicleRegistration
                            .message}
                        </p>
                      )}
                    </div>
                  </>
                )}
              </div>

              <Button className="w-full" disabled={isLoading}>
                {isLoading ? "Creating account..." : "Create Account"}
              </Button>
            </form>
          </TabsContent>
        </Tabs>

        <div className="mt-4 text-center text-sm text-muted-foreground">
          By continuing, you agree to our{" "}
          <Link
            href="/terms"
            className="underline underline-offset-4 hover:text-primary"
          >
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link
            href="/privacy"
            className="underline underline-offset-4 hover:text-primary"
          >
            Privacy Policy
          </Link>
          .
        </div>
      </Card>
    </div>
  );
}