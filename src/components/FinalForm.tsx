import { toast } from "sonner";
import { RenderField } from "./RenderField";

import { Button } from "./ui/button";

import { useAppSelector } from "@/hooks/redux";

import { Link } from "react-router-dom";

export const FinalForm = () => {
  const formFieldData = useAppSelector((state) => state.value.fields);

  if (!formFieldData.length) {
    return (
      <div className="flex gap-2 flex-row">
        <p className="text-sm text-muted-foreground text-center py-8">
          No Forms yet. Start building your form.
        </p>
        <Link to={"/"}>Create your form.</Link>
      </div>
    );
  }

  function handleOnSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    toast.info(
      <pre className="text-xs">
        Form Submitted with: <br />
        {JSON.stringify(data, null, 2)}
      </pre>,
    );
  }
  return (
    <form
      onSubmit={(e) => handleOnSubmit(e)}
      className="flex flex-col gap-4 flex-1 max-w-3xl"
    >
      <div className="flex flex-col gap-1">
        <h2 className="text-lg font-semibold">Final Form!</h2>
        <p className="text-sm text-muted-foreground">
          Review and submit your form below.
        </p>
      </div>
      {formFieldData.map((field) => (
        <div
          key={field.id}
          className="rounded-lg border bg-background p-4  flex flex-col gap-3"
        >
          <div className="pl-1">
            <RenderField formField={field} />
          </div>
        </div>
      ))}
      <div className="flex justify-between">
        <Button asChild>
          <Link to={"/"}>Go back to Builder Page</Link>
        </Button>
        <div className="flex  gap-3">
          <Button type="reset" className="w-fit">
            Reset
          </Button>
          <Button type="submit" className="w-fit">
            Submit
          </Button>
        </div>
      </div>
    </form>
  );
};
