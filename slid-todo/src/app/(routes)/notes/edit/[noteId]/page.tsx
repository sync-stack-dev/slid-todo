"use client";
import { useParams, useRouter } from "next/navigation";
import { Loading } from "@/components/shared/loading";
import { useNoteWithTodo } from "@/hooks/note/use-note";
import NoteEditHeader from "./components/note-edit-header";
import NoteEditInfo from "./components/note-edit-info";
import { useNoteActions } from "@/hooks/note/use-note-actions";
import { useEffect, useState } from "react";
import { useNoteEditStore } from "@/stores/use-note-store";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { NoteEditFormValues, NoteEditSchema } from "./components/utils/edit-validation";
import toast from "react-hot-toast";
import { useConfirmModal } from "@/stores/use-confirm-modal-store";
import dynamic from "next/dynamic";

const NoteEditForm = dynamic(() => import("./components/note-edit-form"), {
  loading: () => <Loading />,
  ssr: false,
});

const NoteEditPage = () => {
  const router = useRouter();
  const { noteId } = useParams();
  const [preSave, setPreSave] = useState({
    title: "",
    content: "",
    linkUrl: "",
  });
  const saveKey = `${noteId}-edit-note`;
  const { note, todo, isLoading, isError } = useNoteWithTodo(Number(noteId));
  const { updateNote } = useNoteActions(note);
  const { onOpen: openConfirm } = useConfirmModal();

  const form = useForm<NoteEditFormValues>({
    resolver: zodResolver(NoteEditSchema),
    defaultValues: {
      title: note?.title,
      content: note?.content,
      linkUrl: note?.linkUrl,
    },
    mode: "onBlur",
  });

  useEffect(() => {
    if (note) {
      form.reset({
        title: note.title,
        content: note.content,
        linkUrl: note.linkUrl,
      });
    }
  }, [note]);

  useEffect(() => {
    const preData = localStorage.getItem(saveKey);
    if (!preData) return;

    const data = JSON.parse(preData);

    if (note && note.title === data.title && note.content === data.content) return;

    setPreSave(data);

    openConfirm({
      title: `'${data.title}' 제목의 노트를 불러오시겠습니까?`,
      confirmText: "불러오기",
      variant: "info",
      onConfirm: () => {
        form.reset({
          title: data.title,
          content: data.content,
          linkUrl: data.linkUrl,
        });
      },
    });
  }, [noteId, form]);

  if (isLoading) return <Loading />;
  if (!note || !todo) return <div>노트 혹은 투두가 없습니다.</div>;

  const handlePreSave = () => {
    const preSaveData = {
      title: form.getValues("title"),
      content: form.getValues("content"),
      linkUrl: form.getValues("linkUrl"),
    };

    localStorage.setItem(saveKey, JSON.stringify(preSaveData));

    toast.success("임시저장에 성공했습니다.");
    router.back();
  };

  const handleUpdate = () => {
    updateNote({
      noteId: Number(noteId),
      updatedNote: {
        title: form.getValues("title"),
        content: form.getValues("content"),
        linkUrl: form.getValues("linkUrl"),
      },
    });
  };

  if (!note || !todo) return <div>노트 혹은 할 일 데이터를 찾지 못했습니다.</div>;
  if (isLoading) return <Loading />;
  if (isError) return <div>에러가 발생했습니다.</div>;

  return (
    <FormProvider {...form}>
      <div className="px-4 md:pl-16 py-6">
        <div className="flex flex-col w-full md:w-2/3 h-full">
          <div>
            <NoteEditHeader onClickUpdateBtn={handleUpdate} onClickPreSaveBtn={handlePreSave} />
            <NoteEditInfo todo={todo} />
            <NoteEditForm form={form} />
          </div>
        </div>
      </div>
    </FormProvider>
  );
};

export default NoteEditPage;
