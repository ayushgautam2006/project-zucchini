"use client";

import { type User } from "@repo/firebase-config";
import { registrationFields } from "@/config/register";
import { renderFormFields, SubmitButton, ErrorDisplay } from "@/utils/form";
import { useRegistrationForm } from "@/hooks/use-registration-form";
import NitrToggle from "./nitr-toggle";
import InstituteField from "./institute-field";
import DocumentUpload from "./document-upload";

interface RegistrationFormProps {
  user: User;
  onComplete: (isNitrStudent: boolean) => void;
}

export default function RegistrationForm({ user, onComplete }: RegistrationFormProps) {
  const {
    formData,
    errors,
    isNitrStudent,
    isSubmitting,
    submitError,
    setIsNitrStudent,
    handleInputChange,
    handleInstituteChange,
    handleSubmit,
  } = useRegistrationForm({ user, onComplete });

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <NitrToggle isNitrStudent={isNitrStudent} onToggle={setIsNitrStudent} />

      {/* Basic Information */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {renderFormFields(
          registrationFields
            .filter((field) => field.name !== "institute" && field.name !== "university")
            .map((field) => ({ ...field })),
          formData,
          errors,
          handleInputChange
        )}

        <InstituteField
          value={formData.institute}
          universityValue={formData.university}
          isNitrStudent={isNitrStudent}
          instituteError={errors.institute}
          universityError={errors.university}
          onInstituteChange={handleInstituteChange}
          onUniversityChange={(v) => handleInputChange("university", v)}
        />
      </div>

      {/* Document Uploads - Compact Layout */}
      <div className={`grid grid-cols-1 ${!isNitrStudent ? "md:grid-cols-3" : ""} gap-4`}>
        {/* ID Card Upload */}
        <DocumentUpload
          label="College/University ID Card"
          value={formData.idCard}
          error={errors.idCard}
          onUploadComplete={(url) => handleInputChange("idCard", url)}
          compact
        />

        {/* Permission Document Upload - Only for non-NITR students */}
        {!isNitrStudent && (
          <DocumentUpload
            label="Permission Document"
            description="Signed permission from institute"
            value={formData.permission as any}
            error={errors.permission}
            onUploadComplete={(url) => handleInputChange("permission", url)}
            compact
          />
        )}

        {/* Undertaking Document Upload - Only for non-NITR students */}
        {!isNitrStudent && (
          <DocumentUpload
            label="Undertaking Document"
            description="Signed declaration document"
            value={formData.undertaking as any}
            error={errors.undertaking}
            onUploadComplete={(url) => handleInputChange("undertaking", url)}
            compact
          />
        )}
      </div>

      <ErrorDisplay error={submitError} />
      <SubmitButton
        isSubmitting={isSubmitting}
        loadingText="Registering..."
        submitText={isNitrStudent ? "Complete Registration" : "Continue to Payment"}
      />
    </form>
  );
}
