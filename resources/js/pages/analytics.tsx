import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';
import { Eye } from 'lucide-react';
import { useState } from 'react';

interface LinkItem {
    id: number;
    original_url: string;
    short_code: string;
    clicks: number;
    analytics: { ip_address: string; device: string; browser: string; location: string; created_at: string }[];
}

interface Pagination {
    current_page: number;
    last_page: number;
    prev_page_url: string | null;
    next_page_url: string | null;
    links: { url: string | null; label: string; active: boolean }[];
}

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Analytics', href: '/analytics' }];

export default function Analytics() {
    const { links, pagination, totalClicks } = usePage<{ links: LinkItem[]; pagination: Pagination; totalClicks: number }>().props;

    const [selectedLink, setSelectedLink] = useState<LinkItem | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [modalPagination, setModalPagination] = useState({
        currentPage: 1,
        itemsPerPage: 5,
    });

    // Open Modal with Selected Link Data
    const openAnalyticsModal = (link: LinkItem) => {
        setSelectedLink(link);
        setShowModal(true);
        setModalPagination({ currentPage: 1, itemsPerPage: 5 });
    };

    // Paginate analytics data within modal
    const paginatedAnalytics = selectedLink?.analytics
        ? selectedLink.analytics.slice(
              (modalPagination.currentPage - 1) * modalPagination.itemsPerPage,
              modalPagination.currentPage * modalPagination.itemsPerPage,
          )
        : [];

    const totalModalPages = selectedLink ? Math.ceil(selectedLink.analytics.length / modalPagination.itemsPerPage) : 0;

    const handleModalPageChange = (page: number) => {
        setModalPagination((prev) => ({ ...prev, currentPage: page }));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Analytics" />

            <div className="flex flex-col gap-6 p-6">
                <h1 className="text-3xl font-bold text-white">Analytics Overview</h1>

                {/* Stats Cards */}
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                    <Card className="border border-gray-700 bg-transparent shadow-lg">
                        <CardHeader>
                            <CardTitle className="text-lg text-gray-200">Total Links</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-3xl font-bold text-white">{pagination.total}</p>
                        </CardContent>
                    </Card>

                    <Card className="border border-gray-700 bg-transparent shadow-lg">
                        <CardHeader>
                            <CardTitle className="text-lg text-gray-200">Total Clicks</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-3xl font-bold text-white">{totalClicks}</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Links Table */}
                <h2 className="mt-6 text-2xl font-bold text-white">Link Click Analytics</h2>
                <table className="mt-4 w-full border-collapse border border-gray-700">
                    <thead>
                        <tr className="bg-purple-800">
                            <th className="border border-gray-700 px-4 py-2">Short Code</th>
                            <th className="border border-gray-700 px-4 py-2">Original URL</th>
                            <th className="border border-gray-700 px-4 py-2">Total Clicks</th>
                            <th className="border border-gray-700 px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {links.length > 0 ? (
                            links.map((link) => (
                                <tr key={link.id}>
                                    <td className="border px-4 py-2 text-center">
                                        <span className="inline-block rounded-md bg-purple-800 px-3 py-1 text-sm font-semibold text-white">
                                            {link.short_code}
                                        </span>
                                    </td>

                                    <td className="max-w-[200px] truncate border px-4 py-2">{link.original_url}</td>
                                    <td className="border px-4 py-2 text-center font-bold">{link.clicks}</td>
                                    <td className="border px-4 py-2 text-center">
                                        <div className="flex justify-center">
                                            <Button
                                                variant="default"
                                                className="flex items-center gap-2 bg-white text-black hover:bg-gray-300"
                                                onClick={() => openAnalyticsModal(link)}
                                            >
                                                <Eye size={16} /> View Analytics
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={4} className="border px-4 py-2 text-center text-gray-400">
                                    No analytics data available.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

                {/* Pagination Controls */}
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

                    {Array.from({ length: pagination.last_page }, (_, i) => i + 1).map((page) => (
                        <Button
                            key={page}
                            variant={page === pagination.current_page ? 'default' : 'outline'}
                            className={`border-gray-700 text-white hover:border-gray-500 ${
                                page === pagination.current_page ? 'bg-gray-700 text-white' : ''
                            }`}
                            onClick={() => router.visit(`?page=${page}`)}
                        >
                            {page}
                        </Button>
                    ))}

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

            {/* Analytics Detail Modal */}
            <Dialog open={showModal} onOpenChange={setShowModal}>
                <DialogContent className="w-full max-w-screen-lg border-gray-700 p-8 text-white shadow-xl sm:max-w-lg md:max-w-2xl lg:max-w-4xl">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-semibold">📊 Detailed Analytics</DialogTitle>
                    </DialogHeader>

                    {selectedLink ? (
                        <div className="space-y-4">
                            {/* URL Info */}
                            <div className="flex flex-col gap-4 rounded-xl border border-gray-600/50 p-6 shadow-lg backdrop-blur-lg sm:flex-row sm:items-center sm:justify-between">
                                {/* Short URL */}
                                <div className="w-full sm:w-1/2">
                                    <p className="text-sm font-medium text-gray-400">🔗 Short URL:</p>
                                    <a
                                        href={selectedLink.short_code}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 text-lg font-semibold break-words text-purple-400 transition hover:text-blue-300 hover:underline"
                                    >
                                        <span className="rounded-md bg-purple-600/20 px-2 py-1 text-sm font-medium text-purple-400 shadow-sm">
                                            http://127.0.0.1:8000/{selectedLink.short_code}
                                        </span>
                                    </a>
                                </div>

                                {/* Original URL */}
                                <div className="w-full sm:w-1/2">
                                    <p className="text-sm font-medium text-gray-400">🌍 Original URL:</p>
                                    <a
                                        href={selectedLink.original_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-lg font-semibold break-words text-purple-400 transition hover:text-blue-300 hover:underline"
                                    >
                                        <span className="rounded-md bg-purple-600/20 px-2 py-1 text-sm font-medium text-purple-400 shadow-sm">
                                            {selectedLink.original_url}
                                        </span>
                                    </a>
                                </div>
                            </div>

                            {/* Responsive Table */}
                            <div className="w-full overflow-x-auto pb-2">
                                <table className="w-full min-w-[700px] border-collapse border border-gray-700 text-sm">
                                    <thead>
                                        <tr className="bg-purple-800 text-xs text-gray-300 uppercase">
                                            <th className="border border-gray-600 px-4 py-3 text-left">IP Address</th>
                                            <th className="border border-gray-600 px-4 py-3 text-left">Device</th>
                                            <th className="border border-gray-600 px-4 py-3 text-left">Browser</th>
                                            <th className="border border-gray-600 px-4 py-3 text-left">Location</th>
                                            <th className="border border-gray-600 px-4 py-3 text-left">Date</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-600">
                                        {paginatedAnalytics.length > 0 ? (
                                            paginatedAnalytics.map((entry, index) => (
                                                <tr key={index} className="transition hover:bg-gray-800">
                                                    <td className="px-4 py-3 break-all">{entry.ip_address}</td>
                                                    <td className="px-4 py-3 break-all">{entry.device}</td>
                                                    <td className="px-4 py-3 break-all">{entry.browser}</td>
                                                    <td className="px-4 py-3 break-all">{entry.location}</td>
                                                    <td className="px-4 py-3 whitespace-nowrap">{new Date(entry.created_at).toLocaleString()}</td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={5} className="px-4 py-3 text-center text-gray-400">
                                                    No analytics data available.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            {/* Modal Pagination Controls */}
                            {selectedLink && selectedLink.analytics.length > 0 && (
                                <div className="mt-6 flex items-center justify-center gap-2">
                                    {modalPagination.currentPage > 1 && (
                                        <Button
                                            variant="outline"
                                            className="border-gray-700 text-white hover:border-gray-500"
                                            onClick={() => handleModalPageChange(modalPagination.currentPage - 1)}
                                        >
                                            « Prev
                                        </Button>
                                    )}

                                    {Array.from({ length: totalModalPages }, (_, i) => i + 1).map((page) => (
                                        <Button
                                            key={page}
                                            variant={page === modalPagination.currentPage ? 'default' : 'outline'}
                                            className={`border-gray-700 text-white hover:border-gray-500 ${
                                                page === modalPagination.currentPage ? 'bg-gray-700 text-white' : ''
                                            }`}
                                            onClick={() => handleModalPageChange(page)}
                                        >
                                            {page}
                                        </Button>
                                    ))}

                                    {modalPagination.currentPage < totalModalPages && (
                                        <Button
                                            variant="outline"
                                            className="border-gray-700 text-white hover:border-gray-500"
                                            onClick={() => handleModalPageChange(modalPagination.currentPage + 1)}
                                        >
                                            Next »
                                        </Button>
                                    )}
                                </div>
                            )}
                        </div>
                    ) : (
                        <p className="text-gray-400">No analytics data available.</p>
                    )}

                    <DialogFooter className="mt-6 flex justify-end">
                        <Button variant="outline" className="border-gray-700 text-white hover:bg-gray-800" onClick={() => setShowModal(false)}>
                            Close
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </AppLayout>
    );
}
