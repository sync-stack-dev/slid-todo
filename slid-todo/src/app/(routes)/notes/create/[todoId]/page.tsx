"use client";
import { useParams, useRouter } from "next/navigation";
import { Loading } from "@/components/shared/loading";
import { useTodoById } from "@/hooks/todo/use-todos";
import { CreateNoteRequest, useNoteActions } from "@/hooks/note/use-note-actions";
import { FormProvider, useForm } from "react-hook-form";
import { NoteCreateFormValues, NoteCreateSchema } from "./components/utils/create-validation";
import { zodResolver } from "@hookform/resolvers/zod";

import NoteCreateHeader from "./components/note-create-header";
import NoteCreateInfo from "./components/note-create-info";
import NoteCreateForm from "./components/note-create-form";
import { useEffect, useState } from "react";
import { useConfirmModal } from "@/stores/use-confirm-modal-store";
import toast from "react-hot-toast";

const NoteCreatePage = () => {
  const router = useRouter();
  const { todoId } = useParams();
  const [note, setNote] = useState<CreateNoteRequest>({
    todoId: Number(todoId),
    title: "",
    content: "",
    linkUrl: "",
  });
  const saveKey = `${todoId}-create-note`;
  const { todo, isLoading, isError } = useTodoById(Number(todoId));
  const { createNote } = useNoteActions();
  const { onOpen: openConfirm } = useConfirmModal();

  const form = useForm<NoteCreateFormValues>({
    resolver: zodResolver(NoteCreateSchema),
    defaultValues: {
      todoId: Number(todoId),
      title: "",
      content: "",
      linkUrl: "",
    },
    mode: "onBlur",
  });

  useEffect(() => {
    const preData = localStorage.getItem(saveKey);
    if (!preData) return;

    const data = JSON.parse(preData);

    if (note && note.title === data.title) return;

    setNote(data);

    openConfirm({
      title: `'${data.title}' 제목의 노트를 불러오시겠습니까?`,
      confirmText: "불러오기",
      variant: "info",
      onConfirm: () => {
        router.back();
        form.reset({
          todoId: Number(todoId),
          title: data.title,
          content: data.content,
          linkUrl: data.linkUrl,
        });

        // TODO: 정책문제일듯한데 임시저장 데이터는 어느 시점에 지울지..
        localStorage.removeItem(saveKey);
      },
    });
  }, [todoId, form]);

  const handlePreSave = () => {
    const preSaveData = {
      todoId: form.getValues("todoId"),
      title: form.getValues("title"),
      content: form.getValues("content"),
      linkUrl: form.getValues("linkUrl"),
    };

    localStorage.setItem(saveKey, JSON.stringify(preSaveData));

    toast.success("임시저장에 성공했습니다.");
    router.back();
  };

  const handleUpdate = () => {
    createNote({
      todoId: form.getValues("todoId"),
      title: form.getValues("title"),
      content: form.getValues("content"),
      linkUrl: form.getValues("linkUrl"),
    });
  };

  if (!todo) return <div>할 일 데이터를 찾지 못했습니다.</div>;
  if (isLoading) return <Loading />;
  if (isError) return <div>에러가 발생했습니다.</div>;

  return (
    <FormProvider {...form}>
      <div className="h-screen  px-36 py-10">
        <div className="flex flex-col w-2/3 h-full">
          <div>
            <NoteCreateHeader onClickUpdateBtn={handleUpdate} onClickPreSaveBtn={handlePreSave} />
            <NoteCreateInfo todo={todo} />
            <NoteCreateForm form={form} />
          </div>
        </div>
      </div>
    </FormProvider>
  );
};

export default NoteCreatePage;