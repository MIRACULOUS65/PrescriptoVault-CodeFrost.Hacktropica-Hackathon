import { DashboardLayout } from '@/components/layout/DashboardLayout';

export default function PharmacyLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <DashboardLayout role="pharmacy">
            {children}
        </DashboardLayout>
    );
}
