import React, { useMemo } from 'react';
import { useCMEditViewDataManager } from '@strapi/helper-plugin';
import { Eye } from '@strapi/icons';
import { LinkButton } from '@strapi/design-system';
import usePluginConfig from '../../hooks/use-plugin-config';
import { generatePreviewUrl } from '../../utils/url';

const PreviewButton: React.FC = () => {
  const { modifiedData, layout, hasDraftAndPublish } = useCMEditViewDataManager();
  const pluginConfig = usePluginConfig()
  
  const previewUrl = useMemo(() => {
    return generatePreviewUrl({
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
      startIcon={<Eye/>}
      style={{width: '100%', textDecoration: 'none'}}
      href={previewUrl}
      variant="secondary"
      target="_blank"
      rel="noopener noreferrer"
      title="See content in Preview mode"
    >
      Preview
    </LinkButton>
  );
};

export default PreviewButton;