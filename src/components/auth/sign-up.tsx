"use client";

import { useState } from "react";
import { useAuthStore } from "@/store/auth-store";
import { type SignupValues } from "@/lib/validations/auth";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "react-toastify";

export default function Signup() {
  const { signup, loading, error } = useAuthStore();
  const [values, setValues] = useState<SignupValues>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [validationErrors, setValidationErrors] = useState<
    Partial<SignupValues>
  >({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationErrors({});
    try {
      const formData = new FormData();
      Object.entries(values).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const result = await signup(formData);

      if (result?.message) {
        toast.success(result.message);
        setValues({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
        });
      }

      if (result?.errors) {
        setValidationErrors(result.errors);
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        setValidationErrors(error.formErrors.fieldErrors);
      } else {
        toast.error(error.message || "Something went wrong");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="firstName">First Name</Label>
        <Input
          id="firstName"
          value={values.firstName}
          onChange={(e) => setValues({ ...values, firstName: e.target.value })}
          required
        />
        {validationErrors.firstName && (
          <p className="text-sm text-red-500">{validationErrors.firstName}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="lastName">Last Name</Label>
        <Input
          id="lastName"
          value={values.lastName}
          onChange={(e) => setValues({ ...values, lastName: e.target.value })}
          required
        />
        {validationErrors.lastName && (
          <p className="text-sm text-red-500">{validationErrors.lastName}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={values.email}
          onChange={(e) => setValues({ ...values, email: e.target.value })}
          required
        />
        {validationErrors.email && (
          <p className="text-sm text-red-500">{validationErrors.email}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          value={values.password}
          onChange={(e) => setValues({ ...values, password: e.target.value })}
          required
        />
        {validationErrors.password && (
          <p className="text-sm text-red-500">{validationErrors.password}</p>
        )}
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Loading..." : "Sign Up"}
      </Button>
    </form>
  );
}
