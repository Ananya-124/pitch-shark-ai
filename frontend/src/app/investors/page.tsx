"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import TopNav from "@/components/layout/TopNav";
import PageHeader from "@/components/ui/PageHeader";
import GlowButton from "@/components/ui/GlowButton";
import SharkCard from "@/components/sharks/SharkCard";
import { usePitchPilotStore } from "@/store/usePitchPilotStore";
import { getInvestorFeedback } from "@/services/api";
import { getMockFeedback } from "@/data/mockData";
import { SHARKS } from "@/data/sharks";

export default function InvestorsPage() {
  const router = useRouter();
  const {
    pitch,
    analysis,
    sharkAnswers,
    setFeedback,
    initOffersFromFeedback,
    loadingFeedback,
    setLoading,
  } = usePitchPilotStore();

  useEffect(() => {
    if (!pitch || !analysis) router.replace("/pitch");
  }, [pitch, analysis, router]);

  const handleGetFeedback = async () => {
    const allAnswered = SHARKS.every((s) => sharkAnswers[s.id]?.trim());
    if (!allAnswered) {
      alert("Please answer all shark questions before proceeding.");
      return;
    }

    setLoading("feedback", true);

    try {
      const result = await getInvestorFeedback({
        pitch: pitch!,
        analysis: analysis!,
        answers: sharkAnswers as Record<"finance" | "tech" | "marketing" | "risk", string>,
      });
      setFeedback(result.sharks);
      initOffersFromFeedback(result.sharks);
    } catch {
      const mockFb = getMockFeedback(parseInt(pitch?.ask || "50"));
      setFeedback(mockFb);
      initOffersFromFeedback(mockFb);
    } finally {
      setLoading("feedback", false);
    }

    router.push("/results");
  };

  if (!pitch || !analysis) return null;

  return (
    <>
      <TopNav />
      <main className="relative z-10 pt-28 pb-16 px-6 max-w-5xl mx-auto">
        <PageHeader
          eyebrow="03 / AI INVESTOR PANEL"
          title="Meet the AI Sharks"
          subtitle="Answer each shark's question to trigger their personalised evaluation of your startup."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {SHARKS.map((shark, i) => (
            <SharkCard key={shark.id} shark={shark} index={i} />
          ))}
        </div>

        <div className="flex justify-between items-center mt-4">
          <GlowButton variant="secondary" onClick={() => router.push("/analysis")}>
            ← BACK TO ANALYSIS
          </GlowButton>
          <GlowButton
            onClick={handleGetFeedback}
            disabled={loadingFeedback}
          >
            {loadingFeedback ? "EVALUATING..." : "GET INVESTOR FEEDBACK →"}
          </GlowButton>
        </div>
      </main>
    </>
  );
}
