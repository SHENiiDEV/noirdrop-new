import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import { User, KeyRound, ShieldAlert } from 'lucide-react';

export default function Edit({ mustVerifyEmail, status }) {
    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center space-x-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400">
                        <User className="h-5 w-5" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-white leading-tight">Account Profile</h2>
                        <p className="text-xs text-zinc-400">Manage your profile details, password, and security</p>
                    </div>
                </div>
            }
        >
            <Head title="Profile Settings — Noirdrop" />

            <div className="py-10">
                <div className="mx-auto max-w-7xl space-y-6 px-4 sm:px-6 lg:px-8">
                    
                    {/* Profile Info */}
                    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 shadow-xl backdrop-blur-md sm:p-8">
                        <div className="flex items-center space-x-2 border-b border-zinc-800 pb-4 mb-6">
                            <User className="h-4 w-4 text-purple-400" />
                            <h3 className="text-base font-bold text-white">Profile Information</h3>
                        </div>
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-xl"
                        />
                    </div>

                    {/* Password Update */}
                    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 shadow-xl backdrop-blur-md sm:p-8">
                        <div className="flex items-center space-x-2 border-b border-zinc-800 pb-4 mb-6">
                            <KeyRound className="h-4 w-4 text-purple-400" />
                            <h3 className="text-base font-bold text-white">Update Password</h3>
                        </div>
                        <UpdatePasswordForm className="max-w-xl" />
                    </div>

                    {/* Danger Zone */}
                    <div className="rounded-2xl border border-rose-500/20 bg-rose-950/10 p-6 shadow-xl backdrop-blur-md sm:p-8">
                        <div className="flex items-center space-x-2 border-b border-rose-500/20 pb-4 mb-6">
                            <ShieldAlert className="h-4 w-4 text-rose-400" />
                            <h3 className="text-base font-bold text-rose-300">Delete Account</h3>
                        </div>
                        <DeleteUserForm className="max-w-xl" />
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
