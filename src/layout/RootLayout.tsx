import { Header } from "./header/Header";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <section className="root-layout">
            <Header />
            {children}
        </section>
    )
}
