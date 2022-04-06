import { Box, Button, HStack, Stack, Text, VStack } from "@chakra-ui/react";
import React, { useMemo } from "react";
import { CgExport, CgImport } from "react-icons/cg";
import { FiRefreshCw, FiTrash2, FiUserPlus } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { CustomLoading, CustomPagination } from "../../../components/custom";
import CustomTable, {
  CustomTableHeaderProps,
  CustomTableSortProps,
} from "../../../components/custom/Table/CustomTable";
import { useModal } from "../../../hooks";
import { useDelete, useFetchAllEmployee } from "../hooks";
import BulkDeleteEmployeeModal from "../Modal/BulkDeleteEmployeeModal";
import { selectSelectedEmployeeIds } from "../selector";
import { employeeActions } from "../slice";
import EmployeeListItem from "./EmployeeListItem";
import EmployeeFilter from "./Filter/EmployeeFilter";

const tableHeader: CustomTableHeaderProps[] = [
  {
    name: "",
    key: "",
  },
  {
    name: "Name",
    key: "first_name",
    isSort: true,
    minWidth: 250,
  },
  {
    name: "Code",
    key: "code",
    isSort: true,
    isNumeric: true,
  },
  {
    name: "Email",
    key: "email",
    isSort: true,
  },
  {
    name: "Phone",
    key: "phone",
    isSort: true,
  },
  {
    name: "Position",
    key: "position",
    isSort: true,
  },
  {
    name: "Allocable",
    key: "allocable",
    isSort: true,
    align: "center",
  },
  {
    name: "Skill",
    key: "skill3",
    isSort: true,
  },
  {
    name: "Skill",
    key: "skill4",
    isSort: true,
  },
  {
    name: "",
    key: "action",
    maxWidth: 100,
  },
];

const EmployeeList = () => {
  const { open, close } = useModal();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { bulkDelete } = useDelete();

  const { employeeList, totalItem, isFetching, setFilter, filter } = useFetchAllEmployee();

  const defaultSortValue = useMemo(() => {
    const tmpOrderArr = filter.order?.split("-") || [];
    const sortValue: CustomTableSortProps = {
      key: tmpOrderArr[tmpOrderArr.length - 1] || "",
      order: tmpOrderArr[1] ? "desc" : "asc",
    };
    return sortValue;
  }, []);

  const selectedEmployeeIds = useAppSelector(selectSelectedEmployeeIds);

  const handlePaginationChange = ({ page, limit }: { page: number; limit: number }) => {
    setFilter((prev) => ({
      ...prev,
      page,
      limit,
    }));
  };

  const handleFilterOnChange = (values: { search: string }) => {
    setFilter((prev) => ({
      ...prev,
      page: 1,
      q: values.search,
    }));
  };

  const handleTableOnChange = (sortValues: CustomTableSortProps) => {
    const order = `${sortValues.order === "desc" ? "-" : ""}${sortValues.key}`;
    setFilter((prev) => ({
      ...prev,
      page: 1,
      order: order,
    }));
  };

  const handleEmployeeOnCheck = (id: string, isChecked: boolean) => {
    if (isChecked) {
      dispatch(employeeActions.addSelectEmployee(id));
    } else {
      dispatch(employeeActions.removeSelectEmployee(id));
    }
  };

  const handleBulkDeleteOnClick = () => {
    open({
      title: "Confirmation to delete selected employees",
      content: <BulkDeleteEmployeeModal onOk={bulkDelete} onCancel={close} />,
      footer: null,
    });
  };

  return (
    <Stack spacing={5}>
      <Box display={"flex"} justifyContent={"space-between"}>
        <EmployeeFilter onChange={handleFilterOnChange} />
        <HStack>
          <Button leftIcon={<FiUserPlus />} colorScheme="blue" onClick={() => navigate("/employee/create")}>
            Create
          </Button>
          <Button leftIcon={<CgImport />}>Import</Button>
          <Button leftIcon={<CgExport />}>Export</Button>
        </HStack>
      </Box>
      <HStack spacing={5} h={18}>
        {selectedEmployeeIds.length > 0 && (
          <HStack spacing={3}>
            <Button size={"sm"} leftIcon={<FiTrash2 />} colorScheme={"red"} onClick={handleBulkDeleteOnClick}>
              Delete all
            </Button>
            <Button
              size={"sm"}
              leftIcon={<FiRefreshCw />}
              onClick={() => dispatch(employeeActions.cleanAllSelectEmployee())}
            >
              Clear all
            </Button>
          </HStack>
        )}
        <Text>{`Total employee: ${totalItem}${
          selectedEmployeeIds.length ? `- Selected ${selectedEmployeeIds.length} item` : ""
        }`}</Text>
      </HStack>
      <CustomLoading isLoading={isFetching}>
        <VStack spacing={5} display="block">
          <CustomTable
            tableHeight={500}
            columns={tableHeader}
            isStickyHeader
            isStickyLastCol
            stickColIndex={2}
            defaultSortValue={defaultSortValue}
            onChange={handleTableOnChange}
          >
            {employeeList.map((item) => (
              <EmployeeListItem key={item} id={item} onCheck={handleEmployeeOnCheck} />
            ))}
          </CustomTable>

          <CustomPagination
            currentPage={+filter.page}
            total={+totalItem | 1}
            pageSize={+filter.limit}
            onChange={handlePaginationChange}
            pageBufferSize={2}
          />
        </VStack>
      </CustomLoading>
    </Stack>
  );
};

export default EmployeeList;
