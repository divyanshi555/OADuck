import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

import Heading from '@theme/Heading';
import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={styles.heroBanner}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          Understand the workspace.
        </Heading>
        <p className={styles.subtitle}>Everything you need to understand how OA Duck works, from the first sign-in to the final assessment review.</p>
        <div className={styles.buttons}>
          <Link className="button button--primary button--lg" to="/docs/overview">Read the app guide ↗</Link>
          <Link className={styles.secondaryButton} to="/docs/getting-started">Set up locally</Link>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Detailed documentation for the OA Duck coding practice and assessment workspace.">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
