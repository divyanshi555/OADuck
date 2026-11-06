import React from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import {useThemeConfig} from '@docusaurus/theme-common';
import ThemedImage from '@theme/ThemedImage';

export default function NavbarLogo() {
  const {navbar} = useThemeConfig();
  const logo = navbar.logo;
  const title = navbar.title;
  const alt = logo.alt ?? '';

  return (
    <div className="navbar__brand">
      {logo && (
        <div className="navbar__logo">
          <ThemedImage
            sources={{
              light: useBaseUrl(logo.src),
              dark: useBaseUrl(logo.srcDark || logo.src),
            }}
            height={logo.height}
            width={logo.width}
            alt={alt}
            style={logo.style}
          />
        </div>
      )}
      {title != null && <b className="navbar__title text--truncate">{title}</b>}
    </div>
  );
}
