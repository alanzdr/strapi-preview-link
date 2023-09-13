import React, { useMemo } from 'react';
import { useCMEditViewDataManager } from '@strapi/helper-plugin';
import { Link } from '@strapi/icons';
import { LinkButton } from '@strapi/design-system';
import usePluginConfig from '../../hooks/use-plugin-config';
import { generateLiveUrl } from '../../utils/url';

const LiveButton: React.FC = () => {
  const { modifiedData, layout, hasDraftAndPublish } = useCMEditViewDataManager();
  const pluginConfig = usePluginConfig()
  
  const previewUrl = useMemo(() => {
    return generateLiveUrl({
      uid: layout.uid,
      config: pluginConfig,
      data: modifiedData,
      isDraft: hasDraftAndPublish
    });
  }, [layout, pluginConfig, hasDraftAndPublish, modifiedData])
  
  if (!pluginConfig || !previewUrl) {
    return null;
  }

  return (
    <LinkButton
      size="S"
      startIcon={<Link/>}
      style={{width: '100%', textDecoration: 'none'}}
      href={previewUrl}
      variant="secondary"
      target="_blank"
      rel="noopener noreferrer"
      title="See content in Live"
    >
      Live Link
    </LinkButton>
  );
};

export default LiveButton;