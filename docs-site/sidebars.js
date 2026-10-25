// @ts-check

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.

 @type {import('@docusaurus/plugin-content-docs').SidebarsConfig}
 */
const sidebars = {
  appSidebar: [
    'overview',
    'getting-started',
    {type: 'category', label: 'How the app works', items: ['product-flow', 'features', 'admin-guide']},
    {type: 'category', label: 'Engineering reference', items: ['architecture', 'ui-architecture', 'data-model', 'api-reference', 'request-lifecycle', 'development']},
    {type: 'category', label: 'Developer handover', items: ['env-config', 'security', 'testing-debugging']},
  ],
};

export default sidebars;
