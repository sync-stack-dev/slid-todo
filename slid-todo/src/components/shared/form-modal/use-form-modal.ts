"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { instance } from "@/lib/axios";
import { FormSchema, schema, ActiveField } from "./types";
import { useFormModal } from "@/stores/use-form-modal-store";

export const useFormModalLogic = () => {
  const { data, onSubmit: handleFormSubmit, onClose } = useFormModal();
  const [activeField, setActiveField] = useState<ActiveField>("file");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const form = useForm<FormSchema>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      description: "",
      done: false,
      file: "",
      link: "",
      goal: undefined,
    },
  });

  useEffect(() => {
    if (data?.defaultValues) {
      form.reset({
        title: data.defaultValues.title || "",
        description: data.defaultValues.description || "",
        done: data.defaultValues.done || false,
        file: data.defaultValues.file || "",
        goal: data.defaultValues.goal,
        link: data.defaultValues.link || "",
      });
    }
  }, [data?.defaultValues, form]);

  const isValid = form.watch("title")?.length > 0 && form.watch("title")?.length <= 30;

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
  };

  const handleFileRemove = () => {
    setSelectedFile(null);
    form.setValue("file", "");
  };

  const handleSubmit = async (formData: FormSchema) => {
    if (!data) return;

    try {
      let fileUrl = undefined;

      if (selectedFile) {
        const formData = new FormData();
        formData.append("file", selectedFile);

        const response = await instance.post("/files", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        fileUrl = response.data.url;
      }

      const submitData = {
        title: formData.title,
        description: formData.description,
        done: formData.done,
        fileUrl: fileUrl || formData.file,
        goal: formData.goal,
        link: formData.link,
      };

      let response;
      if (data.mode === "edit" && data.defaultValues?.id) {
        response = await instance.patch(`/${data.type}s/${data.defaultValues.id}`, submitData);
      } else {
        response = await instance.post(`/${data.type}s`, submitData);
      }

      if (handleFormSubmit) {
        await handleFormSubmit(response.data);
      }

      onClose();
    } catch (error) {
      console.error("폼 제출 실패:", error);
    }
  };

  return {
    form,
    activeField,
    selectedFile,
    isValid,
    setActiveField,
    handleFileSelect,
    handleFileRemove,
    handleSubmit,
  };
};
