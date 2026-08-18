import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm, Link } from '@inertiajs/react';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('password.email'));
    };

    return (
        <GuestLayout>
            <Head title="Forgot Password — Noirdrop" />

            <div className="mb-6 text-center">
                <h2 className="text-xl font-bold text-white">Reset Password</h2>
                <p className="text-xs text-zinc-400 mt-1">
                    Enter your account email address to receive a secure password reset link.
                </p>
            </div>

            {status && (
                <div className="mb-4 text-xs font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-3">
                    {status}
                </div>
            )}

            <form onSubmit={submit} className="space-y-4">
                <div>
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        placeholder="you@example.com"
                        className="mt-1 block w-full"
                        isFocused={true}
                        onChange={(e) => setData('email', e.target.value)}
                    />

                    <InputError message={errors.email} className="mt-1 text-xs text-rose-400" />
                </div>

                <div className="pt-2">
                    <PrimaryButton className="w-full flex items-center justify-center py-3" disabled={processing}>
                        Send Reset Link
                    </PrimaryButton>
                </div>

                <div className="mt-6 text-center text-xs text-zinc-400">
                    Remembered password?{' '}
                    <Link href={route('login')} className="font-semibold text-purple-400 hover:text-purple-300 transition">
                        Back to sign in
                    </Link>
                </div>
            </form>
        </GuestLayout>
    );
}
