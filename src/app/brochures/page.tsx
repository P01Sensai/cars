import BrochureLibraryClient from "./BrochureLibraryClient";

export const metadata = {
  title: "Brochure Analysis | Cars",
  description: "Upload your car brochure and let AI analyze and compare it.",
};

export default function BrochuresPage() {
  return (
    <main className="min-h-screen pt-20">
      <BrochureLibraryClient />
    </main>
  );
}
