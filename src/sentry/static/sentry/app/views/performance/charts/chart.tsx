import React from 'react';
import styled from '@emotion/styled';
import {Location} from 'history';
import {ECharts} from 'echarts';
import * as ReactRouter from 'react-router';

import isEqual from 'lodash/isEqual';

import {Client} from 'app/api';
import {getParams} from 'app/components/organizations/globalSelectionHeader/getParams';
import {getUtcToLocalDateObject} from 'app/utils/dates';
import {Organization} from 'app/types';
import EventView from 'app/views/eventsV2/eventView';
import {EventsChart} from 'app/views/events/eventsChart';

type Props = {};

class Chart extends React.Component<Props> {
  render() {
    return <Container>foo</Container>;
  }
}

const Container = styled('div')`
  min-width: 50%;
  max-width: 50%;
  width: 50%;

  outline: 1px red solid;
`;

export default Chart;
