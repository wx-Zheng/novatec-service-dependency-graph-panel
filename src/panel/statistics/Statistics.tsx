import React from 'react';
import { NodeStatistics } from './NodeStatistics';
import '../../css/novatec-service-dependency-graph-panel.css';
import './Statistics.css';
import { IntSelectionStatistics, TableContent } from 'types';
import roundPercentageToDecimal from './utils/Utils';

interface StatisticsProps {
  show: boolean;
  selectionId: string | number;
  resolvedDrillDownLink: string;
  selectionStatistics: IntSelectionStatistics;
  currentType: string;
  showBaselines: boolean;
  receiving: TableContent[];
  sending: TableContent[];
}

export const Statistics: React.FC<StatisticsProps> = ({
  show,
  selectionId,
  resolvedDrillDownLink,
  selectionStatistics,
  currentType,
  showBaselines,
  receiving,
  sending,
}) => {
  var statisticsClass = 'statistics';
  var statistics = <div></div>;
  if (show) {
    statisticsClass = 'statistics show ';
    var drilldownLink = <div></div>;
    if (resolvedDrillDownLink && resolvedDrillDownLink.length > 0 && currentType === 'INTERNAL') {
      drilldownLink = (
        <a target="_blank" href={resolvedDrillDownLink}>
          <i className="fa fa-paper-plane-o margin"></i>
        </a>
      );
    }

    const requests =
      selectionStatistics.requests >= 0 ? (
        <tr>
          <td className="table--td--selection">请求数</td>
          <td className="table--td--selection">{selectionStatistics.requests}</td>
        </tr>
      ) : null;

    const errors =
      selectionStatistics.errors >= 0 ? (
        <tr>
          <td className="table--td--selection">异常数</td>
          <td className="table--td--selection">{selectionStatistics.errors}</td>
        </tr>
      ) : null;

    var errorRate =
      selectionStatistics.requests >= 0 && selectionStatistics.errors >= 0 ? (
        <tr ng-show="">
          <td className="table--td--selection">异常占比</td>
          <td className="table--td--selection">
            {roundPercentageToDecimal(
              2,
              ((100 / selectionStatistics.requests) * selectionStatistics.errors).toString()
            )}
          </td>
        </tr>
      ) : null;

    var avgResponseTime =
      selectionStatistics.responseTime >= 0 ? (
        <tr>
          <td className="table--td--selection">平均响应时间</td>
          <td className="table--td--selection">{selectionStatistics.responseTime} ms</td>
        </tr>
      ) : null;
    var threshold = selectionStatistics.thresholdViolation ? (
      <td className="table--td--selection threshold--bad"> 异常 (&lt;= {selectionStatistics.threshold}ms) </td>
    ) : (
      <td className="table--td--selection threshold--good">
        正常 ({'>'} {selectionStatistics.threshold})
      </td>
    );
    var baseline =
      showBaselines && selectionStatistics.threshold ? (
        <tr>
          <td className="table--td--selection">健康度得分</td>
          {threshold}
        </tr>
      ) : null;

    statistics = (
      <div className="statistics">
        <div className="header--selection">
          {selectionId}
          {drilldownLink}
        </div>

        <div className="secondHeader--selection">统计</div>
        <table className="table--selection">
          <tr className="table--selection--head">
            <th>名称</th>
            <th className="table--th--selectionMedium">值</th>
          </tr>
          {requests}
          {errors}
          {errorRate}
          {avgResponseTime}
          {baseline}
        </table>

        <NodeStatistics
          nodeList={receiving}
          noDataText="暂无数据."
          title="消费者统计"
        />
        <NodeStatistics nodeList={sending} noDataText="暂无数据" title="提供者统计" />
      </div>
    );
  }
  return <div className={statisticsClass}>{statistics}</div>;
};
