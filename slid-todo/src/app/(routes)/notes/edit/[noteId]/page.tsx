"use client";
import { useParams } from "next/navigation";
import { Loading } from "@/components/shared/loading";
import { useNoteWithTodo } from "@/hooks/note/use-note";
import NoteEditHeader from "./components/note-edit-header";
import NoteEditInfo from "./components/note-edit-info";
import NoteEditForm from "./components/note-edit-form";
import { useNoteActions } from "@/hooks/note/use-note-actions";
import { useEffect } from "react";
import { useNoteEditStore } from "@/stores/use-note-store";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { NoteEditFormValues, NoteEditSchema } from "./components/utils/edit-validation";

const NoteEditPage = () => {
  const { noteId } = useParams();
  const { note, todo, isLoading, isError } = useNoteWithTodo(Number(noteId));
  const { updateNote } = useNoteActions(note);
  const { updateFormData } = useNoteEditStore();

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
      form.setValue("title", note.title);
      form.setValue("content", note.content);
      form.setValue("linkUrl", note.linkUrl || "");
    }
  }, [note, form]);

  const handlePreSave = () => {
    // TODO 임시 저장 로직 처리
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
      <div className="h-screen bg-white px-36 py-10">
        <div className="flex flex-col w-2/3 h-full">
          <div>
            <NoteEditHeader onClickUpdateBtn={handleUpdate} onClickPreSaveBtn={handlePreSave} />
            <NoteEditInfo todo={todo} />
            <NoteEditForm form={form} note={note} />
          </div>
        </div>
      </div>
    </FormProvider>
  );
};

export default NoteEditPage;
