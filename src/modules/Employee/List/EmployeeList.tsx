import { Box, Table, Tbody, Tfoot, Th, Thead, Tr, VStack } from "@chakra-ui/react";
import { EmployeeQueryParams } from "@hdwebsoft/intranet-api-sdk/libs/api/hr/models";
import React, { useEffect, useState } from "react";
import { shallowEqual } from "react-redux";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { CustomLoading, CustomPagination } from "../../../components/custom";
import { FilterParams } from "../../../models";
import { selectEmployeeListId, selectIsFetchingEmployee, selectTotalEmployee } from "../selector";
import { employeeActions } from "../slice";
import EmployeeListItem from "./EmployeeListItem";
import EmployeeFilter from "./Filter/EmployeeFilter";
import queryString from "query-string";
import { useLocation, useNavigate } from "react-router-dom";

const EmployeeList = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { search } = useLocation();

  const [filter, setFilter] = useState<FilterParams<EmployeeQueryParams>>({
    page: 1,
    limit: 10,
    // q: 'is_deleted=true&search=1'
    ...queryString.parse(search),
  });

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

  return (
    <Box>
      <EmployeeFilter onChange={handleFilterOnChange} />
      <CustomLoading isLoading={isFetching}>
        <VStack spacing={5}>
          <Table>
            <Thead>
              <Tr>
                <Th></Th>
                <Th>Name</Th>
                <Th isNumeric>Code</Th>
                <Th>Email</Th>
                <Th>Phone</Th>
                <Th>Skill</Th>
              </Tr>
            </Thead>
            <Tbody>
              {employeeList.map((item) => (
                <EmployeeListItem key={item} id={item} />
              ))}
            </Tbody>
            <Tfoot>
              <Tr></Tr>
            </Tfoot>
          </Table>
          <CustomPagination
            currentPage={+filter.page}
            total={+totalItem | 1}
            pageSize={+filter.limit}
            onChange={handlePaginationChange}
            pageBufferSize={2}
          />
        </VStack>
      </CustomLoading>
    </Box>
  );
};

export default EmployeeList;
