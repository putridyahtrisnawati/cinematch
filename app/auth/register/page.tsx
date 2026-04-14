import LeftBanner from "@/components/ui/auth/LeftBanner";
import RegisterForm from "@/components/ui/auth/RegisterForm";
import Footer from "@/components/ui/layouts/Footer";

export default function RegisterPage() {
  return (
    <main className="flex flex-col min-h-screen bg-background text-white">

      <div className="flex flex-1">

        <LeftBanner />

        <section className="w-full lg:w-1/2 flex items-center justify-center px-6 py-10 lg:px-16">
          <RegisterForm />
        </section>

      </div>

        <Footer />

    </main>
  );
}