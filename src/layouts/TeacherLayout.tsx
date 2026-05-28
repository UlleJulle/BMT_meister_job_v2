import {
  BriefcaseBusiness,
  CalendarDays,
  Home,
  Newspaper,
  Users,
  type LucideIcon,
} from "lucide-react";
import { NavLink, Outlet } from "react-router-dom";
import { routes } from "../constants/routes";
import styles from "./TeacherLayout.module.css";

type TeacherNavItem = {
  icon: LucideIcon;
  label: string;
  shortLabel: string;
  to: string;
};

const navItems: TeacherNavItem[] = [
  { icon: Home, label: "대시보드", shortLabel: "대시보드", to: routes.teacher.root },
  { icon: Users, label: "학생현황", shortLabel: "학생", to: routes.teacher.students },
  { icon: BriefcaseBusiness, label: "채용공고", shortLabel: "공고", to: routes.teacher.jobs },
  { icon: CalendarDays, label: "일정", shortLabel: "일정", to: routes.teacher.schedules },
  { icon: Newspaper, label: "콘텐츠", shortLabel: "콘텐츠", to: routes.teacher.content },
];

function renderNavItem(item: TeacherNavItem, mobile = false) {
  const Icon = item.icon;

  return (
    <NavLink
      key={item.to}
      className={({ isActive }) =>
        `${mobile ? styles.bottomNavItem : styles.navItem} ${isActive ? styles.activeNavItem : ""}`.trim()
      }
      end={item.to === routes.teacher.root}
      to={item.to}
    >
      <Icon aria-hidden="true" size={17} />
      <span>{mobile ? item.shortLabel : item.label}</span>
    </NavLink>
  );
}

export function TeacherLayout() {
  return (
    <div className={styles.shell}>
      <header className={styles.header}>
        <div className={styles.identity}>
          <span className={styles.mark}>교</span>
          <div>
            <strong>취업지원관리 시스템</strong>
            <span>일반교사 포털</span>
          </div>
        </div>

        <nav aria-label="일반교사 메뉴" className={styles.desktopNav}>
          {navItems.map((item) => renderNavItem(item))}
        </nav>
      </header>

      <main className={styles.main}>
        <Outlet />
      </main>

      <nav aria-label="일반교사 모바일 메뉴" className={styles.bottomNav}>
        {navItems.map((item) => renderNavItem(item, true))}
      </nav>
    </div>
  );
}
