import Hero from '@/components/Hero'
import Dashboard from '@/components/Dashboard'
import Footer from '@/components/Footer'

export default function Home() {
    return (
        <main className="min-h-screen">
            <Hero />
            <Dashboard />
            <Footer />
        </main>
    )
}
