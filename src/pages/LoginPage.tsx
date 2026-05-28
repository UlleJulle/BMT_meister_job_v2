import { useMemo, useState, type FormEvent } from "react";
import {
  ArrowRight,
  BriefcaseBusiness,
  CheckCircle2,
  KeyRound,
  ShieldCheck,
  UserPlus,
} from "lucide-react";
import { Navigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Input } from "../components/ui/Input";
import { getFirebaseAuth } from "../services/firebase/auth";
import { getRedirectRouteForSession } from "../features/auth/authRouting";
import { useAuthSession } from "../features/auth/useAuthSession";
import styles from "./LoginPage.module.css";

type AuthTab = "login" | "signup" | "reset";

const tabs: Array<{ id: AuthTab; label: string }> = [
  { id: "login", label: "로그인" },
  { id: "signup", label: "가입 요청" },
  { id: "reset", label: "비밀번호 찾기" },
];

export function LoginPage() {
  const session = useAuthSession();
  const redirectPath = useMemo(() => getRedirectRouteForSession(session), [session]);
  const [activeTab, setActiveTab] = useState<AuthTab>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (redirectPath && redirectPath !== "/login") {
    return <Navigate replace to={redirectPath} />;
  }

  async function handleLoginSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitError(null);

    const auth = getFirebaseAuth();

    if (!auth) {
      setSubmitError("Firebase 설정을 확인한 뒤 다시 시도해 주세요.");
      return;
    }

    setIsSubmitting(true);

    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
    } catch {
      setSubmitError("이메일 또는 비밀번호를 확인해 주세요.");
    } finally {
      setIsSubmitting(false);
    }
  }

  function handlePlaceholderSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <div className={styles.page}>
      <section className={styles.panel} aria-labelledby="auth-title">
        <div className={styles.brandPane}>
          <div className={styles.brandMark}>
            <BriefcaseBusiness size={18} aria-hidden="true" />
          </div>

          <div className={styles.brandCopy}>
            <p className={styles.kicker}>v2 school operations</p>
            <h1 id="auth-title">
              취업진로부<span className={styles.titleWord}> 운영 콘솔</span>
            </h1>
            <p className={styles.lead}>
              공고, 일정, 학생현황, 콘텐츠를 한 화면에서 확인하는 학교용 운영 도구입니다.
            </p>
          </div>

          <div className={styles.systemNotes} aria-label="시스템 성격">
            <span>권한 기반</span>
            <span>검토 후 게시</span>
            <span>학교별 설정</span>
          </div>

          <div className={styles.summaryNote}>
            <CheckCircle2 size={15} aria-hidden="true" />
            <span>로그인 후 역할별 홈 화면으로 자동 이동합니다.</span>
          </div>
        </div>

        <div className={styles.formPane}>
          <div className={styles.mobileBrand}>
            <span className={styles.mobileMark}>취</span>
            <strong>취업진로부 운영 콘솔</strong>
          </div>

          <div className={styles.tabs} role="tablist" aria-label="인증 메뉴">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={activeTab === tab.id}
                className={activeTab === tab.id ? styles.activeTab : styles.tab}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {activeTab === "login" ? (
            <form className={styles.form} onSubmit={handleLoginSubmit}>
              <div className={styles.formHeader}>
                <p>계정 로그인</p>
                <h2>학교 계정으로 로그인해 업무를 시작합니다.</h2>
              </div>
              <Input
                label="이메일"
                name="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
              <Input
                label="비밀번호"
                name="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
              {session.state === "error" ? <p className={styles.helperText}>{session.message}</p> : null}
              {submitError ? <p className={styles.helperText}>{submitError}</p> : null}
              <button className={styles.primaryAction} type="submit" disabled={isSubmitting}>
                {isSubmitting ? "로그인 중" : "로그인 계속하기"}
                <ArrowRight size={16} aria-hidden="true" />
              </button>
              <p className={styles.helperText}>회원가입과 비밀번호 재설정은 다음 단계에서 연결됩니다.</p>
            </form>
          ) : null}

          {activeTab === "signup" ? (
            <form className={styles.form} onSubmit={handlePlaceholderSubmit}>
              <div className={styles.formHeader}>
                <p>가입 요청</p>
                <h2>학교 확인 후 사용할 계정을 준비합니다.</h2>
              </div>
              <Input label="이름" name="name" autoComplete="name" />
              <Input label="이메일" name="signupEmail" type="email" autoComplete="email" />
              <button className={styles.neutralAction} type="submit">
                <UserPlus size={16} aria-hidden="true" />
                가입 요청 예정
              </button>
              <p className={styles.helperText}>요청 등록과 승인 흐름은 아직 연결되지 않았습니다.</p>
            </form>
          ) : null}

          {activeTab === "reset" ? (
            <form className={styles.form} onSubmit={handlePlaceholderSubmit}>
              <div className={styles.formHeader}>
                <p>비밀번호 재설정</p>
                <h2>등록된 이메일로 재설정 안내를 받을 수 있습니다.</h2>
              </div>
              <Input label="이메일" name="resetEmail" type="email" autoComplete="email" />
              <button className={styles.neutralAction} type="submit">
                <KeyRound size={16} aria-hidden="true" />
                재설정 안내 받기
              </button>
              <p className={styles.helperText}>현재 발송 기능은 아직 연결되지 않았습니다.</p>
            </form>
          ) : null}

          <div className={styles.securityNote}>
            <ShieldCheck size={16} aria-hidden="true" />
            <span>권한 확인 뒤 역할별 화면으로 이동하는 구조를 기준으로 설계했습니다.</span>
          </div>
        </div>
      </section>
    </div>
  );
}
