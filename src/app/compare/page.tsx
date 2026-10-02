import CompareClient from "./CompareClient";

export const metadata = {
  title: "Compare | Cars",
  description: "Spec Matchup Engine. Compare Indian automotive specifications seamlessly.",
};

export default function ComparePage() {
  return (
    <main className="min-h-screen pt-10">
      <CompareClient />
    </main>
  );
}
