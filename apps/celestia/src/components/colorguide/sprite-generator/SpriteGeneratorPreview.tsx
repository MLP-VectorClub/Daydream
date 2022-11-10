import { EventHandler, FC, FocusEventHandler, RefObject, SyntheticEvent, useCallback, useEffect } from 'react';
import classNames from 'classnames';
import styles from 'modules/SpriteGeneratorPreview.module.scss';
import {
  RgbColors,
  SpriteGeneratorBodyOptions,
  SpriteGeneratorCmOptions,
  SpriteGeneratorEyeGradientOptions,
  SpriteGeneratorEyeOptions,
  SpriteGeneratorHornOptions,
  SpriteGeneratorImageMap,
  SpriteGeneratorIrisOptions,
  SpriteGeneratorOptions,
  SpriteGeneratorWingOptions,
} from 'src/types/sprite-generator';
import { convertRgbToNumber } from 'src/utils';

interface PropTypes {
  loading: boolean;
  options: SpriteGeneratorOptions;
  canvasRef: RefObject<HTMLCanvasElement>;
  imageMap?: SpriteGeneratorImageMap;
  colorMap: Record<number, RgbColors>;
}

const mapGradientOptionToImage = (maleBody: boolean, options: SpriteGeneratorOptions): SpriteGeneratorEyeGradientOptions => {
  const specialEye = maleBody
    ? options.eye === SpriteGeneratorEyeOptions.EYES_MALE_3
    : options.eye === SpriteGeneratorEyeOptions.EYES_FEMALE_3;
  if (maleBody) {
    if (specialEye) {
      return options.gradientStops === 2
        ? SpriteGeneratorEyeGradientOptions.EYES_MALE_3_GRAD_2
        : SpriteGeneratorEyeGradientOptions.EYES_MALE_3_GRAD_3;
    }
    return options.gradientStops === 2
      ? SpriteGeneratorEyeGradientOptions.EYES_MALE_12_GRAD_2
      : SpriteGeneratorEyeGradientOptions.EYES_MALE_12_GRAD_3;
  }
  if (specialEye) {
    return options.gradientStops === 2
      ? SpriteGeneratorEyeGradientOptions.EYES_FEMALE_3_GRAD_2
      : SpriteGeneratorEyeGradientOptions.EYES_FEMALE_3_GRAD_3;
  }
  return options.gradientStops === 2
    ? SpriteGeneratorEyeGradientOptions.EYES_FEMALE_12_GRAD_2
    : SpriteGeneratorEyeGradientOptions.EYES_FEMALE_12_GRAD_3;
};

const remapColors = (ctx: CanvasRenderingContext2D, colors: Required<PropTypes>['colorMap']) => {
  // Apply color mappings
  const imageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
  let change = false;
  for (let i = 0; i < imageData.data.length; i += 4) {
    const alpha = imageData.data[i + 3];
    // eslint-disable-next-line no-continue
    if (alpha === 0) continue;

    const mapping = colors[convertRgbToNumber(imageData.data[i], imageData.data[i + 1], imageData.data[i + 2])];
    if (mapping) {
      if (!change) change = true;
      imageData.data[i] = mapping.red;
      imageData.data[i + 1] = mapping.green;
      imageData.data[i + 2] = mapping.blue;
    }
  }
  if (change) ctx.putImageData(imageData, 0, 0);
};

export const SpriteGeneratorPreview: FC<PropTypes> = ({ loading, canvasRef, options, imageMap, colorMap }) => {
  const drawImage = useCallback(
    (ctx: CanvasRenderingContext2D, img: keyof SpriteGeneratorImageMap) => {
      const imageElement: HTMLImageElement | undefined = imageMap && imageMap[img];
      if (typeof imageElement === 'undefined') throw new Error(`Missing template image`);
      ctx.drawImage(imageElement, 0, 0, 300, 300, 0, 0, 300, 300);
    },
    [imageMap]
  );
  useEffect(() => {
    if (loading || !canvasRef.current || !imageMap) return;

    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    const maleBody = options.body === SpriteGeneratorBodyOptions.MALE;

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    drawImage(ctx, SpriteGeneratorCmOptions.CM_SQUARE);

    drawImage(ctx, maleBody ? SpriteGeneratorBodyOptions.MALE : SpriteGeneratorBodyOptions.FEMALE);

    if (options.horn) {
      drawImage(ctx, maleBody ? SpriteGeneratorHornOptions.MALE : SpriteGeneratorHornOptions.FEMALE);
    }
    if (options.wing) {
      drawImage(ctx, maleBody ? SpriteGeneratorWingOptions.MALE : SpriteGeneratorWingOptions.FEMALE);
    }

    drawImage(ctx, options.eye);
    drawImage(ctx, mapGradientOptionToImage(maleBody, options));
    drawImage(ctx, options.gradientStops === 2 ? SpriteGeneratorIrisOptions.IRIS_GRAD_2 : SpriteGeneratorIrisOptions.IRIS_GRAD_3);

    if (colorMap) {
      remapColors(ctx, colorMap);
    }
  }, [canvasRef, colorMap, drawImage, imageMap, loading, options]);

  const preventEvent: EventHandler<SyntheticEvent> = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);
  const handleFocus: FocusEventHandler<HTMLCanvasElement> = useCallback((e) => {
    e.target.blur();
  }, []);

  return (
    <div className={styles.preview}>
      <canvas
        ref={canvasRef}
        className={classNames({ hidden: loading })}
        width={300}
        height={300}
        onContextMenu={preventEvent}
        onMouseDown={preventEvent}
        onDragStart={preventEvent}
        onKeyDown={preventEvent}
        onFocus={handleFocus}
      />
    </div>
  );
};
