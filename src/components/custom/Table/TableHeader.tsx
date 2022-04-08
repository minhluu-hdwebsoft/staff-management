import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import { chakra, Th, Thead, Tr } from "@chakra-ui/react";
import { HeaderGroup } from "react-table";
import React from "react";

export function TableHeader<T extends object>({
  isStickyHeader,
  headerGroups,
}: {
  isStickyHeader: boolean;
  headerGroups: HeaderGroup<T>[];
}) {
  return (
    <Thead className={`custom-table__header--${isStickyHeader && "sticky"}`}>
      {headerGroups.map(({ headers, getHeaderGroupProps }) => {
        const { key: headerKey, ...headerGroupProps } = getHeaderGroupProps();
        return (
          <Tr key={headerKey} {...headerGroupProps}>
            {headers.map((column) => {
              const { key: columnKey, ...columnProps } = column.getHeaderProps(column.getSortByToggleProps());

              return (
                <Th key={columnKey} {...columnProps}>
                  {column.render("Header")}
                  <chakra.span pl="4">
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <TriangleDownIcon aria-label="sorted descending" />
                      ) : (
                        <TriangleUpIcon aria-label="sorted ascending" />
                      )
                    ) : null}
                  </chakra.span>
                </Th>
              );
            })}
          </Tr>
        );
      })}
    </Thead>
  );
}
