import * as React from 'react';

import { useTypedSelector } from '../../core/store/hooks';
import { selectSchemas } from '../pages/App';
import { useGetContentTypeConfigurationQuery } from '../services/contentTypes';
import { type FormattedLayouts, formatLayouts } from '../utils/layouts';

const useContentTypeLayout = (
  contentTypeUID: string = ''
): {
  isLoading: boolean;
  layout: FormattedLayouts | null;
  updateLayout: () => void;
} => {
  const schemas = useTypedSelector(selectSchemas);

  const { data, isLoading, refetch } = useGetContentTypeConfigurationQuery(contentTypeUID);

  const layout = React.useMemo(() => (data ? formatLayouts(data, schemas) : null), [data, schemas]);

  return {
    isLoading,
    layout,
    updateLayout: refetch,
  };
};

export { useContentTypeLayout };
