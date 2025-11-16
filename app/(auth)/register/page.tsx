"use client";

import useAuthAction from "@/app/hooks/auth/useAuthAction";
import SignUpForm from "@/components/SignUpForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RouteUrls } from "@/lib/constants/url.config";
import { RegisterRequestDto } from "@/lib/dtos/auth.req.dto";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function RegisterPage() {
  const router = useRouter();
  const { signupMutation } = useAuthAction();

  const onSubmit = (data: RegisterRequestDto) => {
    signupMutation.mutate(data, {
      onSuccess: () => {
        toast.success("Registration successful! You are now logged in.");
        router.push(RouteUrls.dashboard.index);
        router.refresh();
      },
      onError: (error: Error) => {
        toast.error(error.message || "Registration failed");
      },
    });
  };

  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Create an Account</CardTitle>
        <CardDescription>
          Enter your information to create a new account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <SignUpForm onSubmit={onSubmit} isLoading={signupMutation.isPending} />
      </CardContent>
      <CardFooter>
        <div className="text-sm text-center text-muted-foreground w-full">
          Already have an account?{" "}
          <Link
            href={RouteUrls.auth.login}
            className="text-primary hover:underline font-medium"
          >
            Login
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
