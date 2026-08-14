import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminLogin, adminRegister } from '@/lib/api';

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<'login' | 'add'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    try {
      await adminLogin(email, password);
      navigate('/admin/dashboard');
    } catch (err: any) {
      setError(err.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setLoading(true);
    try {
      await adminRegister({ email, password, firstName, lastName });
      setSuccess('User added successfully. Sign in with this email.');
      setPassword('');
      setConfirmPassword('');
      setMode('login');
    } catch (err: any) {
      setError(err.message || 'Failed to add user');
    } finally {
      setLoading(false);
    }
  };

  const inputCls =
    'w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2879b1] focus:border-transparent transition-all';

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <img
            src="https://refexairports.com/wp-content/uploads/2023/08/Refex-Airports-Logo.png"
            alt="Refex Airports"
            className="h-14 w-auto mx-auto mb-4 brightness-0 invert"
          />
          <h1 className="text-2xl font-bold text-white">CMS Admin Panel</h1>
          <p className="text-slate-400 mt-1">Manage your website content</p>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-8 shadow-2xl">
          <div className="grid grid-cols-2 gap-2 mb-6">
            <button
              type="button"
              onClick={() => {
                setMode('login');
                setError('');
              }}
              className={`py-2.5 rounded-lg text-sm font-medium cursor-pointer ${
                mode === 'login' ? 'bg-[#2879b1] text-white' : 'bg-white/10 text-slate-300'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => {
                setMode('add');
                setError('');
                setSuccess('');
              }}
              className={`py-2.5 rounded-lg text-sm font-medium cursor-pointer ${
                mode === 'add' ? 'bg-[#2879b1] text-white' : 'bg-white/10 text-slate-300'
              }`}
            >
              Add User
            </button>
          </div>

          {mode === 'login' ? (
            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i className="ri-mail-line text-slate-400"></i>
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={inputCls}
                    placeholder="admin@refexairports.com"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i className="ri-lock-line text-slate-400"></i>
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={inputCls}
                    placeholder="Enter your password"
                    required
                  />
                </div>
              </div>
              {success && (
                <div className="bg-emerald-500/20 border border-emerald-500/30 rounded-lg px-4 py-3 text-emerald-300 text-sm">
                  {success}
                </div>
              )}
              {error && (
                <div className="bg-red-500/20 border border-red-500/30 rounded-lg px-4 py-3 flex items-center gap-2">
                  <i className="ri-error-warning-line text-red-400"></i>
                  <span className="text-red-300 text-sm">{error}</span>
                </div>
              )}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#2879b1] hover:bg-[#20618e] text-white font-semibold py-3 rounded-lg transition-all cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <i className="ri-loader-4-line animate-spin"></i>
                    Signing in...
                  </>
                ) : (
                  <>
                    <i className="ri-login-box-line"></i>
                    Sign In
                  </>
                )}
              </button>
            </form>
          ) : (
            <form onSubmit={handleAddUser} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">First name</label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2879b1]"
                    placeholder="Admin"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Last name</label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2879b1]"
                    placeholder="User"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2879b1]"
                  placeholder="you@refexairports.com"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2879b1]"
                  placeholder="At least 6 characters"
                  required
                  minLength={6}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Confirm password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2879b1]"
                  placeholder="Re-enter password"
                  required
                />
              </div>
              {error && (
                <div className="bg-red-500/20 border border-red-500/30 rounded-lg px-4 py-3 flex items-center gap-2">
                  <i className="ri-error-warning-line text-red-400"></i>
                  <span className="text-red-300 text-sm">{error}</span>
                </div>
              )}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#2879b1] hover:bg-[#20618e] text-white font-semibold py-3 rounded-lg transition-all cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <i className="ri-loader-4-line animate-spin"></i>
                    Adding user...
                  </>
                ) : (
                  <>
                    <i className="ri-user-add-line"></i>
                    Add User
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        <p className="text-center text-slate-500 text-sm mt-6">
          Back to <a href="/" className="text-[#2879b1] hover:underline">Website</a>
        </p>
      </div>
    </div>
  );
}
