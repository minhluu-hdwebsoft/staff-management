import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import {
  Box,
  chakra,
  Table,
  TableColumnHeaderProps,
  Tbody,
  Tfoot,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { ReactElement, useState } from "react";
import "./style.scss";

export interface CustomTableHeaderProps extends TableColumnHeaderProps {
  isSort?: boolean;
  key: string;
  name?: string | ReactElement;
}

export interface CustomTableSortProps {
  key: string;
  order: "asc" | "desc";
}

export interface CustomTableProps {
  tableHeight?: number | string;
  isStickyHeader?: boolean;
  stickColIndex?: number;
  columns?: CustomTableHeaderProps[];
  children?: ReactElement[];
  isStickyLastCol?: boolean;
  defaultSortValue?: CustomTableSortProps;
  onChange?: (sortValues: CustomTableSortProps) => void;
}

export default function CustomTable({
  tableHeight = "auto",
  columns = [],
  isStickyHeader = true,
  children,
  stickColIndex,
  isStickyLastCol,
  defaultSortValue = {
    key: "",
    order: "asc",
  },
  onChange,
}: CustomTableProps) {
  const [sort, setSort] = useState<CustomTableSortProps>(defaultSortValue);

  const handleHeaderSortClick = (key: string) => {
    const newSortValue: CustomTableSortProps = {
      key,
      order: sort.order === "asc" ? "desc" : "asc",
    };
    onChange && onChange(newSortValue);
    setSort(newSortValue);
  };

  return (
    <Box className={"custom-table-container"} __css={{ overflow: "auto", height: tableHeight }}>
      <Table
        className={`custom-table custom-table--stick-first-column-${stickColIndex} custom-table--${useColorModeValue(
          "light",
          "dark",
        )} ${isStickyLastCol && "custom-table--stick-last-column"}`}
      >
        <Thead className={`custom-table__header--${isStickyHeader && "sticky"}`}>
          <Tr>
            {columns?.map(({ key, name, isSort, ...rest }) => {
              return (
                <Th key={key} {...rest} cursor={isSort ? "pointer" : "none"} onClick={() => handleHeaderSortClick(key)}>
                  {name}
                  {isSort && sort.key === key ? (
                    sort.order === "asc" ? (
                      <chakra.span pl="4">
                        <TriangleDownIcon aria-label="sorted descending" />
                      </chakra.span>
                    ) : (
                      <chakra.span pl="4">
                        <TriangleUpIcon aria-label="sorted descending" />
                      </chakra.span>
                    )
                  ) : null}
                </Th>
              );
            })}
          </Tr>
        </Thead>
        <Tbody>{children}</Tbody>
        <Tfoot>
          <Tr></Tr>
        </Tfoot>
      </Table>
    </Box>
  );
}
