import { DecoderText } from '~/components/decoder-text';
// Eliminar importación no utilizada: import { Heading } from '~/components/heading';
import { Section } from '~/components/section';
import { useTheme } from '~/components/theme-provider';
// Eliminar importación no utilizada: import { tokens } from '~/components/theme-provider/theme';
import { Transition } from '~/components/transition';
import { VisuallyHidden } from '~/components/visually-hidden';
import { Link as RouterLink } from '@remix-run/react';
import { useInterval, usePrevious, useScrollToHash } from '~/hooks';
import { Suspense, lazy, useEffect, useState } from 'react';
// Eliminar importación no utilizada: import { cssProps } from '~/utils/style';
import config from '~/config.json';
import { useHydrated } from '~/hooks/useHydrated';
import { Image } from '~/components/image';
import companyLogo from '~/assets/Bold Modern Minimalist Gradient Technology Business Logo  (5).png';
import styles from './intro.module.css';

const DisplacementSphere = lazy(() =>
  import('./displacement-sphere').then(module => ({ default: module.DisplacementSphere }))
);

export function Intro({ id, sectionRef, scrollIndicatorHidden, ...rest }) {
  const { theme } = useTheme();
  const { disciplines } = config;
  const [disciplineIndex, setDisciplineIndex] = useState(0);
  const prevTheme = usePrevious(theme);
  const introLabel = [disciplines.slice(0, -1).join(', '), disciplines.slice(-1)[0]].join(
    ', and '
  );
  // Eliminar variable no utilizada: const currentDiscipline = disciplines.find((item, index) => index === disciplineIndex);
  const titleId = `${id}-title`;
  const scrollToHash = useScrollToHash();
  const isHydrated = useHydrated();

  useInterval(
    () => {
      const index = (disciplineIndex + 1) % disciplines.length;
      setDisciplineIndex(index);
    },
    5000,
    theme
  );

  useEffect(() => {
    if (prevTheme && prevTheme !== theme) {
      setDisciplineIndex(0);
    }
  }, [theme, prevTheme]);

  const handleScrollClick = event => {
    event.preventDefault();
    scrollToHash(event.currentTarget.href);
  };

  return (
    <Section
      className={styles.intro}
      as="section"
      ref={sectionRef}
      id={id}
      aria-labelledby={titleId}
      tabIndex={-1}
      {...rest}
    >
      <Transition in key={theme} timeout={3000}>
        {({ visible, status }) => (
          <>
            {isHydrated && (
              <Suspense>
                <DisplacementSphere />
              </Suspense>
            )}
            <header className={styles.text}>
              <h1 className={styles.name} data-visible={visible} id={titleId}>
                <DecoderText text={config.name} delay={500} />
              </h1>
              <div className={styles.logoContainer} data-visible={visible} data-status={status}>
                <Image
                  reveal
                  delay={100}
                  src={companyLogo}
                  alt="Logo de la empresa"
                  className={styles.companyLogo}
                />
                <VisuallyHidden className={styles.label}>
                  {`${config.role} + ${introLabel}`}
                </VisuallyHidden>
              </div>
              {/* Se eliminó el componente Heading que mostraba "Designer + Developer" */}
            </header>
            <RouterLink
              to="/#project-1"
              className={styles.scrollIndicator}
              data-status={status}
              data-hidden={scrollIndicatorHidden}
              onClick={handleScrollClick}
            >
              <VisuallyHidden>Scroll to projects</VisuallyHidden>
            </RouterLink>
            <RouterLink
              to="/#project-1"
              className={styles.mobileScrollIndicator}
              data-status={status}
              data-hidden={scrollIndicatorHidden}
              onClick={handleScrollClick}
            >
              <VisuallyHidden>Scroll to projects</VisuallyHidden>
              <svg
                aria-hidden
                stroke="currentColor"
                width="43"
                height="15"
                viewBox="0 0 43 15"
              >
                <path d="M1 1l20.5 12L42 1" strokeWidth="2" fill="none" />
              </svg>
            </RouterLink>
          </>
        )}
      </Transition>
    </Section>
  );
}
