import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    number: '01',
    title: 'Product flow',
    description: (
      <>
        Follow the learner journey from public landing page to practice session, submission, and review.
      </>
    ),
  },
  {
    number: '02',
    title: 'Feature reference',
    description: (
      <>
        Learn how questions, code execution, monitoring, profiles, and Duck Insight fit together.
      </>
    ),
  },
  {
    number: '03',
    title: 'Engineering notes',
    description: (
      <>
        Review the App Router structure, API boundaries, Prisma models, and local development workflow.
      </>
    ),
  },
];

function Feature({number, title, description}) {
  return (
    <div className="col col--4">
      <div className={styles.featureCard}>
        <span className={styles.number}>{number}</span>
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
