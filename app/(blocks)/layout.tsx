import PageIllustration from "@/components/page-illustration";
import Footer from "@/components/ui/footer";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main className="relative flex grow flex-col">
        <PageIllustration multiple />

        {children}
      </main>
      <Footer />
    </>
  );
}
