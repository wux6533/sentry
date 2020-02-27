import React from 'react';
import styled from '@emotion/styled';

import AreaChart from 'app/components/charts/areaChart';
import {TimeSeriesData} from 'app/views/events/utils/eventsRequest';

import {HeaderTitle} from './styles';

type Props = {
  yAxis: string;
  data: TimeSeriesData;
};

class Chart extends React.Component<Props> {
  render() {
    const {data, yAxis} = this.props;
    const {timeseriesData} = data;

    if (!timeseriesData || timeseriesData.length <= 0) {
      return null;
    }

    timeseriesData[0].seriesName = yAxis;

    console.log('this.props', timeseriesData);
    return (
      <Container>
        <HeaderTitle>{yAxis}</HeaderTitle>
        <AreaChart
          series={timeseriesData}
          seriesOptions={{
            showSymbol: false,
          }}
          grid={{
            left: '24px',
            right: '24px',
            top: '24px',
            bottom: '12px',
          }}
          isGroupedByDate
          showTimeInTooltip
        />
      </Container>
    );
  }
}

const Container = styled('div')`
  min-width: 50%;
  max-width: 50%;
  width: 50%;
`;

export default Chart;
