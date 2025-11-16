"use client";

import useAuthAction from "@/app/hooks/auth/useAuthAction";
import SignInForm from "@/components/SignInForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RouteUrls } from "@/lib/constants/url.config";
import { LoginRequestDto } from "@/lib/dtos/auth.req.dto";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function LoginPage() {
  const router = useRouter();
  const { signinMutation } = useAuthAction();

  const onSubmit = (data: LoginRequestDto) => {
    signinMutation.mutate(data, {
      onSuccess: () => {
        toast.success("Login successful");
        router.push(RouteUrls.dashboard.index);
        router.refresh();
      },
      onError: (error: Error) => {
        toast.error(error.message || "Invalid credentials");
      },
    });
  };

  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Login</CardTitle>
        <CardDescription>
          Enter your credentials to access your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <SignInForm onSubmit={onSubmit} isLoading={signinMutation.isPending} />
      </CardContent>
      <CardFooter>
        <div className="text-sm text-center text-muted-foreground w-full">
          Don&apos;t have an account?{" "}
          <Link
            href={RouteUrls.auth.register}
            className="text-primary hover:underline font-medium"
          >
            Register
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
