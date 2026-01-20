import { RenderField } from "./RenderField";

import { toast } from "sonner";
import { Button } from "./ui/button";

import { useAppSelector } from "@/hooks/redux";

import { Link } from "react-router-dom";

export const FinalForm = () => {
  // get the form data
  const formFieldData = useAppSelector((state) => state.value.fields);
  const formDetails = useAppSelector((state) => state.value.formDetails);
  // check for fallback
  if (!formFieldData.length) {
    return (
      <div className="flex gap-2 flex-col items-center ">
        <p className="text-sm text-muted-foreground text-center py-8">
          No Forms created yet. Start building your form.
        </p>
        <Button asChild>
          <Link to={"/"}>Create your form</Link>
        </Button>
      </div>
    );
  }

  function handleOnSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // get data from input form
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    // display the data
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
      className="flex flex-col gap-4 flex-1 max-w-3xl p-6"
    >
      <div className="flex flex-col gap-1">
        <h2 className="text-lg font-semibold">{formDetails?.title}</h2>
        <p className="text-sm text-muted-foreground">
          {formDetails?.description}
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
