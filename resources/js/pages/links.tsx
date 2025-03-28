import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';
import { AnimatePresence, motion } from 'framer-motion';
import { Clipboard, ExternalLink, Trash2, X } from 'lucide-react';
import { useState } from 'react';

interface Link {
    id: number;
    original_url: string;
    short_code: string;
    created_at: string;
}

interface Pagination {
    current_page: number;
    last_page: number;
    prev_page_url: string | null;
    next_page_url: string | null;
    links: { url: string | null; label: string; active: boolean }[];
}

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Links', href: '/links' }];

export default function Links() {
    const { links, pagination } = usePage<{ links: Link[]; pagination: Pagination }>().props;
    const [toast, setToast] = useState<string | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [selectedLinkId, setSelectedLinkId] = useState<number | null>(null);

    const showToast = (message: string) => {
        setToast(message);
        setTimeout(() => setToast(null), 2500);
    };

    const baseUrl = window.location.origin;

    const openDeleteModal = (id: number) => {
        setSelectedLinkId(id);
        setShowModal(true);
    };

    const handleDelete = () => {
        if (selectedLinkId) {
            router.delete(`/links/${selectedLinkId}`, {
                onSuccess: () => {
                    showToast('🗑️ Link deleted successfully!');
                    setShowModal(false);
                },
            });
        }
    };

    // Generate Pagination Numbers
    const getPageNumbers = () => {
        const pages: (number | string)[] = [];
        const { current_page, last_page } = pagination;
        const maxPagesToShow = 3;

        if (last_page <= 7) {
            for (let i = 1; i <= last_page; i++) pages.push(i);
        } else {
            pages.push(1);

            if (current_page > maxPagesToShow + 2) pages.push('...');

            const start = Math.max(2, current_page - maxPagesToShow);
            const end = Math.min(last_page - 1, current_page + maxPagesToShow);
            for (let i = start; i <= end; i++) pages.push(i);

            if (current_page < last_page - maxPagesToShow - 1) pages.push('...');
            pages.push(last_page);
        }

        return pages;
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Links" />
            <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-6">
                <h1 className="text-3xl font-bold text-white">Your Shortened Links</h1>

                {/* Links List */}
                <div className="mt-4 space-y-4">
                    {links.length > 0 ? (
                        links.map((link) => {
                            const fullShortUrl = `${baseUrl}/${link.short_code}`;

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

                                            {/* Delete Button */}
                                            <Button
                                                variant="destructive"
                                                className="bg-red-600 text-white hover:bg-red-700"
                                                onClick={() => openDeleteModal(link.id)}
                                            >
                                                <Trash2 size={16} /> Delete
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

                {/* Pagination */}
                <div className="mt-6 flex items-center justify-center gap-2">
                    {pagination.prev_page_url && (
                        <Button
                            variant="outline"
                            className="border-gray-700 text-white hover:border-gray-500"
                            onClick={() => router.visit(pagination.prev_page_url!)}
                        >
                            « Prev
                        </Button>
                    )}

                    {getPageNumbers().map((page, index) =>
                        typeof page === 'number' ? (
                            <Button
                                key={index}
                                variant={page === pagination.current_page ? 'default' : 'outline'}
                                className={`border-gray-700 text-white hover:border-gray-500 ${
                                    page === pagination.current_page ? 'bg-gray-700 text-white' : ''
                                }`}
                                onClick={() => router.visit(`?page=${page}`)}
                            >
                                {page}
                            </Button>
                        ) : (
                            <span key={index} className="px-2 text-gray-400">
                                {page}
                            </span>
                        ),
                    )}

                    {pagination.next_page_url && (
                        <Button
                            variant="outline"
                            className="border-gray-700 text-white hover:border-gray-500"
                            onClick={() => router.visit(pagination.next_page_url!)}
                        >
                            Next »
                        </Button>
                    )}
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            <Dialog open={showModal} onOpenChange={setShowModal}>
                <DialogContent className="border-gray-700 text-white">
                    <DialogHeader>
                        <DialogTitle>Confirm Deletion</DialogTitle>
                    </DialogHeader>
                    <p>Are you sure you want to delete this link? This action cannot be undone.</p>
                    <DialogFooter>
                        <Button variant="outline" className="border-gray-700 text-white" onClick={() => setShowModal(false)}>
                            Cancel
                        </Button>
                        <Button variant="destructive" className="bg-red-600 hover:bg-red-700" onClick={handleDelete}>
                            Confirm Delete
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

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
