import NavBar from "~/components/Navbar";
import Footer from "~/components/footer";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="px-8 py-6 lg:px-2 lg:py-1 max-w-7xl mx-auto flex flex-col min-h-screen">
            <NavBar />
            <main className='flex-1'>
                {children}
            </main>
            {/* <Footer /> */}
        </div>
    )

}

