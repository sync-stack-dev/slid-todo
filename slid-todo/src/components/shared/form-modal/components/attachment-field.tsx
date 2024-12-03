"use client";

import { useFormContext } from "react-hook-form";
import { FormField, FormItem, FormControl, FormLabel, FormMessage } from "@/components/ui/form";
import { ActiveField } from "../types";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { PLACEHOLDER_TEXT } from "../constants";
import { Input } from "@/components/ui/input";
import { useCallback } from "react";

interface AttachmentFieldProps {
  activeField: ActiveField;
  selectedFile: File | null;
  onFileSelect: (file: File) => void;
  onFileRemove: () => void;
  setActiveField: (field: ActiveField) => void;
}

export const AttachmentField = ({
  activeField,
  selectedFile,
  onFileSelect,
  onFileRemove,
  setActiveField,
}: AttachmentFieldProps) => {
  const { control } = useFormContext();

  const handleFileSelect = useCallback(() => {
    if (typeof window === "undefined") return;

    const input = document.createElement("input");
    input.type = "file";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) onFileSelect(file);
    };
    input.click();
  }, [onFileSelect]);

  return (
    <FormField
      control={control}
      name="linkUrl"
      render={({ field }) => (
        <FormItem>
          <FormLabel>자료</FormLabel>
          <FormControl>
            <div className="space-y-2">
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant={activeField === "file" ? "default" : "outline"}
                  className="w-[120px]"
                  onClick={() => setActiveField(activeField === "file" ? null : "file")}
                >
                  파일 업로드
                </Button>
                <Button
                  type="button"
                  variant={activeField === "link" ? "default" : "outline"}
                  className="w-[120px]"
                  onClick={() => setActiveField(activeField === "link" ? null : "link")}
                >
                  링크 첨부
                </Button>
              </div>

              {activeField === "file" && !selectedFile && (
                <div
                  className="border-2 border-dashed rounded-lg p-4 text-center cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-800 h-[184px] flex items-center justify-center transition-colors"
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    const file = e.dataTransfer.files[0];
                    if (file) onFileSelect(file);
                  }}
                  onClick={handleFileSelect}
                >
                  {PLACEHOLDER_TEXT.fileUrl}
                </div>
              )}

              {activeField === "file" && selectedFile && (
                <div className="border rounded-lg p-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm truncate">{selectedFile.name}</span>
                    <Button type="button" variant="ghost" size="sm" onClick={onFileRemove}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}

              {activeField === "link" && (
                <Input placeholder={PLACEHOLDER_TEXT.linkUrl} {...field} />
              )}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
