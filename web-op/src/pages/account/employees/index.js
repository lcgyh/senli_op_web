import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import SearchCard from './search';
import TableCard from './table';

function EmployList() {
  return (
    <PageHeaderWrapper>
      <SearchCard />
      <TableCard />
    </PageHeaderWrapper>
  );
}

export default EmployList;
