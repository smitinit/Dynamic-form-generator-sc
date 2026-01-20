import { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { Button } from "./ui/button";
import { updateFormDetails } from "@/store/formdataSlice";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

export const FormDetails = () => {
  const dispatch = useAppDispatch();
  const formDetails = useAppSelector((state) => state.value.formDetails);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    function sync() {
      setTitle(formDetails?.title ?? "");
      setDescription(formDetails?.description ?? "");
    }
    sync();
  }, [formDetails]);

  function handleSave() {
    if (!title || !description) return;

    dispatch(
      updateFormDetails({
        title,
        description,
      }),
    );
  }

  const isDirty =
    formDetails?.title !== title || formDetails?.description !== description;

  return (
    <div className="flex flex-col gap-2 rounded-lg bg-accent text-white p-5">
      <div className="flex flex-col gap-1">
        <Label className="text-sm font-medium">Form Header</Label>
        <Input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter form title"
          className="max-w-md"
        />
      </div>

      <div className="flex flex-col gap-1">
        <Label className="text-sm font-medium">Form Description</Label>
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Short description"
          className="max-w-md"
        />
      </div>

      <div className="flex justify-end">
        <Button
          type="button"
          variant={"secondary"}
          onClick={handleSave}
          disabled={!isDirty}
        >
          Save
        </Button>
      </div>
    </div>
  );
};
