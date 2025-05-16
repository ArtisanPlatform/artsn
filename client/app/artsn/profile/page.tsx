"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, Mail, UserRoundPlus } from "lucide-react";
import { useUserStore } from "@/store/useUserStore";
import { useForm } from "react-hook-form";
import { ProfileFormData, profileSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";

export default function Page() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const { user } = useUserStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: user?.name.split(" ")[0],
      lastName: user?.name.split(" ")[1],
      email: user?.email,
    },
  });

  const onSubmit = (data: ProfileFormData) => {};

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="container mx-auto py-8 max-w-3xl">
        <div className="space-y-8">
          <div>
            <h1 className="text-2xl font-semibold">Account</h1>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
            <div className="flex-shrink-0">
              <div className="w-24 h-24 rounded-full overflow-hidden border">
                <img
                  src="/placeholder.svg?height=96&width=96"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="space-y-2">
              <h2 className="font-medium">Profile picture</h2>
              <p className="text-sm text-muted-foreground">
                PNG, JPEG under 15MB
              </p>
              <div className="flex gap-3">
                <Button variant="outline" size="sm">
                  Upload new picture
                </Button>
                <Button variant="outline" size="sm">
                  Delete
                </Button>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="font-medium">Full name</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-3 bottom-5 flex items-center pointer-events-none">
                  <UserRoundPlus className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  type="text"
                  placeholder="First name"
                  className="pl-10 h-12 rounded-xl bg-gray-50"
                  {...register("firstName")}
                />
                <p className="min-h-[20px] text-red-500 text-sm ml-2">
                  {errors.firstName?.message}
                </p>
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-3 bottom-5 flex items-center pointer-events-none">
                  <UserRoundPlus className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  type="text"
                  placeholder="Last name"
                  className="pl-10 h-12 rounded-xl bg-gray-50"
                  {...register("lastName")}
                />
                <p className="min-h-[20px] text-red-500 text-sm ml-2">
                  {errors.lastName?.message}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h2 className="font-medium">Contact email</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Manage your accounts email address for the invoices.
              </p>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-3 bottom-5 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <Input
                type="email"
                placeholder="Your Email"
                className="pl-10 h-12 rounded-xl bg-gray-50"
                {...register("email")}
              />
              <p className="min-h-[20px] text-red-500 text-sm ml-2">
                {errors.email?.message}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h2 className="font-medium">Password</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Modify your current password.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="currentPassword" className="text-sm">
                  Current password
                </label>
                <div className="relative">
                  <Input
                    id="currentPassword"
                    type={showCurrentPassword ? "text" : "password"}
                    placeholder="Current password"
                    defaultValue="password123"
                    {...register("currentPassword")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showCurrentPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </button>
                </div>
                <p className="min-h-[20px] text-red-500 text-sm ml-2">
                  {errors.currentPassword?.message}
                </p>
              </div>
              <div className="space-y-2">
                <label htmlFor="newPassword" className="text-sm">
                  New password
                </label>
                <div className="relative">
                  <Input
                    id="newPassword"
                    type={showNewPassword ? "text" : "password"}
                    placeholder="New password"
                    defaultValue="newpassword123"
                    {...register("newPassword")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showNewPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </button>
                </div>
                <p className="min-h-[20px] text-red-500 text-sm ml-2">
                  {errors.newPassword?.message}
                </p>
              </div>
            </div>
          </div>

          <div className="pt-4">
            <Button>Save changes</Button>
          </div>
        </div>
      </div>
    </form>
  );
}
