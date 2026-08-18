import React from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { UserPlus, ShieldCheck, MapPin, User, Mail, Lock, Phone, Calendar, CheckSquare } from 'lucide-react';

export default function Register({ forbiddenCountries = [] }) {
  // Comprehensive list of world countries
  const allCountries = [
    'United Kingdom', 'United States', 'Canada', 'Australia', 'Germany', 'France', 'Italy', 'Spain',
    'Netherlands', 'Austria', 'Belgium', 'Bulgaria', 'Croatia', 'Cyprus', 'Czech Republic', 'Denmark',
    'Estonia', 'Finland', 'Greece', 'Hungary', 'Iceland', 'Ireland', 'Latvia', 'Lithuania', 'Luxembourg',
    'Malta', 'Norway', 'Poland', 'Portugal', 'Romania', 'Slovakia', 'Slovenia', 'Sweden', 'Switzerland',
    'Albania', 'Andorra', 'Argentina', 'Armenia', 'Bahamas', 'Bahrain', 'Barbados', 'Belize', 'Benin',
    'Bhutan', 'Bolivia', 'Bosnia and Herzegovina', 'Botswana', 'Brazil', 'Brunei', 'Cambodia', 'Cameroon',
    'Cape Verde', 'Chile', 'Colombia', 'Costa Rica', 'Dominica', 'Dominican Republic', 'Ecuador', 'Egypt',
    'El Salvador', 'Fiji', 'Gabon', 'Gambia', 'Georgia', 'Ghana', 'Grenada', 'Guatemala', 'Guyana',
    'Honduras', 'India', 'Indonesia', 'Israel', 'Jamaica', 'Japan', 'Jordan', 'Kazakhstan', 'Kenya',
    'Kiribati', 'Kuwait', 'Kyrgyzstan', 'Laos', 'Lebanon', 'Lesotho', 'Liberia', 'Liechtenstein',
    'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Marshall Islands', 'Mauritania', 'Mauritius', 'Mexico',
    'Micronesia', 'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Morocco', 'Mozambique', 'Namibia',
    'Nauru', 'Nepal', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'North Macedonia', 'Oman', 'Pakistan',
    'Palau', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Qatar', 'Rwanda',
    'Saint Kitts and Nevis', 'Saint Lucia', 'Saint Vincent and the Grenadines', 'Samoa', 'San Marino',
    'Sao Tome and Principe', 'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore',
    'Solomon Islands', 'South Africa', 'South Korea', 'Sri Lanka', 'Suriname', 'Eswatini', 'Tajikistan',
    'Tanzania', 'Thailand', 'Timor-Leste', 'Togo', 'Tonga', 'Trinidad and Tobago', 'Tunisia', 'Turkey',
    'Turkmenistan', 'Tuvalu', 'Uganda', 'United Arab Emirates', 'Uruguay', 'Uzbekistan', 'Vanuatu', 'Vatican City',
    'Vietnam', 'Zambia'
  ];

  // Filter out any forbidden countries
  const forbiddenSet = new Set((forbiddenCountries || []).map(c => c.toLowerCase()));
  const allowedCountries = allCountries.filter(c => !forbiddenSet.has(c.toLowerCase())).sort();

  const { data, setData, post, processing, errors, reset } = useForm({
    name: '',
    surname: '',
    email: '',
    password: '',
    password_confirmation: '',
    phone_number: '',
    date_of_birth: '',
    street_address: '',
    city: '',
    country: 'United Kingdom',
    postal_code: '',
    terms: false,
  });

  const submit = (e) => {
    e.preventDefault();

    post(route('register'), {
      onFinish: () => reset('password', 'password_confirmation'),
    });
  };

  return (
    <GuestLayout maxWidthClass="max-w-2xl">
      <Head title="Create B2B Merchant Account — Noirdrop" />

      <div className="mb-6 text-center">
        <h2 className="text-2xl font-black text-white">Create B2B Account</h2>
        <p className="text-xs text-zinc-400 mt-1">
          High-Ticket B2B SaaS Platform operated by <b className="text-purple-300">HARTDELL LIMITED</b>
        </p>
      </div>

      <div className="mb-6 flex items-center space-x-2 rounded-xl border border-purple-500/30 bg-purple-500/10 p-3 text-xs text-purple-300">
        <ShieldCheck className="h-4 w-4 text-purple-400 shrink-0" />
        <span>Registered Office: Academy House, 11 Dunraven Place, Bridgend, Mid Glamorgan, UK (CF31 1JF)</span>
      </div>

      <form onSubmit={submit} className="space-y-6">
        
        {/* Section 1: Personal Details */}
        <div className="space-y-4 rounded-xl border border-zinc-800 bg-zinc-950/60 p-4">
          <div className="flex items-center space-x-2 border-b border-zinc-800 pb-2">
            <User className="h-4 w-4 text-purple-400" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">1. Personal Credentials</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <InputLabel htmlFor="name" value="Name (First Name)" />
              <TextInput
                id="name"
                name="name"
                value={data.name}
                placeholder="e.g. John"
                className="mt-1 block w-full"
                autoComplete="given-name"
                isFocused={true}
                onChange={(e) => setData('name', e.target.value)}
                required
              />
              <InputError message={errors.name} className="mt-1 text-xs text-rose-400" />
            </div>

            <div>
              <InputLabel htmlFor="surname" value="Surname (Last Name)" />
              <TextInput
                id="surname"
                name="surname"
                value={data.surname}
                placeholder="e.g. Smith"
                className="mt-1 block w-full"
                autoComplete="family-name"
                onChange={(e) => setData('surname', e.target.value)}
                required
              />
              <InputError message={errors.surname} className="mt-1 text-xs text-rose-400" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <InputLabel htmlFor="phone_number" value="Phone Number" />
              <div className="relative">
                <TextInput
                  id="phone_number"
                  name="phone_number"
                  type="tel"
                  value={data.phone_number}
                  placeholder="+44 7911 123456"
                  className="mt-1 block w-full"
                  autoComplete="tel"
                  onChange={(e) => setData('phone_number', e.target.value)}
                  required
                />
              </div>
              <InputError message={errors.phone_number} className="mt-1 text-xs text-rose-400" />
            </div>

            <div>
              <InputLabel htmlFor="date_of_birth" value="Date of Birth" />
              <TextInput
                id="date_of_birth"
                name="date_of_birth"
                type="date"
                value={data.date_of_birth}
                className="mt-1 block w-full text-zinc-300"
                onChange={(e) => setData('date_of_birth', e.target.value)}
                required
              />
              <InputError message={errors.date_of_birth} className="mt-1 text-xs text-rose-400" />
            </div>
          </div>
        </div>

        {/* Section 2: Account Authentication */}
        <div className="space-y-4 rounded-xl border border-zinc-800 bg-zinc-950/60 p-4">
          <div className="flex items-center space-x-2 border-b border-zinc-800 pb-2">
            <Mail className="h-4 w-4 text-purple-400" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">2. Account Authentication</h3>
          </div>

          <div>
            <InputLabel htmlFor="email" value="Email Address" />
            <TextInput
              id="email"
              type="email"
              name="email"
              value={data.email}
              placeholder="you@company.com"
              className="mt-1 block w-full"
              autoComplete="username"
              onChange={(e) => setData('email', e.target.value)}
              required
            />
            <InputError message={errors.email} className="mt-1 text-xs text-rose-400" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
              <InputLabel htmlFor="password_confirmation" value="Confirm Password" />
              <TextInput
                id="password_confirmation"
                type="password"
                name="password_confirmation"
                value={data.password_confirmation}
                placeholder="••••••••"
                className="mt-1 block w-full"
                autoComplete="new-password"
                onChange={(e) => setData('password_confirmation', e.target.value)}
                required
              />
              <InputError message={errors.password_confirmation} className="mt-1 text-xs text-rose-400" />
            </div>
          </div>
        </div>

        {/* Section 3: Billing Address (Split into 4 sub-sections) */}
        <div className="space-y-4 rounded-xl border border-zinc-800 bg-zinc-950/60 p-4">
          <div className="flex items-center space-x-2 border-b border-zinc-800 pb-2">
            <MapPin className="h-4 w-4 text-purple-400" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">3. Billing & Registration Address</h3>
          </div>

          {/* Sub-section 1: Street, house number, apartment... */}
          <div>
            <InputLabel htmlFor="street_address" value="1. Street, House Number, Apartment..." />
            <TextInput
              id="street_address"
              name="street_address"
              value={data.street_address}
              placeholder="e.g. 10 Downing Street, Apt 4B"
              className="mt-1 block w-full"
              autoComplete="street-address"
              onChange={(e) => setData('street_address', e.target.value)}
              required
            />
            <InputError message={errors.street_address} className="mt-1 text-xs text-rose-400" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Sub-section 2: City */}
            <div>
              <InputLabel htmlFor="city" value="2. City" />
              <TextInput
                id="city"
                name="city"
                value={data.city}
                placeholder="e.g. London"
                className="mt-1 block w-full"
                autoComplete="address-level2"
                onChange={(e) => setData('city', e.target.value)}
                required
              />
              <InputError message={errors.city} className="mt-1 text-xs text-rose-400" />
            </div>

            {/* Sub-section 3: Country */}
            <div>
              <InputLabel htmlFor="country" value="3. Country" />
              <select
                id="country"
                name="country"
                value={data.country}
                onChange={(e) => setData('country', e.target.value)}
                className="mt-1 block w-full rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-2 text-xs text-white focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                required
              >
                {allowedCountries.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              <InputError message={errors.country} className="mt-1 text-xs text-rose-400" />
            </div>

            {/* Sub-section 4: Post code */}
            <div>
              <InputLabel htmlFor="postal_code" value="4. Post Code" />
              <TextInput
                id="postal_code"
                name="postal_code"
                value={data.postal_code}
                placeholder="e.g. SW1A 2AA"
                className="mt-1 block w-full"
                autoComplete="postal-code"
                onChange={(e) => setData('postal_code', e.target.value)}
                required
              />
              <InputError message={errors.postal_code} className="mt-1 text-xs text-rose-400" />
            </div>
          </div>
        </div>

        {/* Section 4: Terms & Privacy Agreement Checkbox */}
        <div className="rounded-xl border border-purple-500/20 bg-purple-950/20 p-4">
          <label className="flex items-start space-x-3 cursor-pointer">
            <input
              type="checkbox"
              id="terms"
              name="terms"
              checked={data.terms}
              onChange={(e) => setData('terms', e.target.checked)}
              className="mt-0.5 h-4 w-4 rounded border-zinc-800 bg-zinc-900 text-purple-600 focus:ring-purple-500 focus:ring-offset-zinc-950"
              required
            />
            <span className="text-xs text-zinc-300 leading-normal">
              I agree to the{' '}
              <Link
                href={route('legal.terms')}
                target="_blank"
                className="font-semibold text-purple-400 hover:text-purple-300 underline transition"
              >
                Terms & Conditions
              </Link>{' '}
              and{' '}
              <Link
                href={route('legal.privacy')}
                target="_blank"
                className="font-semibold text-purple-400 hover:text-purple-300 underline transition"
              >
                Privacy Policy
              </Link>
              .
            </span>
          </label>
          <InputError message={errors.terms} className="mt-2 text-xs text-rose-400" />
        </div>

        {/* Submit Action Button */}
        <div className="pt-2">
          <PrimaryButton className="w-full flex items-center justify-center space-x-2 py-3.5 text-sm font-bold" disabled={processing}>
            <UserPlus className="h-4 w-4" />
            <span>Complete Registration</span>
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
