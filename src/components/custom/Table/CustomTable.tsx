import { Box, Table, TableColumnHeaderProps, Tbody, Td, Tfoot, Tr, useColorModeValue } from "@chakra-ui/react";
import React, { ReactElement, useEffect } from "react";
import { Column, TableRowProps, useSortBy, useTable } from "react-table";
import "./style.scss";
import { TableHeader } from "./TableHeader";

export interface CustomTableHeaderProps extends TableColumnHeaderProps {
  isSort?: boolean;
  key: string;
  name?: string | ReactElement;
}

export interface CustomTableSortProps {
  key: string;
  order: "asc" | "desc";
}

export interface CustomTableProps<T extends object> {
  tableHeight?: number | string;
  isStickyHeader?: boolean;
  stickColIndex?: number;
  columns: Column<T>[];
  data: T[];
  renderRow?: ({ data, rowProps }: { data: T; rowProps: TableRowProps }) => ReactElement[] | ReactElement;
  isStickyLastCol?: boolean;
  defaultSortValue?: CustomTableSortProps;
  onChange?: (sortValues?: CustomTableSortProps) => void;
}

export default function CustomTable<T extends object>({
  tableHeight = "auto",
  columns = [],
  isStickyHeader = true,
  renderRow,
  data,
  stickColIndex,
  isStickyLastCol,
  defaultSortValue = {
    key: "",
    order: "asc",
  },
  onChange,
}: CustomTableProps<T>) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state: { sortBy },
  } = useTable<T>(
    {
      columns,
      data: data || [],
      manualSortBy: true,
      initialState: {
        sortBy: [
          {
            id: defaultSortValue.key,
            desc: defaultSortValue.order === "desc",
          },
        ],
      },
    },
    useSortBy,
  );

  const handleHeaderSortClick = (key: string, isDescending: boolean | undefined) => {
    const newSortValue: CustomTableSortProps = {
      key,
      order: isDescending ? "desc" : "asc",
    };
    onChange && onChange(key ? newSortValue : undefined);
  };

  useEffect(() => {
    if (sortBy[0]) {
      handleHeaderSortClick(sortBy[0].id, sortBy[0].desc);
    } else {
      handleHeaderSortClick("", true);
    }
  }, [sortBy]);

  return (
    <Box className={"custom-table-container"} __css={{ overflow: "auto", height: tableHeight }}>
      <Table
        className={`custom-table custom-table--stick-first-column-${stickColIndex} custom-table--${useColorModeValue(
          "light",
          "dark",
        )} ${isStickyLastCol && "custom-table--stick-last-column"}`}
        {...getTableProps()}
      >
        <TableHeader isStickyHeader={isStickyHeader} headerGroups={headerGroups} />
        <Tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            const { key: rowKey, ...rowProps } = row.getRowProps();

            if (renderRow) {
              return renderRow({ data: row.original, rowProps: { key: rowKey, ...rowProps } });
            }

            return (
              <Tr key={rowKey} {...rowProps}>
                {row.cells.map((cell) => {
                  const { key: cellKey, ...cellProps } = cell.getCellProps();
                  return (
                    <Td key={cellKey} {...cellProps}>
                      {cell.render("Cell")}
                    </Td>
                  );
                })}
              </Tr>
            );
          })}
        </Tbody>
        {/* <Tfoot>
          <Tr></Tr>
        </Tfoot> */}
      </Table>
    </Box>
  );
}
