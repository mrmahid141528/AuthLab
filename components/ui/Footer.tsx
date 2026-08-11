export function Footer() {
    return (
        <footer className="border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black mt-auto">
            <div className="max-w-5xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between text-sm text-zinc-500 dark:text-zinc-500 gap-4">
                <p>
                    &copy; {new Date().getFullYear()} AuthLab. All rights reserved.
                </p>
                <p>
                    Built for production.
                </p>
            </div>
        </footer>
    );
}
