import { NewFieldForm } from "@/components/NewFieldGeneratorForm";
import { PreviewForm } from "@/components/PreviewForm";
import { Separator } from "@/components/ui/separator";

export const BuilderPage = () => {
  return (
    <main className="flex justify-around w-full items-center h-screen">
      <NewFieldForm />
      <Separator orientation="vertical" />
      <PreviewForm />
    </main>
  );
};
export default BuilderPage;
