import BrochureLibraryClient from "./BrochureLibraryClient";

export const metadata = {
  title: "Brochure Library & AI | Cars",
  description: "Browse premium automotive specifications and chat with our AI assistant.",
};

export default function BrochuresPage() {
  return (
    <main className="min-h-screen pt-24 pb-32">
      <BrochureLibraryClient />
    </main>
  );
}
