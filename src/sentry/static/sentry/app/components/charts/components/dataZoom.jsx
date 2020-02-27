import 'echarts/lib/component/dataZoom';

const DEFAULT = {
  type: 'inside',
  zoomOnMouseWheel: 'shift',
  throttle: 50,
  filterMode: 'none',
  disabled: true,
};

export default function DataZoom(props) {
  // `props` can be boolean, if so return default
  if (!props || !Array.isArray(props)) {
    return [DEFAULT];
  }

  return props;
}
