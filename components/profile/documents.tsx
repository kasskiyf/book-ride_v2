"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Upload, Check, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface DocumentUpload {
  id: string;
  type: "license_front" | "license_back" | "passport";
  label: string;
  file: File | null;
  status: "pending" | "uploaded" | "error";
}

export function Documents() {
  const [documents, setDocuments] = useState<DocumentUpload[]>([
    {
      id: "license_front",
      type: "license_front",
      label: "Driver's License (Front)",
      file: null,
      status: "pending",
    },
    {
      id: "license_back",
      type: "license_back",
      label: "Driver's License (Back)",
      file: null,
      status: "pending",
    },
    {
      id: "passport",
      type: "passport",
      label: "Passport Photo",
      file: null,
      status: "pending",
    },
  ]);

  const handleFileChange = (id: string, file: File | null) => {
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size should be less than 5MB");
      return;
    }

    setDocuments((prev) =>
      prev.map((doc) =>
        doc.id === id
          ? {
              ...doc,
              file,
              status: "uploaded",
            }
          : doc
      )
    );

    toast.success(`${file.name} uploaded successfully`);
  };

  const handleUpload = async () => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("Documents uploaded successfully");
    } catch (error) {
      toast.error("Failed to upload documents");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold">Documents</h2>
        <p className="text-sm text-muted-foreground">
          Upload your identification documents
        </p>
      </div>

      <div className="grid gap-4">
        {documents.map((doc) => (
          <Card key={doc.id} className="p-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor={doc.id}>{doc.label}</Label>
                {doc.status === "uploaded" && (
                  <div className="flex items-center text-sm text-green-500">
                    <Check className="mr-1 h-4 w-4" />
                    Uploaded
                  </div>
                )}
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div
                  className={cn(
                    "relative flex aspect-[3/2] cursor-pointer items-center justify-center rounded-lg border-2 border-dashed",
                    doc.status === "uploaded"
                      ? "border-green-500/20 bg-green-500/10"
                      : "border-muted-foreground/20 hover:bg-accent"
                  )}
                >
                  <Input
                    id={doc.id}
                    type="file"
                    accept="image/*"
                    className="absolute inset-0 opacity-0"
                    onChange={(e) =>
                      handleFileChange(doc.id, e.target.files?.[0] || null)
                    }
                  />
                  <div className="flex flex-col items-center gap-1 text-center">
                    <Upload className="h-8 w-8 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      {doc.file ? doc.file.name : "Click to upload"}
                    </span>
                  </div>
                </div>

                {doc.file && (
                  <div className="relative aspect-[3/2] overflow-hidden rounded-lg border">
                    <img
                      src={URL.createObjectURL(doc.file)}
                      alt={doc.label}
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}
              </div>

              <p className="flex items-center text-xs text-muted-foreground">
                <AlertCircle className="mr-1 h-3 w-3" />
                Accepted formats: JPG, PNG. Max file size: 5MB
              </p>
            </div>
          </Card>
        ))}
      </div>

      <Button
        onClick={handleUpload}
        disabled={!documents.some((doc) => doc.status === "uploaded")}
        className="w-full"
      >
        Upload Documents
      </Button>
    </div>
  );
}