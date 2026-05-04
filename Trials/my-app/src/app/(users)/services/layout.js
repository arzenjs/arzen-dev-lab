export default function ServicesLayout({ children }) {
    return (
        <main className="flex-1">
            <h1 className="text-4xl font-bold text-white-600 mb-8 text-center m-10 py-6 px-4 bg-blue-500 rounded-lg shadow-md">Our Services</h1>
            {children}
        </main>
    );
}