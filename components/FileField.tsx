"use client";

import {
  MultiFileDropzone,
  type FileState,
} from "@/components/MultiFileDropzone";
import { useEdgeStore } from "@/lib/edgeStore";

import { useState } from "react";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { cn } from "@/lib/utils";
import { File, Trash } from "lucide-react";
import { Button } from "./ui/button";
import SuperButton from "./SuperButton";

type Props<T extends FieldValues> = {
  form: UseFormReturn<T>;
  name: Path<T>;
  label: string;
placeHolder?:string
  labelStyles?: string;
};
export function FielField<T extends FieldValues>({
  form,
  label,
placeHolder,
  name,

  labelStyles,
}: Props<T>) {
  const [fileStates, setFileStates] = useState<FileState[]>([]);
  const { edgestore } = useEdgeStore();

  function updateFileProgress(key: string, progress: FileState["progress"]) {
    setFileStates((fileStates) => {
      const newFileStates = structuredClone(fileStates);
      const fileState = newFileStates.find(
        (fileState) => fileState.key === key
      );
      if (fileState) {
        fileState.progress = progress;
      }
      return newFileStates;
    });
  }

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className={cn("text-[#606060]", labelStyles)}>
            {label}
          </FormLabel>
          <FormControl>
            <div>
          {  !field.value &&   <MultiFileDropzone
            placeHolder={placeHolder}
                value={fileStates}
                onChange={(files) => {
                  setFileStates(files);
                }}
                onFilesAdded={async (addedFiles) => {
                  setFileStates([...fileStates, ...addedFiles]);
                  await Promise.all(
                    addedFiles.map(async (addedFileState) => {
                      try {
                        const res = await edgestore.publicFiles.upload({
                          file: addedFileState.file,
                          onProgressChange: async (progress) => {
                            updateFileProgress(addedFileState.key, progress);
                            if (progress === 100) {
                              // wait 1 second to set it to complete
                              // so that the user can see the progress bar at 100%
                              await new Promise((resolve) =>
                                setTimeout(resolve, 1000)
                              );
                              updateFileProgress(
                                addedFileState.key,
                                "COMPLETE"
                              );
                            }
                          },
                        });
                        console.log(res);
                        field.onChange(res.url);
                      } catch (err) {
                        updateFileProgress(addedFileState.key, "ERROR");
                      }
                    })
                  );
                }}
              />}
              {!!field.value && (
                <div className="mt-4 w-full border rounded-md flex items-center justify-between p-3">
                  <div className="flex items-center gap-1">
                  <File size={30} className="text-muted-foreground" />
                  <SuperButton buttonType="linkButton" href={field.value} variant="link" title={fileStates[0].file.name}/>
                  </div>

            
                  <Button
                    type="button"
                    variant={"secondary"}
                    className="hover:opacity-80 transition"
                    onClick={() => field.onChange("")}
                  >
                    <Trash size={30} className=" text-red-500   cursor-pointer fill-red-500" />
                  </Button>
                </div>
              )}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
