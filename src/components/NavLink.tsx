import { NavLink as RouterNavLink, NavLinkProps } from "react-router-dom";
import { forwardRef, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { useSidebar } from "@/components/ui/sidebar";

interface NavLinkCompatProps extends Omit<NavLinkProps, "className"> {
  className?: string;
  activeClassName?: string;
  pendingClassName?: string;
  badge?: number;
  children: ReactNode;
}

const NavLink = forwardRef<HTMLAnchorElement, NavLinkCompatProps>(
  ({ className, activeClassName, pendingClassName, badge, children, to, ...props }, ref) => {
    const { setOpenMobile, isMobile } = useSidebar();
    
    return (
      <RouterNavLink
        ref={ref}
        to={to}
        onClick={() => {
          if (isMobile) {
            setOpenMobile(false);
          }
        }}
        className={({ isActive, isPending }) =>
          cn(
            "flex items-center gap-2 w-full",
            className,
            isActive && activeClassName,
            isPending && pendingClassName
          )
        }
        {...props}
      >
        {children}
        {badge !== undefined && badge > 0 && (
          <Badge variant="destructive" className="ml-auto h-5 min-w-5 px-1 text-xs">
            {badge}
          </Badge>
        )}
      </RouterNavLink>
    );
  },
);

NavLink.displayName = "NavLink";

export { NavLink };
