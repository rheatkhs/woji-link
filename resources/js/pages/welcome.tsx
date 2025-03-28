import { Head, router, useForm } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { CheckCircle, Clipboard, ExternalLink, Link as LucideLink, RotateCcw, WandSparkles } from 'lucide-react';
import { useState } from 'react';
import Squares from '../components/reactbits/Squares/Squares';

export default function Welcome({ short_url }: { short_url?: string }) {
    const { data, setData, post, processing, reset } = useForm<{ original_url: string }>({
        original_url: '',
    });

    const [copied, setCopied] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/shorten', {
            preserveScroll: true,
        });
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(short_url || '');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // Hide after 2s
    };

    const handleReset = () => {
        reset();
        setCopied(false);
        router.visit('/');
    };

    return (
        <>
            <Head title="Woji Link - Efficiency at Your Fingertips!" />

            {/* Background Animation */}
            <div className="absolute inset-0 bg-black">
                <Squares speed={0.5} squareSize={40} direction="diagonal" borderColor="#222" hoverFillColor="#333" />
            </div>

            {/* Main Container */}
            <div className="relative flex min-h-screen items-center justify-center px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    className="relative w-full max-w-2xl rounded-lg border border-gray-800 bg-black p-8 shadow-md"
                >
                    {/* Title */}
                    <motion.h1
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                        className="shiny-text mb-4 text-center text-5xl font-extrabold sm:text-6xl"
                    >
                        Woji Link
                    </motion.h1>

                    {/* Description */}
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2, delay: 0.3, ease: 'easeOut' }}
                        className="mb-6 text-center text-lg text-gray-300 sm:text-xl"
                    >
                        Say goodbye to long, ugly URLs. Make your links short, sleek, and shareable in seconds. No sign-up, no hassle—just pure
                        efficiency.
                    </motion.p>

                    {/* URL Input Form */}
                    <motion.form
                        onSubmit={handleSubmit}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, ease: 'easeOut' }}
                        className="flex w-full flex-col items-center rounded-lg bg-black p-6 shadow-md"
                    >
                        <div className="relative w-full">
                            <input
                                type="url"
                                placeholder="Paste your long URL here..."
                                value={data.original_url}
                                onChange={(e) => setData('original_url', e.target.value)}
                                required
                                className="w-full rounded-lg border border-gray-700 bg-black p-3 pl-10 text-white focus:ring-2 focus:ring-purple-500 focus:outline-none"
                            />
                            <LucideLink className="absolute top-3 left-3 text-gray-500" size={20} />
                        </div>
                        <button
                            type="submit"
                            disabled={processing || window.location.pathname === '/shorten'}
                            className={`mt-4 flex w-full transform items-center justify-center gap-2 rounded-lg py-3 text-white transition duration-300 hover:scale-105 ${
                                processing || window.location.pathname === '/shorten'
                                    ? 'cursor-not-allowed bg-gray-600'
                                    : 'bg-purple-600 hover:bg-purple-700'
                            }`}
                        >
                            {processing ? 'Shortening...' : 'Shorten My Link'} <WandSparkles size={18} />
                        </button>
                    </motion.form>

                    {/* Shortened URL Display */}
                    {short_url && (
                        <motion.div
                            initial={{ opacity: 0, y: 20, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ duration: 0.6, ease: 'easeOut' }}
                            className="mt-6 w-full rounded-lg border border-gray-700 bg-gray-900 p-6 text-center text-white shadow-lg"
                        >
                            {/* Magic Link Header */}
                            <motion.p
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className="text-lg font-semibold text-purple-300"
                            >
                                🎉 Your magic link is ready!
                            </motion.p>

                            {/* Shortened URL Box */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                                className="mt-2 flex flex-col items-center justify-center gap-2 rounded-lg border border-gray-700 bg-gray-800 p-3 sm:flex-row"
                            >
                                <span className="flex-1 break-all text-purple-400">{short_url}</span>

                                {/* Copy Button */}
                                <div className="relative">
                                    <button
                                        onClick={handleCopy}
                                        className="flex items-center gap-2 rounded-lg bg-gray-700 px-3 py-2 text-sm font-medium text-gray-100 transition hover:bg-gray-600"
                                    >
                                        <Clipboard size={16} /> Copy
                                    </button>

                                    {/* Copy Confirmation */}
                                    {copied && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            className="absolute top-[-40px] left-1/2 flex items-center gap-2 rounded-lg bg-purple-600 px-3 py-2 text-sm text-white shadow-lg"
                                        >
                                            <CheckCircle size={16} /> Copied!
                                        </motion.div>
                                    )}
                                </div>
                            </motion.div>

                            {/* Action Buttons */}
                            <div className="mt-4 flex flex-col justify-center gap-3 sm:flex-row">
                                {/* Open Link */}
                                <motion.a
                                    href={short_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-purple-600 px-4 py-2 text-white transition hover:bg-purple-700"
                                >
                                    <ExternalLink size={18} /> Open Link
                                </motion.a>

                                {/* Reset Button */}
                                <motion.button
                                    onClick={handleReset}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-gray-700 px-4 py-2 text-white transition hover:bg-gray-800"
                                >
                                    <RotateCcw size={18} /> Reset
                                </motion.button>
                            </div>
                        </motion.div>
                    )}
                </motion.div>
            </div>
            {/* Shiny Text Effect Styles */}
            <style>
                {`
                .shiny-text {
                    background: linear-gradient(90deg, #a855f7, #f472b6, #a855f7);
                    background-size: 200% 200%;
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    animation: animate-gradient 3s infinite linear;
                }

                @keyframes animate-gradient {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
                `}
            </style>
        </>
    );
}
