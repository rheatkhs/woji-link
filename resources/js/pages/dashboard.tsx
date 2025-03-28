import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard() {
    // Static Data for now
    const totalLinks = 120;
    const totalViews = 4520;
    const totalUsers = 38;

    // Sample data for the graph
    const chartData = [
        { name: 'Jan', views: 100 },
        { name: 'Feb', views: 250 },
        { name: 'Mar', views: 480 },
        { name: 'Apr', views: 620 },
        { name: 'May', views: 900 },
        { name: 'Jun', views: 1100 },
        { name: 'Jul', views: 1500 },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-6">
                <h1 className="text-3xl font-bold text-white">Dashboard</h1>

                {/* Stats Cards */}
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <Card className="border border-gray-700 bg-transparent shadow-lg">
                        <CardHeader>
                            <CardTitle className="text-lg text-gray-200">Total Links</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-4xl font-bold text-blue-400">{totalLinks}</p>
                        </CardContent>
                    </Card>

                    <Card className="border border-gray-700 bg-transparent shadow-lg">
                        <CardHeader>
                            <CardTitle className="text-lg text-gray-200">Total Views</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-4xl font-bold text-green-400">{totalViews}</p>
                        </CardContent>
                    </Card>

                    <Card className="border border-gray-700 bg-transparent shadow-lg">
                        <CardHeader>
                            <CardTitle className="text-lg text-gray-200">Total Users</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-4xl font-bold text-purple-400">{totalUsers}</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Line Chart */}
                <Card className="mt-6 border border-gray-700 bg-transparent shadow-lg">
                    <CardHeader>
                        <CardTitle className="text-lg text-gray-200">Link Views Over Time</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                <CartesianGrid stroke="rgba(255, 255, 255, 0.1)" />
                                <XAxis dataKey="name" tick={{ fill: '#E5E7EB' }} />
                                <YAxis tick={{ fill: '#E5E7EB' }} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#1E1E2E', border: '1px solid #374151', color: '#E5E7EB' }}
                                    cursor={{ stroke: '#4F46E5' }}
                                />
                                <Line type="monotone" dataKey="views" stroke="#4F46E5" strokeWidth={2} dot={{ fill: '#4F46E5', r: 4 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
