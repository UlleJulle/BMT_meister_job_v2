import {
  BriefcaseBusiness,
  CalendarDays,
  Home,
  MoreHorizontal,
  Newspaper,
  UserRound,
  type LucideIcon,
} from "lucide-react";
import { NavLink, Outlet } from "react-router-dom";
import { routes } from "../constants/routes";
import styles from "./AppLayout.module.css";

type StudentNavItem = {
  icon: LucideIcon;
  label: string;
  to?: string;
};

const desktopNavItems: StudentNavItem[] = [
  { icon: Home, label: "홈", to: routes.student.root },
  { icon: BriefcaseBusiness, label: "채용공고", to: routes.student.jobs },
  { icon: CalendarDays, label: "일정", to: routes.student.schedules },
  { icon: Newspaper, label: "콘텐츠", to: routes.student.content },
  { icon: UserRound, label: "내 정보", to: routes.student.profile },
];

const mobileNavItems: StudentNavItem[] = [
  { icon: Home, label: "홈", to: routes.student.root },
  { icon: BriefcaseBusiness, label: "공고", to: routes.student.jobs },
  { icon: CalendarDays, label: "일정", to: routes.student.schedules },
  { icon: Newspaper, label: "콘텐츠", to: routes.student.content },
  { icon: MoreHorizontal, label: "더보기", to: routes.student.profile },
];

function renderNavItem(item: StudentNavItem, className?: string) {
  const Icon = item.icon;
  const content = (
    <>
      <Icon aria-hidden="true" size={17} />
      <span>{item.label}</span>
    </>
  );

  if (item.to) {
    return (
      <NavLink
        className={({ isActive }) =>
          `${className ?? styles.navItem} ${isActive ? styles.activeNavItem : ""}`.trim()
        }
        end={item.to === routes.student.root}
        key={item.label}
        to={item.to}
      >
        {content}
      </NavLink>
    );
  }

  return (
    <button
      aria-disabled="true"
      className={`${className ?? styles.navItem} ${styles.pendingNavItem}`.trim()}
      key={item.label}
      type="button"
    >
      {content}
    </button>
  );
}

export function AppLayout() {
  return (
    <div className={styles.shell}>
      <header className={styles.header}>
        <div className={styles.identity}>
          <span className={styles.mark}>취</span>
          <div>
            <strong>취업지원관리 시스템</strong>
            <span>학생 포털</span>
          </div>
        </div>

        <nav aria-label="학생 메뉴" className={styles.desktopNav}>
          {desktopNavItems.map((item) => renderNavItem(item))}
        </nav>
      </header>

      <main className={styles.main}>
        <Outlet />
      </main>

      <nav aria-label="학생 모바일 메뉴" className={styles.bottomNav}>
        {mobileNavItems.map((item) => renderNavItem(item, styles.bottomNavItem))}
      </nav>
    </div>
  );
}
