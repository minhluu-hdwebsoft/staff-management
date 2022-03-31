import { Box, Button, HStack, Stack, useToast, VStack } from "@chakra-ui/react";
import { EmployeeQueryParams } from "@hdwebsoft/intranet-api-sdk/libs/api/hr/models";
import queryString from "query-string";
import React, { useEffect, useMemo, useState } from "react";
import { FiPlusSquare } from "react-icons/fi";
import { CgExport, CgImport } from "react-icons/cg";
import { shallowEqual } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { CustomLoading, CustomPagination } from "../../../components/custom";
import CustomTable, {
  CustomTableHeaderProps,
  CustomTableSortProps,
} from "../../../components/custom/Table/CustomTable";
import { FilterParams } from "../../../models";
import { selectEmployeeListId, selectIsFetchingEmployee, selectTotalEmployee } from "../selector";
import { employeeActions } from "../slice";
import EmployeeListItem from "./EmployeeListItem";
import EmployeeFilter from "./Filter/EmployeeFilter";
import api from "../../../api";

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
    name: "Skill",
    key: "skill1",
    isSort: true,
  },
  {
    name: "Skill",
    key: "skill2",
    isSort: true,
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
    minWidth: 100,
  },
];

const EmployeeList = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  const { search } = useLocation();

  const [filter, setFilter] = useState<FilterParams<EmployeeQueryParams>>({
    page: 1,
    limit: 10,
    order: "",
    ...queryString.parse(search),
  });
  const defaultSortValue = useMemo(() => {
    const tmpOrderArr = filter.order?.split("-") || [];
    const sortValue: CustomTableSortProps = {
      key: tmpOrderArr[tmpOrderArr.length - 1] || "",
      order: tmpOrderArr[1] ? "desc" : "asc",
    };
    return sortValue;
  }, []);

  const employeeList = useAppSelector(selectEmployeeListId, shallowEqual);
  const totalItem = useAppSelector(selectTotalEmployee);
  const isFetching = useAppSelector(selectIsFetchingEmployee);

  useEffect(() => {
    navigate({
      search: queryString.stringify(filter),
    });
    dispatch(employeeActions.getList(filter));
  }, [filter]);

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

  const handleDeleteEmployeeOnClick = async (id: string) => {
    try {
      await api.hr.employee.delete(id);
      toast({
        title: "Delete employee",
        status: "error",
      });
      setFilter((prev) => ({ ...prev }));
    } catch (error) {
      toast({
        title: "Sign in Success",
        description: "Welcome to Staff Management System",
      });
    }
  };

  return (
    <Stack spacing={5}>
      <Box display={"flex"} justifyContent={"space-between"}>
        <EmployeeFilter onChange={handleFilterOnChange} />
        <HStack>
          <Button leftIcon={<FiPlusSquare />} colorScheme="blue" onClick={() => navigate("/employee/create")}>
            Create
          </Button>
          <Button leftIcon={<CgImport />}>Import</Button>
          <Button leftIcon={<CgExport />}>Export</Button>
        </HStack>
      </Box>
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
              <EmployeeListItem key={item} id={item} onDelete={handleDeleteEmployeeOnClick} />
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
