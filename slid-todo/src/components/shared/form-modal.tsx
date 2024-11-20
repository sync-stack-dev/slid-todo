"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useFormModal, ModalType, ModalMode } from "@/stores/use-form-modal-store";
import { useEffect, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { X } from "lucide-react";
import { instance } from "@/lib/axios";
import { useGoals } from "@/hooks/goals/use-goals";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useConfirmModal } from "@/stores/use-confirm-modal-store";
const schema = z.object({
  title: z
    .string()
    .min(1, { message: "제목은 필수입니다." })
    .max(30, { message: "제목은 최대 30자입니다." }),
  description: z.string().optional(),
  done: z.boolean().default(false),
  file: z.string().optional(),
  link: z.string().optional(),
  goal: z
    .object({
      id: z.number(),
      title: z.string(),
    })
    .optional(),
});

type FormSchema = z.infer<typeof schema>;

const titles: Record<ModalType, Record<ModalMode, string>> = {
  todo: {
    create: "할 일 생성",
    edit: "할 일 수정",
  },
  note: {
    create: "노트 생성",
    edit: "노트 수정",
  },
};

export const FormModal = () => {
  const { isOpen, data, onSubmit: handleFormSubmit, onClose } = useFormModal();
  const { onOpen: openConfirm } = useConfirmModal();
  const [activeField, setActiveField] = useState<"file" | "link" | null>("file");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedLink, setSelectedLink] = useState<string>("");
  const shouldFetchGoals = isOpen && data?.type === "todo";
  const { data: goalsData, isLoading: goalsLoading } = useGoals({
    enabled: shouldFetchGoals,
  });
  const form = useForm<FormSchema>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      description: "",
      done: false,
      file: "",
    },
    mode: "onChange",
  });

  const isVaild = form.watch("title")?.length > 0 && form.watch("title")?.length <= 30;

  useEffect(() => {
    if (data?.defaultValues) {
      // console.log("수정 모달 열 때 받은 데이터:", data.defaultValues);
      // console.log("파일 URL:", data.defaultValues.fileUrl);
      // console.log("링크 URL:", data.defaultValues.linkUrl);

      form.reset({
        title: data.defaultValues.title || "",
        description: data.defaultValues.description || "",
        done: data.defaultValues.done ?? false,
        link: data.defaultValues.link || "",
        file: data.defaultValues.file || "",
      });
    }
  }, [data, form]);

  if (!isOpen || !data) return null;

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
  };

  const removeFile = () => {
    setSelectedFile(null);
  };

  const onSubmit = async (formData: FormSchema) => {
    try {
      let fileUrl = undefined;

      // 파일이 있으면 업로드 (activeField와 무관하게)
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

      const submitData: any = {
        title: formData.title,
        done: formData.done,
      };

      // 파일 URL이 있으면 추가
      if (fileUrl) {
        submitData.fileUrl = fileUrl;
      }

      // 링크가 있으면 추가 (activeField와 무관하게)
      if (formData.link) {
        submitData.linkUrl = formData.link;
      }

      if (data.type === "todo" && formData.goal?.id) {
        submitData.goalId = formData.goal.id;
      }

      console.log("제출할 데이터:", submitData);

      if (data.mode === "edit" && data.defaultValues?.id) {
        await instance.patch(`/${data.type}s/${data.defaultValues.id}`, submitData);
      } else {
        await instance.post(`/${data.type}s`, submitData);
      }

      await handleFormSubmit?.(submitData);
      onClose();
    } catch (error) {
      console.error("폼 제출 실패:", error);
    }
  };
  const handleCloseAttempt = (open: boolean) => {
    // ESC 키나 바깥 영역 클릭으로 닫을 때만 확인 모달 표시
    if (!open) {
      openConfirm({
        title: "정말 나가시겠어요?",
        description: "작성된 내용이 모두 삭제됩니다.",
        confirmText: "나가기",
        variant: "danger",
        onConfirm: () => {
          onClose();
        },
      });
      return false;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleCloseAttempt}>
      <DialogContent className="max-w-[400px] p-0 gap-0 z-[50] pointer-events-none">
        <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
          <X className="h-4 w-4" onClick={() => handleCloseAttempt(false)} />
          <span className="sr-only">Close</span>
        </DialogClose>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader className="p-4 space-y-0">
              <DialogTitle>
                <div className="flex items-center justify-between">
                  <h2 className="text-base font-medium">{titles[data.type][data.mode]}</h2>
                </div>
              </DialogTitle>
              <DialogDescription className="sr-only">
                {data.type === "todo"
                  ? "할 일을 생성하거나 수정합니다"
                  : "노트를 생성하거나 수정합니다"}
              </DialogDescription>
            </DialogHeader>

            <div className="p-4 space-y-4">
              <FormField
                control={form.control}
                name="done"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex items-center gap-2">
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                        <span>Done</span>
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>제목</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="할 일의 제목을 적어주세요" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="link"
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
                            className="border-2 border-dashed rounded-lg p-4 text-center cursor-pointer hover:bg-gray-50 h-[184px] flex items-center justify-center"
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={(e) => {
                              e.preventDefault();
                              const file = e.dataTransfer.files[0];
                              if (file) handleFileSelect(file);
                            }}
                            onClick={() => {
                              const input = document.createElement("input");
                              input.type = "file";
                              input.onchange = (e) => {
                                const file = (e.target as HTMLInputElement).files?.[0];
                                if (file) handleFileSelect(file);
                              };
                              input.click();
                            }}
                          >
                            파일을 드래그하여 업로드하세요
                          </div>
                        )}
                        {activeField === "file" && selectedFile && (
                          <div className="border rounded-lg p-2">
                            <div className="flex items-center justify-between">
                              <span className="text-sm truncate">{selectedFile.name}</span>
                              <Button type="button" variant="ghost" size="sm" onClick={removeFile}>
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        )}
                        {activeField === "link" && (
                          <Input placeholder="링크를 입력해주세요" {...field} />
                        )}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {data?.type === "todo" && (
                <FormField
                  control={form.control}
                  name="goal"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>목표</FormLabel>
                      <FormControl>
                        <Select
                          value={field.value?.id?.toString() || "no-goals"} // 기본값 수정
                          onValueChange={(value) => {
                            // "loading"이나 "no-goals"일 경우 무시
                            if (value === "loading" || value === "no-goals") return;

                            const selectedGoal = goalsData?.goals.find(
                              (g) => g.id === parseInt(value),
                            );
                            if (selectedGoal) {
                              field.onChange({ id: selectedGoal.id, title: selectedGoal.title });
                            }
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="목표를 선택해주세요" />
                          </SelectTrigger>
                          <SelectContent>
                            {goalsLoading ? (
                              <SelectItem value="loading">로딩중...</SelectItem>
                            ) : goalsData?.goals && goalsData.goals.length > 0 ? (
                              goalsData.goals.map((goal) => (
                                <SelectItem key={goal.id} value={goal.id.toString()}>
                                  {goal.title}
                                </SelectItem>
                              ))
                            ) : (
                              <SelectItem value="no-goals">목표가 없습니다</SelectItem>
                            )}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>

            <div className="p-4 border-t">
              <Button type="submit" className="w-full" disabled={!isVaild}>
                {data.mode === "create" ? "생성" : "수정"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
