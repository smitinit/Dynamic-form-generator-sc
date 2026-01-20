import { RenderField } from "./RenderField";

import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";

import { Trash } from "lucide-react";

import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  deleteAllFields,
  deleteField,
  resetFormData,
  toggleRequire,
} from "@/store/formdataSlice";

import { Link } from "react-router-dom";
import { FormDetails } from "./FormDetails";

export const PreviewForm = () => {
  // get the data and the action function from the store
  const dispatch = useAppDispatch();
  const formFieldData = useAppSelector((state) => state.value.fields);

  return (
    <div className="flex flex-col gap-4 flex-1 max-w-3xl p-6">
      {/* form header editor */}
      <FormDetails />

      <div className="h-[500px] overflow-auto gap-3 flex flex-col  justify-center">
        {formFieldData.length ? (
          formFieldData.map((field) => (
            <div
              key={field.id}
              className="flex  flex-col gap-3 rounded-lg border bg-background p-4"
            >
              <div className="pl-1 flex items-center justify-between">
                <div className="flex-1">
                  <RenderField formField={field} />
                </div>
                <div className="flex items-center justify-between gap-4 ">
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
          ))
        ) : (
          <div className="text-sm text-muted-foreground text-center py-8">
            No fields added yet. Start building your form.
          </div>
        )}
      </div>

      <div className="flex justify-end gap-2">
        <Button
          type="button"
          onClick={() => dispatch(deleteAllFields())}
          className="w-fit"
        >
          Delete All Fields
        </Button>
        <Button
          type="button"
          onClick={() => dispatch(resetFormData())}
          className="w-fit"
        >
          Reset
        </Button>
        <Button asChild className="w-fit">
          <Link to="/submission">Go to Submission Page</Link>
        </Button>
      </div>
    </div>
  );
};
