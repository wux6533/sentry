import React from 'react';
import styled from '@emotion/styled';
import * as Sentry from '@sentry/browser';
import {Location} from 'history';
import {ECharts} from 'echarts';
import * as ReactRouter from 'react-router';

import {Organization} from 'app/types';
import {Client} from 'app/api';
import withApi from 'app/utils/withApi';
import {getInterval} from 'app/components/charts/utils';
// TODO
// import getDynamicText from 'app/utils/getDynamicText';
import {getParams} from 'app/components/organizations/globalSelectionHeader/getParams';
import {Panel} from 'app/components/panels';
import EventView from 'app/views/eventsV2/eventView';
import {fetchTotalCount} from 'app/views/eventsV2/utils';
import EventsRequest from 'app/views/events/utils/eventsRequest';
import {getUtcToLocalDateObject} from 'app/utils/dates';

import Chart from './chart';
import Footer from './footer';

type Props = {
  api: Client;
  eventView: EventView;
  organization: Organization;
  location: Location;
  router: ReactRouter.InjectedRouter;
};

type State = {
  totalValues: null | number;
  eChartsInstances: ECharts[];
  toolTipPosition: [number, number] | undefined;
};

class Container extends React.Component<Props, State> {
  state: State = {
    totalValues: null,
    eChartsInstances: [],
    toolTipPosition: undefined,
  };

  componentDidMount() {
    this.mounted = true;

    this.fetchTotalCount();
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  mounted: boolean = false;

  async fetchTotalCount() {
    const {api, organization, location, eventView} = this.props;
    if (!eventView.isValid() || !this.mounted) {
      return;
    }

    try {
      const totals = await fetchTotalCount(
        api,
        organization.slug,
        eventView.getEventsAPIPayload(location)
      );

      if (this.mounted) {
        this.setState({totalValues: totals});
      }
    } catch (err) {
      Sentry.captureException(err);
    }
  }

  onEchartsReady = (chart: ECharts) => {
    this.setState(state => {
      return {
        ...state,
        eChartsInstances: [...state.eChartsInstances, chart],
      };
    });
  };

  render() {
    const {api, organization, location, eventView} = this.props;

    // construct request parameters for fetching chart data

    const globalSelection = eventView.getGlobalSelection();
    const start = globalSelection.start
      ? getUtcToLocalDateObject(globalSelection.start)
      : undefined;

    const end = globalSelection.end
      ? getUtcToLocalDateObject(globalSelection.end)
      : undefined;

    const {utc} = getParams(location.query);

    const yAxis = ['rpm()', 'apdex()'];

    return (
      <Panel>
        <ChartsContainer>
          <EventsRequest
            organization={organization}
            api={api}
            period={globalSelection.statsPeriod}
            project={globalSelection.project}
            environment={globalSelection.environment}
            start={start}
            end={end}
            interval={getInterval(
              {
                start: start || null,
                end: end || null,
                period: globalSelection.statsPeriod,
              },
              true
            )}
            showLoading={false}
            query={eventView.getEventsAPIPayload(location).query}
            includePrevious={false}
            yAxis={yAxis}
          >
            {({loading, reloading, errored, results}) => {
              console.log('lol', {
                loading,
                reloading,
                errored,
                results,
              });
              return <div>data</div>;
            }}
          </EventsRequest>
        </ChartsContainer>
        <Footer totals={this.state.totalValues} />
      </Panel>
    );
  }
}

export const ChartsContainer = styled('div')`
  display: flex;
`;

export default withApi(Container);
