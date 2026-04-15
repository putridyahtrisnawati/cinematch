import LeftBanner from "@/components/ui/auth/LeftBanner";
import LoginForm from "@/components/ui/auth/LoginForm";
import Footer from "@/components/ui/layouts/Footer";

export default function LoginPage() {
  return (
    <main className="flex flex-col min-h-screen bg-[#041329] text-white">
      <div className="flex flex-1">
        <LeftBanner />

        <section className="w-full lg:w-1/2 flex items-center justify-center px-6 py-10 lg:px-16">
          <LoginForm />
        </section>
      </div>

      <Footer />
    </main>
  );
}