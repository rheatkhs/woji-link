import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Link, Link2, WandSparkles } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Welcome() {
    const [url, setUrl] = useState('');
    const [shortUrl] = useState('');
    const [loading, setLoading] = useState(false);

    // Typing Effect State
    const fullText = 'Woji Link';
    const [typedText, setTypedText] = useState('');
    const [index, setIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const speed = isDeleting ? 75 : 150; // Faster deletion, slower typing
        const pauseTime = isDeleting ? 500 : 1500; // Longer pause before deleting

        const handleTyping = () => {
            if (!isDeleting && index === fullText.length) {
                setTimeout(() => setIsDeleting(true), pauseTime);
            } else if (isDeleting && index === 0) {
                setTimeout(() => setIsDeleting(false), pauseTime);
            }

            setTypedText(fullText.substring(0, index + (isDeleting ? -1 : 1)));
            setIndex(index + (isDeleting ? -1 : 1));
        };

        const typingTimeout = setTimeout(handleTyping, speed);
        return () => clearTimeout(typingTimeout);
    }, [index, isDeleting]);

    return (
        <>
            <Head title="Woji Link - Efficiency at Your Fingertips!" />

            <div className="flex min-h-screen flex-col items-center justify-center bg-black px-4 text-white sm:px-6 lg:px-8">
                {/* Header with Looping Typing Effect */}
                <motion.h1
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    className="mb-4 flex items-center gap-2 text-center text-5xl font-extrabold text-purple-400 sm:text-6xl"
                >
                    {typedText}
                    <span className="animate-blink text-purple-500">|</span>
                </motion.h1>

                {/* Subheading */}
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, delay: 0.3, ease: 'easeOut' }}
                    className="mb-6 max-w-2xl text-center text-lg text-gray-300 sm:text-xl"
                >
                    Say goodbye to long, ugly URLs. Make your links short, sleek, and shareable in seconds. No sign-up, no hassle—just pure
                    efficiency.
                </motion.p>

                {/* URL Shortener Form */}
                <motion.form
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    className="flex w-full max-w-md flex-col items-center rounded-lg bg-gray-900 p-6 shadow-lg"
                >
                    <div className="relative w-full">
                        <input
                            type="url"
                            placeholder="Paste your long URL here..."
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            required
                            className="w-full rounded-lg border border-gray-700 bg-black p-3 pl-10 text-white focus:ring-2 focus:ring-purple-500 focus:outline-none"
                        />
                        <Link className="absolute top-3 left-3 text-gray-500" size={20} />
                    </div>
                    <button
                        type="submit"
                        className="mt-4 flex w-full transform items-center justify-center gap-2 rounded-lg bg-purple-600 py-3 text-white transition duration-300 hover:scale-105 hover:bg-purple-700"
                    >
                        {loading ? 'Shortening...' : 'Shorten My Link'} <WandSparkles size={18} />
                    </button>
                </motion.form>

                {/* Shortened URL Display */}
                {shortUrl && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                        className="mt-6 w-full max-w-md rounded-lg bg-gray-900 p-4 text-center text-white shadow-lg"
                    >
                        <p className="font-semibold text-purple-300">Here’s your magic link:</p>
                        <a
                            href={shortUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-2 flex items-center justify-center gap-2 font-bold break-all text-purple-400 underline"
                        >
                            {shortUrl} <Link2 size={18} />
                        </a>
                    </motion.div>
                )}

                {/* Footer */}
                <motion.footer
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.5, delay: 0.6 }}
                    className="mt-8 text-sm text-gray-400 opacity-70"
                >
                    Built with ❤️ by Woji Studio — Because long URLs are so last season.
                </motion.footer>
            </div>
        </>
    );
}
