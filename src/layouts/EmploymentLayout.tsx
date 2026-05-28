import {
  BellRing,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  ClipboardList,
  Home,
  Newspaper,
  Users,
  type LucideIcon,
} from "lucide-react";
import { NavLink, Outlet } from "react-router-dom";
import { routes } from "../constants/routes";
import styles from "./EmploymentLayout.module.css";

type EmploymentNavItem = {
  icon: LucideIcon;
  label: string;
  to: string;
};

const navItems: EmploymentNavItem[] = [
  { icon: Home, label: "대시보드", to: routes.employment.root },
  { icon: BriefcaseBusiness, label: "채용공고", to: routes.employment.jobs },
  { icon: Building2, label: "기업DB", to: routes.employment.companies },
  { icon: ClipboardList, label: "지원현황", to: routes.employment.applications },
  { icon: Users, label: "학생현황", to: routes.employment.students },
  { icon: CalendarDays, label: "일정", to: routes.employment.schedules },
  { icon: Newspaper, label: "콘텐츠", to: routes.employment.content },
  { icon: BellRing, label: "참여조사", to: routes.employment.surveys },
];

function renderNavItem(item: EmploymentNavItem, mobile = false) {
  const Icon = item.icon;

  return (
    <NavLink
      key={item.to}
      className={({ isActive }) =>
        `${mobile ? styles.mobileNavItem : styles.navItem} ${isActive ? styles.activeNavItem : ""}`.trim()
      }
      end={item.to === routes.employment.root}
      to={item.to}
    >
      <Icon aria-hidden="true" size={16} />
      <span>{item.label}</span>
    </NavLink>
  );
}

export function EmploymentLayout() {
  return (
    <div className={styles.shell}>
      <header className={styles.header}>
        <div className={styles.headerTop}>
          <div className={styles.identity}>
            <span className={styles.mark}>진</span>
            <div>
              <strong>취업지원관리 시스템</strong>
              <span>취업진로부 운영 포털</span>
            </div>
          </div>

          <nav aria-label="취업진로부 메뉴" className={styles.desktopNav}>
            {navItems.map((item) => renderNavItem(item))}
          </nav>
        </div>

        <nav aria-label="취업진로부 모바일 메뉴" className={styles.mobileNav}>
          {navItems.map((item) => renderNavItem(item, true))}
        </nav>
      </header>

      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}
