import { ContextInvalidated, onContextInvalidated } from 'chrome-extension-toolkit';
import React from 'react';
import { createRoot } from 'react-dom/client';
import CourseCatalogMain from './components/CourseCatalogMain';
import PopupMain from './components/PopupMain';
import getSiteSupport, { SiteSupport } from './lib/getSiteSupport';
import colors from './styles/colors.module.scss';

const support = getSiteSupport(window.location.href);
if (!support) {
    throw new Error('UT Registration Plus does not support this page, even though it should...');
}

if (support === SiteSupport.EXTENSION_POPUP) {
    createRoot(document.getElementById('root')!).render(<PopupMain />);
}

if (support === SiteSupport.COURSE_CATALOG_DETAILS || support === SiteSupport.COURSE_CATALOG_LIST) {
    // const shadowDom = createShadowDOM('ut-registration-plus-container');
    // create non-shadow dom for now
    const container = document.createElement('div');
    container.id = 'ut-registration-plus-container';
    document.body.appendChild(container);

    createRoot(container).render(<CourseCatalogMain support={support} />);
    // shadowDom.addStyle('static/css/content.css');
}

if (support === SiteSupport.WAITLIST) {
    // TODO: Implement waitlist support
}

if (support === SiteSupport.UT_PLANNER) {
    // TODO: Implement ut planner support
}

onContextInvalidated(() => {
    const div = document.createElement('div');
    div.id = 'context-invalidated-container';
    document.body.appendChild(div);
    createRoot(div).render(
        <ContextInvalidated fontFamily='monospace' color={colors.white} backgroundColor={colors.burnt_orange} />
    );
});
