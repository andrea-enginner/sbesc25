import Hero from '@/components/Hero'
import Features from '@/components/Features'
import Dashboard from '@/components/Dashboard'
import ContactForm from '@/components/ContactForm'
import Footer from '@/components/Footer'

export default function Home() {
    return (
        <main className="min-h-screen">
            <Hero />
            <Dashboard />
            <Features />
            <ContactForm />
            <Footer />
        </main>
    )
}
