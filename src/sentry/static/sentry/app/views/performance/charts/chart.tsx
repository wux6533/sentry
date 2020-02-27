import React from 'react';
import styled from '@emotion/styled';
import {Location} from 'history';
import {ECharts} from 'echarts';
import * as ReactRouter from 'react-router';

import isEqual from 'lodash/isEqual';

import AreaChart from 'app/components/charts/areaChart';
import {Organization} from 'app/types';
import EventView from 'app/views/eventsV2/eventView';
import {EventsChart} from 'app/views/events/eventsChart';
import {TimeSeriesData} from 'app/views/events/utils/eventsRequest';

type Props = {
  data: TimeSeriesData;
};

class Chart extends React.Component<Props> {
  render() {
    const {data} = this.props;
    const {timeseriesData} = data;

    if (!timeseriesData) {
      return null;
    }

    console.log('this.props', timeseriesData);
    return (
      <Container>
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
        />
      </Container>
    );
  }
}

const Container = styled('div')`
  min-width: 50%;
  max-width: 50%;
  width: 50%;

  outline: 1px red solid;
`;

export default Chart;
