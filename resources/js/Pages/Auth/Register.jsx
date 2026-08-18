import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { UserPlus, ShieldCheck } from 'lucide-react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Create Account — Noirdrop" />

            <div className="mb-6 text-center">
                <h2 className="text-xl font-bold text-white">Create Your Account</h2>
                <p className="text-xs text-zinc-400 mt-1">Get instant access to Noirdrop B2B product copy engine</p>
            </div>

            <div className="mb-5 flex items-center space-x-2 rounded-xl border border-purple-500/30 bg-purple-500/10 p-3 text-xs text-purple-300">
                <ShieldCheck className="h-4 w-4 text-purple-300 shrink-0" />
                <span>High-Ticket B2B Engine by <b>HARTDELL LIMITED</b></span>
            </div>

            <form onSubmit={submit} className="space-y-4">
                <div>
                    <InputLabel htmlFor="name" value="Full Name or Store Name" />

                    <TextInput
                        id="name"
                        name="name"
                        value={data.name}
                        placeholder="e.g. Alex Merchant"
                        className="mt-1 block w-full"
                        autoComplete="name"
                        isFocused={true}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                    />

                    <InputError message={errors.name} className="mt-1 text-xs text-rose-400" />
                </div>

                <div>
                    <InputLabel htmlFor="email" value="Email Address" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        placeholder="you@store.com"
                        className="mt-1 block w-full"
                        autoComplete="username"
                        onChange={(e) => setData('email', e.target.value)}
                        required
                    />

                    <InputError message={errors.email} className="mt-1 text-xs text-rose-400" />
                </div>

                <div>
                    <InputLabel htmlFor="password" value="Password" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        placeholder="••••••••"
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) => setData('password', e.target.value)}
                        required
                    />

                    <InputError message={errors.password} className="mt-1 text-xs text-rose-400" />
                </div>

                <div>
                    <InputLabel
                        htmlFor="password_confirmation"
                        value="Confirm Password"
                    />

                    <TextInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        placeholder="••••••••"
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) =>
                            setData('password_confirmation', e.target.value)
                        }
                        required
                    />

                    <InputError
                        message={errors.password_confirmation}
                        className="mt-1 text-xs text-rose-400"
                    />
                </div>

                <div className="pt-2">
                    <PrimaryButton className="w-full flex items-center justify-center space-x-2 py-3" disabled={processing}>
                        <UserPlus className="h-4 w-4" />
                        <span>Create Merchant Account</span>
                    </PrimaryButton>
                </div>

                <div className="mt-6 text-center text-xs text-zinc-400">
                    Already have an account?{' '}
                    <Link
                        href={route('login')}
                        className="font-semibold text-purple-400 hover:text-purple-300 transition"
                    >
                        Sign in
                    </Link>
                </div>
            </form>
        </GuestLayout>
    );
}
