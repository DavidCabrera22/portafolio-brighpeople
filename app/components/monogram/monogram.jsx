import { forwardRef } from 'react';
import { classes } from '~/utils/style';
import styles from './monogram.module.css';
import logoImg from '~/assets/logo1.png';
import { Image } from '~/components/image';

export const Monogram = forwardRef(({ highlight, className, ...props }, ref) => {
  return (
    <div
      className={classes(styles.monogram, className)}
      ref={ref}
      {...props}
    >
      <Image
        src={logoImg}
        alt=""
        aria-hidden
        className={styles.logoImage}
        width={48}
        height={48}
      />
      {highlight && (
        <div className={styles.highlight} />
      )}
    </div>
  );
});
