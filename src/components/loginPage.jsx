import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, Sparkles, User, GraduationCap, BookOpen } from "lucide-react";

export default function Login({ userType = "student" }) {
   const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [activeUserType, setActiveUserType] = useState("student");

  const handleSubmit = async () => {
    setIsLoading(true);
    
    try {
      // Simulated API call - replace with actual API
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Store user data
      localStorage.setItem('token', 'demo-token-' + Date.now());
      localStorage.setItem('role', activeUserType);
      localStorage.setItem('user', JSON.stringify({
        email: form.email,
        userType: activeUserType,
        name: activeUserType === 'student' ? 'John Doe' : 'Prof. Smith'
      }));
      
      // Navigate to dashboard
      navigate(`/${activeUserType}/dashboard`);
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };


  const floatingObjects = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    size: Math.random() * 60 + 20,
    left: Math.random() * 100,
    delay: Math.random() * 5,
    duration: Math.random() * 10 + 15,
  }));

  const config = {
    student: {
      icon: GraduationCap,
      title: "Student Portal",
      subtitle: "Access your academic journey",
      gradient: "from-purple-500 to-blue-500",
      glowGradient: "from-purple-400 to-blue-400",
      emailPlaceholder: "student@university.edu",
      buttonText: "Sign In as Student"
    },
    teacher: {
      icon: BookOpen,
      title: "Teacher Portal",
      subtitle: "Manage your classes with ease",
      gradient: "from-indigo-500 to-purple-500",
      glowGradient: "from-indigo-400 to-purple-400",
      emailPlaceholder: "teacher@university.edu",
      buttonText: "Sign In as Teacher"
    }
  };

  const currentConfig = config[activeUserType];
  const IconComponent = currentConfig.icon;

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {floatingObjects.map((obj) => (
          <div
            key={obj.id}
            className="absolute rounded-full bg-white opacity-5 blur-xl animate-float"
            style={{
              width: `${obj.size}px`,
              height: `${obj.size}px`,
              left: `${obj.left}%`,
              top: `-${obj.size}px`,
              animationDelay: `${obj.delay}s`,
              animationDuration: `${obj.duration}s`,
            }}
          />
        ))}
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Glowing Orbs */}
      <div className="absolute top-20 left-20 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl opacity-20 animate-pulse-slow" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl opacity-20 animate-pulse-slow" style={{ animationDelay: '1s' }} />

      {/* Login Container */}
      <div className="relative min-h-screen flex justify-center items-center p-4">
        <div className="w-full max-w-md">
          {/* User Type Toggle */}
          <div className="backdrop-blur-xl bg-white/10 rounded-2xl p-2 mb-6 border border-white/20 flex gap-2">
            <button
              onClick={() => setActiveUserType('student')}
              className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                activeUserType === 'student'
                  ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg'
                  : 'text-blue-200/70 hover:text-white hover:bg-white/5'
              }`}
            >
              <GraduationCap className="w-5 h-5" />
              Student
            </button>
            <button
              onClick={() => setActiveUserType('teacher')}
              className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                activeUserType === 'teacher'
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg'
                  : 'text-blue-200/70 hover:text-white hover:bg-white/5'
              }`}
            >
              <BookOpen className="w-5 h-5" />
              Teacher
            </button>
          </div>

          <div className="transform transition-all duration-700 hover:scale-105">
            {/* Glass Card */}
            <div className="relative backdrop-blur-xl bg-white/10 p-8 rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
              {/* Shimmer Effect */}
              <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              
              {/* Header */}
              <div className="text-center mb-8 relative">
                <div className="inline-block mb-4 relative">
                  <div className={`absolute inset-0 bg-gradient-to-r ${currentConfig.glowGradient} blur-xl opacity-50 animate-pulse-slow`} />
                  <div className={`relative bg-gradient-to-r ${currentConfig.gradient} p-4 rounded-2xl`}>
                    <IconComponent className="w-10 h-10 text-white" />
                  </div>
                </div>
                <h2 className="text-4xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent mb-2">
                  {currentConfig.title}
                </h2>
                <p className="text-blue-200/80 flex items-center justify-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  {currentConfig.subtitle}
                  <Sparkles className="w-4 h-4" />
                </p>
              </div>

              <div className="space-y-6">
                {/* Email Input */}
                <div className="relative group">
                  <div className={`absolute inset-0 bg-gradient-to-r ${currentConfig.gradient} rounded-xl blur opacity-0 group-hover:opacity-50 transition-opacity duration-300 ${focusedField === 'email' ? 'opacity-50' : ''}`} />
                  <div className="relative">
                    <Mail className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-all duration-300 ${focusedField === 'email' ? 'text-blue-400' : 'text-blue-300/50'}`} />
                    <input
                      type="email"
                      placeholder={currentConfig.emailPlaceholder}
                      value={form.email}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-blue-200/50 focus:outline-none focus:border-blue-400 focus:bg-white/15 transition-all duration-300"
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div className="relative group">
                  <div className={`absolute inset-0 bg-gradient-to-r ${currentConfig.gradient} rounded-xl blur opacity-0 group-hover:opacity-50 transition-opacity duration-300 ${focusedField === 'password' ? 'opacity-50' : ''}`} />
                  <div className="relative">
                    <Lock className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-all duration-300 ${focusedField === 'password' ? 'text-blue-400' : 'text-blue-300/50'}`} />
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={form.password}
                      onFocus={() => setFocusedField('password')}
                      onBlur={() => setFocusedField(null)}
                      onChange={(e) => setForm({ ...form, password: e.target.value })}
                      onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                      className="w-full pl-12 pr-12 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-blue-200/50 focus:outline-none focus:border-blue-400 focus:bg-white/15 transition-all duration-300"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-300/50 hover:text-blue-400 transition-colors duration-300"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Remember & Forgot */}
                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input type="checkbox" className="w-4 h-4 rounded bg-white/10 border-white/20" />
                    <span className="text-blue-200/80 group-hover:text-white transition-colors">Remember me</span>
                  </label>
                  <button type="button" className="text-blue-300 hover:text-white transition-colors">
                    Forgot password?
                  </button>
                </div>

                {/* Submit Button */}
                <button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className={`relative w-full py-4 bg-gradient-to-r ${currentConfig.gradient} text-white font-semibold rounded-xl overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-r ${activeUserType === 'student' ? 'from-purple-600 to-blue-600' : 'from-indigo-600 to-purple-600'} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                  <span className="relative flex items-center justify-center gap-2">
                    {isLoading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Signing in...
                      </>
                    ) : (
                      <>
                        {currentConfig.buttonText}
                        <Sparkles className="w-5 h-5" />
                      </>
                    )}
                  </span>
                </button>
              </div>

              {/* Footer */}
              <div className="mt-6 text-center">
                <p className="text-blue-200/80">
                  {activeUserType === 'student' ? "Need assistance?" : "New to the platform?"}{" "}
                  <button className="text-white font-semibold hover:underline transition-all">
                    {activeUserType === 'student' ? "Contact Support" : "Get Started"}
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(0) rotate(0deg);
          }
          100% {
            transform: translateY(100vh) rotate(360deg);
          }
        }
        
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        
        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.2;
          }
          50% {
            opacity: 0.3;
          }
        }
        
        .animate-float {
          animation: float linear infinite;
        }
        
        .animate-shimmer {
          animation: shimmer 3s infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}