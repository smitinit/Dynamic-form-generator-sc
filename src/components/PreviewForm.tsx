import { RenderField } from "./RenderField";

import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";

import { Trash } from "lucide-react";

import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { deleteField, toggleRequire } from "@/store/formdataSlice";

import { Link } from "react-router-dom";

export const PreviewForm = () => {
  const dispatch = useAppDispatch();
  const formFieldData = useAppSelector((state) => state.value.fields);

  if (!formFieldData.length) {
    return (
      <div className="text-sm text-muted-foreground text-center py-8">
        No fields added yet. Start building your form.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 flex-1 max-w-3xl">
      <div className="flex flex-col gap-1">
        <h2 className="text-lg font-semibold">Preview Form</h2>
        <p className="text-sm text-muted-foreground">
          Toggle required status or delete fields as needed.
        </p>
      </div>
      {formFieldData.map((field) => (
        <div
          key={field.id}
          className="rounded-lg border bg-background p-4 flex flex-col gap-3"
        >
          <div className="pl-1 flex items-center justify-between">
            <RenderField formField={field} />
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <Checkbox
                  id={field.id}
                  checked={!!field.required}
                  onCheckedChange={() => dispatch(toggleRequire(field.id))}
                />
                <Label htmlFor={field.id}>Make it Required</Label>
              </div>

              <Separator orientation="vertical" className="h-6  mx-1" />
              <Trash
                className="h-4 w-4 cursor-pointer text-destructive/60 hover:text-destructive"
                onClick={() => dispatch(deleteField(field.id))}
              />
            </div>
          </div>
        </div>
      ))}
      <div className="flex justify-end">
        <Button asChild className="w-fit">
          <Link to="/submission">Go to Submission Page</Link>
        </Button>
      </div>
    </div>
  );
};
