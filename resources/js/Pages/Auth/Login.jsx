import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { LogIn, Sparkles } from 'lucide-react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    const fillDemoCredentials = () => {
        setData({
            email: 'demo@noirdrop.com',
            password: 'password',
            remember: true,
        });
    };

    return (
        <GuestLayout>
            <Head title="Log in — Noirdrop" />

            <div className="mb-6 text-center">
                <h2 className="text-xl font-bold text-white">Welcome Back</h2>
                <p className="text-xs text-zinc-400 mt-1">Sign in to manage your e-commerce product drops</p>
            </div>

            {/* Quick Demo Fill Banner */}
            <div className="mb-5 flex items-center justify-between rounded-xl border border-purple-500/30 bg-purple-500/10 p-3">
                <div className="flex items-center space-x-2 text-xs text-purple-300">
                    <Sparkles className="h-4 w-4 shrink-0" />
                    <span>Quick Test Account</span>
                </div>
                <button
                    type="button"
                    onClick={fillDemoCredentials}
                    className="rounded-lg bg-purple-600 px-2.5 py-1 text-[11px] font-bold text-white hover:bg-purple-500 transition"
                >
                    Auto-Fill Demo
                </button>
            </div>

            {status && (
                <div className="mb-4 text-xs font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-3">
                    {status}
                </div>
            )}

            <form onSubmit={submit} className="space-y-4">
                <div>
                    <InputLabel htmlFor="email" value="Email Address" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        placeholder="you@example.com"
                        className="mt-1"
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => setData('email', e.target.value)}
                    />

                    <InputError message={errors.email} className="mt-1 text-xs text-rose-400" />
                </div>

                <div>
                    <div className="flex items-center justify-between">
                        <InputLabel htmlFor="password" value="Password" />
                        {canResetPassword && (
                            <Link
                                href={route('password.request')}
                                className="text-[11px] text-zinc-400 hover:text-purple-300 transition"
                            >
                                Forgot password?
                            </Link>
                        )}
                    </div>

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        placeholder="••••••••"
                        className="mt-1"
                        autoComplete="current-password"
                        onChange={(e) => setData('password', e.target.value)}
                    />

                    <InputError message={errors.password} className="mt-1 text-xs text-rose-400" />
                </div>

                <div className="flex items-center justify-between pt-1">
                    <label className="flex items-center cursor-pointer">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) => setData('remember', e.target.checked)}
                        />
                        <span className="ms-2 text-xs text-zinc-400">
                            Remember me
                        </span>
                    </label>
                </div>

                <div className="pt-2">
                    <PrimaryButton className="w-full flex items-center justify-center space-x-2 py-3" disabled={processing}>
                        <LogIn className="h-4 w-4" />
                        <span>Sign In</span>
                    </PrimaryButton>
                </div>

                <div className="mt-6 text-center text-xs text-zinc-400">
                    Don't have an account?{' '}
                    <Link href={route('register')} className="font-semibold text-purple-400 hover:text-purple-300 transition">
                        Create an account
                    </Link>
                </div>
            </form>
        </GuestLayout>
    );
}
