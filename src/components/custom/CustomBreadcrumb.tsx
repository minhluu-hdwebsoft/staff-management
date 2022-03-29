import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";

export function CustomBreadcrumb() {
  const { pathname } = useLocation();
  const { t } = useTranslation();
  const pathList = useMemo(() => pathname.split("/").filter((item) => item !== ""), [pathname]);

  return (
    <Breadcrumb>
      <BreadcrumbItem key="dashboard">
        <BreadcrumbLink as={Link} to={`/`}>
          {t(`sidebar.dashboard`)}
        </BreadcrumbLink>
      </BreadcrumbItem>
      {pathList.map((item) => (
        <BreadcrumbItem key={item}>
          <BreadcrumbLink as={Link} to={`/${item}`}>
            {t(`sidebar.${item}`)}
          </BreadcrumbLink>
        </BreadcrumbItem>
      ))}
    </Breadcrumb>
  );
}
