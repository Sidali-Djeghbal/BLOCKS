export const metadata = {
  title: "Home - T.G Blocks",
  description: "description",
};

import PageIllustration from "@/components/page-illustration";
import Hero from "@/components/hero-home";
import Workflows from "@/components/workflows";
import Features from "@/components/features";
import JoinBanner from "@/components/JoinBanner";

export default function Home() {
  return (
    <>
      <PageIllustration />
      <Hero />
      <Workflows />
      <Features />
      <JoinBanner />
    </>
  );
}
