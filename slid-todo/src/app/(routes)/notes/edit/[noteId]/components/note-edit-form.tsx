import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { NoteEditFormValues } from "./utils/edit-validation";
import LinkEmbed from "@/components/shared/link-embed/link-embed";
import NoteWriteEditor from "@/components/shared/editor/note-write-editor";
import { Separator } from "@/components/ui/separator";
import EmbedContent from "@/components/shared/note-viewer/embed-content";
import { cn } from "@/utils/cn";
interface NoteEditFormProps {
  form: UseFormReturn<NoteEditFormValues>;
}

const NoteEditForm = ({ form }: NoteEditFormProps) => {
  return (
    <form>
      <div className="flex flex-col">
        <EmbedContent url={form.watch("linkUrl") || ""} isVisible={true} simpleMode={true} />
        <div>
          <Separator />
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <>
                <FormItem>
                  <FormControl>
                    <div className="flex items-center gap-2">
                      <Input
                        {...field}
                        type="text"
                        placeholder="제목을 입력해 주세요"
                        className="p-0 border-none text-lg focus:outline-none text-slate-800 bg-transparent dark:border-none dark:bg-transparent dark:text-slate-200"
                        maxLength={30}
                        onChange={(e) => {
                          if (e.target.value.length <= 30) {
                            field.onChange(e.target.value);
                          }
                        }}
                        onBlur={field.onBlur}
                        autoComplete="text"
                      />
                      <span
                        className={cn(
                          "text-sm flex-shrink-0",
                          field.value?.length === 30
                            ? "text-red-500 dark:text-red-400"
                            : "text-slate-500 dark:text-slate-400",
                        )}
                      >
                        {field.value?.length || 0}/30
                      </span>
                    </div>
                  </FormControl>
                  <FormMessage className="py-2" />
                </FormItem>
                <Separator />
              </>
            )}
          />
          <FormField
            control={form.control}
            name="linkUrl"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <LinkEmbed {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <NoteWriteEditor
                    content={field.value}
                    onContentChange={(value: string) => {
                      field.onChange(value);
                    }}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
      </div>
    </form>
  );
};

export default NoteEditForm;
