import { NewFieldForm } from "@/components/NewFieldForm";
import { RenderFormFields } from "@/components/RenderFormFields";

export const BuilderPage = () => {
  return (
    <main className="flex justify-between w-full items-center">
      <NewFieldForm />
      <RenderFormFields />
    </main>
  );
};
export default BuilderPage;
