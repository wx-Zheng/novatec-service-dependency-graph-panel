import React from 'react';
import { IntTableHeader } from '../../types';
import { TableContent } from 'types';
import SortableTable from './SortableTable';
import roundPercentageToDecimal from './utils/Utils';

interface NodeStatisticsProps {
  nodeList: TableContent[];
  noDataText: string;
  title: string;
}

const tableHeaders: IntTableHeader[] = [
  { text: '名称', dataField: 'name', sort: true, isKey: true },
  { text: '时间', dataField: 'time', sort: true, ignoreLiteral: ' ms' },
  { text: '请求数', dataField: 'requests', sort: true, ignoreLiteral: '' },
  { text: '异常占比', dataField: 'error_rate', sort: true, ignoreLiteral: '%' },
];

function getStatisticsTable(noDataText: string, nodeList: TableContent[]) {
  if (nodeList.length > 0) {
    return (
      <SortableTable
        tableHeaders={tableHeaders}
        data={nodeList.map((node: TableContent) => {
          return {
            name: node.name,
            time: node.responseTime,
            requests: node.rate,
            error_rate: roundPercentageToDecimal(2, node.error),
          };
        })}
      />
    );
  } else {
    return <div className="no-data--selection">{noDataText}</div>;
  }
}

export const NodeStatistics: React.FC<NodeStatisticsProps> = ({ nodeList, noDataText, title }) => {
  return (
    <div>
      <div className="secondHeader--selection">{title}</div>
      {getStatisticsTable(noDataText, nodeList)}
    </div>
  );
};
