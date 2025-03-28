import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Analytics', href: '/analytics' }];

// Dummy data for the graph
const data = [
    { name: 'Jan', links: 400, views: 2400, users: 200 },
    { name: 'Feb', links: 600, views: 2600, users: 300 },
    { name: 'Mar', links: 700, views: 3000, users: 350 },
    { name: 'Apr', links: 800, views: 3200, users: 400 },
    { name: 'May', links: 950, views: 3800, users: 500 },
];

export default function Analytics() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Analytics" />

            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                <h1 className="text-3xl font-bold text-white">Dashboard Overview</h1>

                {/* Stats Cards */}
                <div className="grid gap-4 md:grid-cols-3">
                    <Card className="border border-gray-700 bg-transparent shadow-lg">
                        <CardHeader>
                            <CardTitle className="text-lg text-gray-200">Total Links</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-3xl font-bold text-white">1,200</p>
                        </CardContent>
                    </Card>

                    <Card className="border border-gray-700 bg-transparent shadow-lg">
                        <CardHeader>
                            <CardTitle className="text-lg text-gray-200">Total Views</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-3xl font-bold text-white">15,450</p>
                        </CardContent>
                    </Card>

                    <Card className="border border-gray-700 bg-transparent shadow-lg">
                        <CardHeader>
                            <CardTitle className="text-lg text-gray-200">Total Users</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-3xl font-bold text-white">850</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Responsive Chart */}
                <Card className="border border-gray-700 bg-transparent shadow-lg">
                    <CardHeader>
                        <CardTitle className="text-lg text-gray-200">Analytics Overview</CardTitle>
                    </CardHeader>
                    <CardContent className="h-[300px] md:h-[400px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                                <XAxis dataKey="name" stroke="#bbb" />
                                <YAxis stroke="#bbb" />
                                <Tooltip contentStyle={{ backgroundColor: '#222', borderColor: '#444', color: '#fff' }} />
                                <Legend wrapperStyle={{ color: '#fff' }} />
                                <Line type="monotone" dataKey="links" stroke="#82ca9d" strokeWidth={2} />
                                <Line type="monotone" dataKey="views" stroke="#8884d8" strokeWidth={2} />
                                <Line type="monotone" dataKey="users" stroke="#ff7300" strokeWidth={2} />
                            </LineChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
