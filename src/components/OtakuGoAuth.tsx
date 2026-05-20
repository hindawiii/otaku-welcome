import { useEffect, useRef, useState, type FormEvent } from "react";
import { useNavigate } from "@tanstack/react-router";
import "./otaku-go.css";

type Tab = "login" | "register";

export default function OtakuGoAuth() {
  const [tab, setTab] = useState<Tab>("login");
  const navigate = useNavigate();
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showLoginPw, setShowLoginPw] = useState(false);

  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regConfirm, setRegConfirm] = useState("");
  const [showRegPw, setShowRegPw] = useState(false);
  const [showRegConfirm, setShowRegConfirm] = useState(false);

  const [pupilOffset, setPupilOffset] = useState(0);
  const [typing, setTyping] = useState(false);
  const [smile, setSmile] = useState(false);
  const [surprised, setSurprised] = useState(false);
  const [coverActive, setCoverActive] = useState(false);
  const [shake, setShake] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [regLoading, setRegLoading] = useState(false);

  const typingTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const focusedPasswords = useRef<Set<string>>(new Set());

  // Stars + particles + shooting stars
  const starsRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const container = starsRef.current;
    if (!container) return;
    const created: HTMLElement[] = [];
    for (let i = 0; i < 80; i++) {
      const star = document.createElement("div");
      star.className = "og-star";
      star.style.left = Math.random() * 100 + "%";
      star.style.top = Math.random() * 100 + "%";
      star.style.setProperty("--duration", Math.random() * 3 + 2 + "s");
      star.style.setProperty("--opacity", String(Math.random() * 0.8 + 0.2));
      star.style.animationDelay = Math.random() * 5 + "s";
      container.appendChild(star);
      created.push(star);
    }
    const colors = ["#FF6B6B", "#4ECDC4", "#FFE66D", "#FF8E8E", "#45B7D1"];
    for (let i = 0; i < 15; i++) {
      const p = document.createElement("div");
      p.className = "og-particle";
      p.style.left = Math.random() * 100 + "%";
      p.style.bottom = "-10px";
      p.style.background = colors[Math.floor(Math.random() * colors.length)];
      p.style.animationDelay = Math.random() * 8 + "s";
      p.style.animationDuration = Math.random() * 4 + 6 + "s";
      document.body.appendChild(p);
      created.push(p);
    }
    return () => created.forEach((el) => el.remove());
  }, []);

  const triggerTyping = (length: number) => {
    setPupilOffset(Math.min(length * 0.5, 4));
    setSmile(length > 0);
    setTyping(true);
    if (typingTimeout.current) clearTimeout(typingTimeout.current);
    typingTimeout.current = setTimeout(() => setTyping(false), 300);
  };

  const onPasswordFocus = (id: string) => {
    focusedPasswords.current.add(id);
    setCoverActive(true);
  };
  const onPasswordBlur = (id: string) => {
    focusedPasswords.current.delete(id);
    if (focusedPasswords.current.size === 0) setCoverActive(false);
  };
  const onPasswordInput = (val: string) => {
    setSurprised(val.length > 0);
  };

  const switchTab = (t: Tab) => {
    setTab(t);
    setSurprised(t === "register");
    focusedPasswords.current.clear();
    setCoverActive(false);
  };

  const doShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 500);
  };

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    setTimeout(() => {
      setLoginLoading(false);
      alert("🎌 مرحباً بك في ساحة الأوتاكو!");
    }, 2000);
  };

  const handleRegister = (e: FormEvent) => {
    e.preventDefault();
    if (regPassword !== regConfirm) {
      doShake();
      alert("⚠️ كلمتا المرور غير متطابقتين!");
      return;
    }
    setRegLoading(true);
    setTimeout(() => {
      setRegLoading(false);
      alert("🎉 أهلاً بك في عائلة أوتاكو جو!");
    }, 2000);
  };

  const forgotPassword = () => {
    doShake();
    alert("سنرسل لك رابط إعادة تعيين كلمة المرور! 📧");
  };

  const socialLogin = (provider: string) => {
    console.log("Social login:", provider);
  };

  const mouthClass = surprised ? "og-mouth surprised" : smile ? "og-mouth smile" : "og-mouth";
  const pupilStyle = { transform: `translate(calc(-50% + ${pupilOffset}px), -50%)` };
  const eyebrowStyle = { top: coverActive ? "28px" : "32px" };

  return (
    <div dir="rtl" lang="ar" className="og-root">
      <div className="og-stars" ref={starsRef} />
      <div className="og-shooting-star" style={{ ["--top" as never]: "10%", ["--left" as never]: "80%", ["--delay" as never]: "0s" } as React.CSSProperties} />
      <div className="og-shooting-star" style={{ ["--top" as never]: "30%", ["--left" as never]: "60%", ["--delay" as never]: "2s" } as React.CSSProperties} />
      <div className="og-shooting-star" style={{ ["--top" as never]: "50%", ["--left" as never]: "90%", ["--delay" as never]: "4s" } as React.CSSProperties} />

      <div className="og-container">
        <h1 className="og-logo-text">أوتاكو جو</h1>
        <p className="og-logo-subtitle">عالم الأنمي في جيبك</p>

        <div className={`og-anime-character ${typing ? "character-typing" : ""}`}>
          <div className="og-hair">
            <div className="og-hair-strand-left" />
            <div className="og-hair-strand-right" />
          </div>
          <div className="og-accessory" />
          <div className="og-character-head">
            <div className="og-eyebrow left" style={eyebrowStyle} />
            <div className="og-eyebrow right" style={eyebrowStyle} />
            <div className="og-eye-container">
              <div className="og-eye">
                <div className={`og-eye-cover ${coverActive ? "active" : ""}`} />
                <div className="og-pupil" style={pupilStyle} />
                <div className="og-eye-shine" />
                <div className="og-eye-shine-small" />
              </div>
              <div className="og-eye">
                <div className={`og-eye-cover ${coverActive ? "active" : ""}`} />
                <div className="og-pupil" style={pupilStyle} />
                <div className="og-eye-shine" />
                <div className="og-eye-shine-small" />
              </div>
            </div>
            <div className="og-blush left" />
            <div className="og-blush right" />
            <div className={mouthClass} />
          </div>
          <div className="og-hands">
            <div className={`og-hand ${coverActive ? "show" : ""}`} />
            <div className={`og-hand ${coverActive ? "show" : ""}`} />
          </div>
        </div>

        <div className={`og-card ${shake ? "shake" : ""}`}>
          <div className="og-tabs">
            <button className={`og-tab ${tab === "login" ? "active" : ""}`} onClick={() => switchTab("login")}>
              تسجيل الدخول
            </button>
            <button className={`og-tab ${tab === "register" ? "active" : ""}`} onClick={() => switchTab("register")}>
              إنشاء حساب
            </button>
          </div>

          <div className="og-form-container">
            {tab === "login" && (
              <form className="og-form active" onSubmit={handleLogin}>
                <div className="og-input-group">
                  <label className="og-input-label">البريد الإلكتروني أو اسم الأوتاكو</label>
                  <div className="og-input-wrapper">
                    <span className="og-input-icon">👤</span>
                    <input
                      type="text"
                      placeholder="otaku@example.com"
                      value={loginEmail}
                      onChange={(e) => {
                        setLoginEmail(e.target.value);
                        triggerTyping(e.target.value.length);
                      }}
                    />
                  </div>
                </div>
                <div className="og-input-group">
                  <label className="og-input-label">كلمة المرور</label>
                  <div className="og-input-wrapper">
                    <span className="og-input-icon">🔒</span>
                    <input
                      type={showLoginPw ? "text" : "password"}
                      placeholder="••••••••"
                      value={loginPassword}
                      onChange={(e) => {
                        setLoginPassword(e.target.value);
                        onPasswordInput(e.target.value);
                      }}
                      onFocus={() => !showLoginPw && onPasswordFocus("loginPw")}
                      onBlur={() => onPasswordBlur("loginPw")}
                    />
                    <button
                      type="button"
                      className="og-password-toggle"
                      onClick={() => {
                        const next = !showLoginPw;
                        setShowLoginPw(next);
                        if (next) onPasswordBlur("loginPw");
                        else if (document.activeElement?.tagName === "INPUT") onPasswordFocus("loginPw");
                      }}
                    >
                      {showLoginPw ? "🙈" : "👁️"}
                    </button>
                  </div>
                </div>
                <button type="submit" className={`og-submit-btn ${loginLoading ? "loading" : ""}`}>
                  <span className="og-btn-text">دخول إلى الساحة 🏯</span>
                  <div className="og-loading-spinner" />
                </button>
              </form>
            )}

            {tab === "register" && (
              <form className="og-form active" onSubmit={handleRegister}>
                <div className="og-input-group">
                  <label className="og-input-label">اسم الأوتاكو</label>
                  <div className="og-input-wrapper">
                    <span className="og-input-icon">⚔️</span>
                    <input
                      type="text"
                      placeholder="اسمك في عالم الأنمي"
                      value={regName}
                      onChange={(e) => {
                        setRegName(e.target.value);
                        triggerTyping(e.target.value.length);
                      }}
                    />
                  </div>
                </div>
                <div className="og-input-group">
                  <label className="og-input-label">البريد الإلكتروني</label>
                  <div className="og-input-wrapper">
                    <span className="og-input-icon">📧</span>
                    <input
                      type="email"
                      placeholder="otaku@example.com"
                      value={regEmail}
                      onChange={(e) => {
                        setRegEmail(e.target.value);
                        triggerTyping(e.target.value.length);
                      }}
                    />
                  </div>
                </div>
                <div className="og-input-group">
                  <label className="og-input-label">كلمة المرور</label>
                  <div className="og-input-wrapper">
                    <span className="og-input-icon">🔒</span>
                    <input
                      type={showRegPw ? "text" : "password"}
                      placeholder="••••••••"
                      value={regPassword}
                      onChange={(e) => {
                        setRegPassword(e.target.value);
                        onPasswordInput(e.target.value);
                      }}
                      onFocus={() => !showRegPw && onPasswordFocus("regPw")}
                      onBlur={() => onPasswordBlur("regPw")}
                    />
                    <button
                      type="button"
                      className="og-password-toggle"
                      onClick={() => {
                        const next = !showRegPw;
                        setShowRegPw(next);
                        if (next) onPasswordBlur("regPw");
                      }}
                    >
                      {showRegPw ? "🙈" : "👁️"}
                    </button>
                  </div>
                </div>
                <div className="og-input-group">
                  <label className="og-input-label">تأكيد كلمة المرور</label>
                  <div className="og-input-wrapper">
                    <span className="og-input-icon">🔐</span>
                    <input
                      type={showRegConfirm ? "text" : "password"}
                      placeholder="••••••••"
                      value={regConfirm}
                      onChange={(e) => {
                        setRegConfirm(e.target.value);
                        onPasswordInput(e.target.value);
                      }}
                      onFocus={() => !showRegConfirm && onPasswordFocus("regConfirm")}
                      onBlur={() => onPasswordBlur("regConfirm")}
                    />
                    <button
                      type="button"
                      className="og-password-toggle"
                      onClick={() => {
                        const next = !showRegConfirm;
                        setShowRegConfirm(next);
                        if (next) onPasswordBlur("regConfirm");
                      }}
                    >
                      {showRegConfirm ? "🙈" : "👁️"}
                    </button>
                  </div>
                </div>
                <button type="submit" className={`og-submit-btn ${regLoading ? "loading" : ""}`}>
                  <span className="og-btn-text">انضمام إلى الساحة 🎌</span>
                  <div className="og-loading-spinner" />
                </button>
              </form>
            )}
          </div>

          <div className="og-divider"><span>أو</span></div>

          <div className="og-social-login">
            <button className="og-social-btn" onClick={() => socialLogin("google")}>
              <span>🔴</span> جوجل
            </button>
            <button className="og-social-btn" onClick={() => socialLogin("discord")}>
              <span>💬</span> ديسكورد
            </button>
          </div>

          <div className="og-forgot-password">
            <a href="#" onClick={(e) => { e.preventDefault(); forgotPassword(); }}>نسيت كلمة المرور؟</a>
          </div>
        </div>

        <div className="og-welcome-msg">
          <span>✦</span> انضم إلى مجتمع <span>أوتاكو جو</span> واستكشف عالم الأنمي <span>✦</span>
        </div>
      </div>
    </div>
  );
}
