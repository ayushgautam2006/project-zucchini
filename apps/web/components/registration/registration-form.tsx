"use client";

import { useState } from "react";
import { type User } from "@repo/firebase-config";
import { RegistrationSchema, type Registration } from "@repo/shared-types";
import { useApi } from "@repo/shared-utils/src/use-api";
import { z } from "zod";
import CloudinaryUploader from "../cloudinary-uploader";
import { Loader2 } from "lucide-react";

interface RegistrationFormProps {
  user: User;
  onComplete: (userId: number) => void;
}

type FormErrors = Partial<Record<keyof Registration, string>>;

export default function RegistrationForm({ user, onComplete }: RegistrationFormProps) {
  const [formData, setFormData] = useState<Partial<Registration>>({
    email: user.email || "",
    name: user.displayName || "",
    gender: undefined,
    permission: undefined as any,
    undertaking: undefined as any,
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const {
    loading: isSubmitting,
    error: submitError,
    execute: registerApi,
  } = useApi<number>({
    onSuccess: (userId) => {
      onComplete(userId);
    },
  });

  const handleInputChange = (field: keyof Registration, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validateForm = (): boolean => {
    try {
      RegistrationSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: FormErrors = {};
        error.errors.forEach((err) => {
          const field = err.path[0] as keyof Registration;
          newErrors[field] = err.message;
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    await registerApi("register", {
      method: "POST",
      body: JSON.stringify({
        ...formData,
        firebaseUid: user.uid,
      }),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Name */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.name || ""}
            onChange={(e) => handleInputChange("name", e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
              errors.name ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter your full name"
          />
          {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Email (Gmail only) <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            value={formData.email || ""}
            onChange={(e) => handleInputChange("email", e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="your.email@gmail.com"
          />
          {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            value={formData.phone || ""}
            onChange={(e) => handleInputChange("phone", e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
              errors.phone ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="10-digit phone number"
            maxLength={10}
          />
          {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
        </div>

        {/* Roll Number */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Roll Number <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.rollNumber || ""}
            onChange={(e) => handleInputChange("rollNumber", e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
              errors.rollNumber ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter your roll number"
          />
          {errors.rollNumber && <p className="mt-1 text-sm text-red-600">{errors.rollNumber}</p>}
        </div>

        {/* Institute */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Institute Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.institute || ""}
            onChange={(e) => handleInputChange("institute", e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
              errors.institute ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter your institute name"
          />
          {errors.institute && <p className="mt-1 text-sm text-red-600">{errors.institute}</p>}
        </div>

        {/* University */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            University Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.university || ""}
            onChange={(e) => handleInputChange("university", e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
              errors.university ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter your university name"
          />
          {errors.university && <p className="mt-1 text-sm text-red-600">{errors.university}</p>}
        </div>
      </div>

      {/* Gender */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Gender <span className="text-red-500">*</span>
        </label>
        <div className="flex gap-4">
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              name="gender"
              value="MALE"
              checked={formData.gender === "MALE"}
              onChange={(e) => handleInputChange("gender", e.target.value)}
              className="w-4 h-4 text-blue-600 focus:ring-blue-500"
            />
            <span className="ml-2 text-gray-700">Male</span>
          </label>
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              name="gender"
              value="FEMALE"
              checked={formData.gender === "FEMALE"}
              onChange={(e) => handleInputChange("gender", e.target.value)}
              className="w-4 h-4 text-blue-600 focus:ring-blue-500"
            />
            <span className="ml-2 text-gray-700">Female</span>
          </label>
        </div>
        {errors.gender && <p className="mt-1 text-sm text-red-600">{errors.gender}</p>}
      </div>

      {/* ID Card Upload */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          College/University ID Card <span className="text-red-500">*</span>
        </label>
        <CloudinaryUploader
          maxFiles={1}
          value={formData.idCard}
          onUploadComplete={(url) => handleInputChange("idCard", url)}
        />
        {errors.idCard && <p className="mt-1 text-sm text-red-600">{errors.idCard}</p>}
      </div>

      {/* Referral Code (Optional) */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Referral Code (Optional)
        </label>
        <input
          type="text"
          value={formData.referralCode || ""}
          onChange={(e) => handleInputChange("referralCode", e.target.value)}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
            errors.referralCode ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Enter referral code if you have one"
        />
        {errors.referralCode && <p className="mt-1 text-sm text-red-600">{errors.referralCode}</p>}
      </div>

      {/* Permission Document Upload */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Permission Document from Institute <span className="text-red-500">*</span>
        </label>
        <p className="text-xs text-gray-500 mb-2">
          Upload a signed permission letter from your institute's authority
        </p>
        <CloudinaryUploader
          maxFiles={1}
          value={formData.permission as any}
          onUploadComplete={(url) => handleInputChange("permission", url)}
        />
        {errors.permission && <p className="mt-1 text-sm text-red-600">{errors.permission}</p>}
      </div>

      {/* Undertaking Document Upload */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Undertaking Document <span className="text-red-500">*</span>
        </label>
        <p className="text-xs text-gray-500 mb-2">
          Upload a signed undertaking/declaration document accepting terms and conditions
        </p>
        <CloudinaryUploader
          maxFiles={1}
          value={formData.undertaking as any}
          onUploadComplete={(url) => handleInputChange("undertaking", url)}
        />
        {errors.undertaking && <p className="mt-1 text-sm text-red-600">{errors.undertaking}</p>}
      </div>

      {/* Submit Error */}
      {submitError && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {submitError}
        </div>
      )}

      {/* Submit Button */}
      <div className="flex justify-end pt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Registering...
            </>
          ) : (
            "Continue to Payment"
          )}
        </button>
      </div>
    </form>
  );
}
