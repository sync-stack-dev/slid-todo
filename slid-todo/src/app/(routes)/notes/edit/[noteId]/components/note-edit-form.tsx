import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormProvider, useFormContext, UseFormReturn } from "react-hook-form";
import { NoteEditFormValues } from "./utils/edit-validation";
import { Note } from "@/types/note";
import LinkEmbed from "@/components/shared/link-embed/link-embed";
import { ensureHttps } from "@/utils/url";
import NoteWriteEditor from "@/components/shared/editor/note-write-editor";
import { useEffect } from "react";

interface NoteEditFormProps {
  note: Note;
  form: UseFormReturn<NoteEditFormValues>;
}

const NoteEditForm = ({ form }: NoteEditFormProps) => {
  return (
    <form className="">
      <div className="space-y-2">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  type="text"
                  placeholder="제목을 입력해 주세요"
                  className="border-x-0 border-y-2 h-[50px] rounded-none border-slate-200 text-lg text-slate-800 py-7"
                  onBlur={field.onBlur}
                  // disabled={isLoading}
                  autoComplete="text"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {form.watch("linkUrl") ? (
          <FormField
            control={form.control}
            name="linkUrl"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <LinkEmbed url={ensureHttps(field.value)} />
                </FormControl>
              </FormItem>
            )}
          />
        ) : (
          // TODO : 링크 추가
          <div>추가</div>
        )}

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <NoteWriteEditor
                  content={field.value}
                  onContentChange={(value: string) => field.onChange(value)}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </div>
    </form>
  );
};

export default NoteEditForm;
