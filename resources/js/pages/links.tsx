import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { AnimatePresence, motion } from 'framer-motion';
import { Clipboard, ExternalLink, X } from 'lucide-react';
import { useState } from 'react';

interface Link {
    id: number;
    original_url: string;
    short_code: string;
    created_at: string;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Links',
        href: '/links',
    },
];

export default function Links() {
    const { links } = usePage<{ links: Link[] }>().props;
    const [toast, setToast] = useState<string | null>(null);

    const showToast = (message: string) => {
        setToast(message);
        setTimeout(() => setToast(null), 2500); // Hide toast after 2.5s
    };

    // Base URL (update this with your actual domain)
    const baseUrl = window.location.origin;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Links" />
            <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-6">
                <h1 className="text-3xl font-bold text-white">Your Shortened Links</h1>

                <div className="mt-4 space-y-4">
                    {links.length > 0 ? (
                        links.map((link) => {
                            const fullShortUrl = `${baseUrl}/${link.short_code}`; // Construct full URL

                            return (
                                <Card key={link.id} className="border border-gray-700 bg-transparent shadow-lg">
                                    <CardHeader>
                                        <CardTitle className="truncate text-lg text-gray-200">{link.original_url}</CardTitle>
                                        <CardDescription className="text-gray-400">
                                            Created at: {new Date(link.created_at).toLocaleString()}
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="flex items-center justify-between">
                                        <a
                                            href={fullShortUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-white underline transition-colors hover:text-gray-300"
                                        >
                                            {fullShortUrl}
                                        </a>

                                        <div className="flex gap-2">
                                            {/* Copy Button */}
                                            <Button
                                                variant="ghost"
                                                className="text-gray-400 hover:text-white"
                                                onClick={() => {
                                                    navigator.clipboard.writeText(fullShortUrl);
                                                    showToast('✅ Link copied to clipboard!');
                                                }}
                                            >
                                                <Clipboard size={16} /> Copy
                                            </Button>

                                            {/* Open Button */}
                                            <Button
                                                variant="default"
                                                className="bg-white text-black hover:bg-gray-300"
                                                onClick={() => window.open(fullShortUrl, '_blank')}
                                            >
                                                <ExternalLink size={16} /> Open
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            );
                        })
                    ) : (
                        <p className="text-gray-400">No links found.</p>
                    )}
                </div>
            </div>

            {/* Custom Toast Notification */}
            <AnimatePresence>
                {toast && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="fixed bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-lg bg-gray-800 px-4 py-3 text-white shadow-lg"
                    >
                        {toast}
                        <button className="ml-2 text-gray-400 hover:text-white" onClick={() => setToast(null)}>
                            <X size={16} />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </AppLayout>
    );
}
