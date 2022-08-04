import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { forwardRef, ForwardRefRenderFunction, memo } from 'react';
import { getInlineIconClasses } from 'src/utils';
import { InlineIconProps } from 'src/types/component-props';
import LoadingRing from 'src/components/shared/LoadingRing';

const InlineIcon: ForwardRefRenderFunction<SVGSVGElement, InlineIconProps> = (
  { icon, loading = false, last = false, first = false, color, className, ...faProps },
  ref
) => {
  if (loading) {
    return <LoadingRing inline spaceLeft={last} spaceRight={first} color={color} className={className} />;
  }

  if (!icon) return null;

  return <FontAwesomeIcon icon={icon} className={classNames(className, getInlineIconClasses(color, first, last))} ref={ref} {...faProps} />;
};

export default memo(forwardRef(InlineIcon));
