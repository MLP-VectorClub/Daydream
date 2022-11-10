import { ChangeEventHandler, FC, FormEventHandler, MouseEventHandler, useCallback, useEffect, useRef, useState } from 'react';
import { Button, Col, CustomInput, Form, Progress, Row } from 'reactstrap';
import { saveAs } from 'file-saver';
import ExternalLink from 'src/components/shared/ExternalLink';
import { SpriteGeneratorPreview } from 'src/components/colorguide/sprite-generator/SpriteGeneratorPreview';
import InlineIcon from 'src/components/shared/InlineIcon';
import {
  SPRITE_GENERATOR_ASSETS,
  SpriteGeneratorBaseColor,
  SpriteGeneratorBodyOptions,
  SpriteGeneratorColorMap,
  SpriteGeneratorEyeOptions,
  SpriteGeneratorImageMap,
  SpriteGeneratorOptions,
} from 'src/types/sprite-generator';
import classNames from 'classnames';
import { SpriteGeneratorCustomizer } from 'src/components/colorguide/sprite-generator/SpriteGeneratorCustomizer';
import { assembleSeoUrl, convertNumberToRgb } from 'src/utils';
import { PATHS } from 'src/paths';
import { useCopyToClipboard } from 'src/hooks/copy';

const DEFAULT_OPTIONS: SpriteGeneratorOptions = {
  body: SpriteGeneratorBodyOptions.FEMALE,
  cm: true,
  wing: false,
  horn: false,
  eye: SpriteGeneratorEyeOptions.EYES_FEMALE_1,
  gradientStops: 2,
};

export const SpriteGenerator: FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageMap = useRef<SpriteGeneratorImageMap | undefined>();
  const [colorMap, setColorMap] = useState<SpriteGeneratorColorMap>(() => ({
    [SpriteGeneratorBaseColor.COAT_OUTLINE]: convertNumberToRgb(SpriteGeneratorBaseColor.COAT_OUTLINE),
    [SpriteGeneratorBaseColor.COAT_SHADOW_OUTLINE]: convertNumberToRgb(SpriteGeneratorBaseColor.COAT_SHADOW_OUTLINE),
    [SpriteGeneratorBaseColor.COAT_FILL]: convertNumberToRgb(SpriteGeneratorBaseColor.COAT_FILL),
    [SpriteGeneratorBaseColor.COAT_SHADOW_FILL]: convertNumberToRgb(SpriteGeneratorBaseColor.COAT_SHADOW_FILL),
    [SpriteGeneratorBaseColor.IRIS_GRADIENT_TOP]: convertNumberToRgb(SpriteGeneratorBaseColor.IRIS_GRADIENT_TOP),
    [SpriteGeneratorBaseColor.IRIS_GRADIENT_MIDDLE]: convertNumberToRgb(SpriteGeneratorBaseColor.IRIS_GRADIENT_MIDDLE),
    [SpriteGeneratorBaseColor.IRIS_GRADIENT_BOTTOM]: convertNumberToRgb(SpriteGeneratorBaseColor.IRIS_GRADIENT_BOTTOM),
    [SpriteGeneratorBaseColor.IRIS_HIGHLIGHT_TOP]: convertNumberToRgb(SpriteGeneratorBaseColor.IRIS_HIGHLIGHT_TOP),
    [SpriteGeneratorBaseColor.IRIS_HIGHLIGHT_BOTTOM]: convertNumberToRgb(SpriteGeneratorBaseColor.IRIS_HIGHLIGHT_BOTTOM),
    [SpriteGeneratorBaseColor.MAGIC_AURA]: convertNumberToRgb(SpriteGeneratorBaseColor.MAGIC_AURA),
  }));
  const loadingErrors = useRef<Array<keyof SpriteGeneratorImageMap>>([]);
  const [loadedImages, setLoadedImages] = useState(0);
  const [licenseAccepted, setLicenseAccepted] = useState(false);
  const [options, setOptions] = useState<SpriteGeneratorOptions>(DEFAULT_OPTIONS);
  const copyButtonRef = useRef<HTMLButtonElement>(null);
  const attributionTextRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let localLoadedImages = 0;
    let mounted = true;
    loadingErrors.current = [];
    imageMap.current = SPRITE_GENERATOR_ASSETS.reduce((acc, imageName) => {
      const imageEl = new Image();
      const cacheBustVersion = 1;
      imageEl.src = `/img/sprite_template/${imageName}.png?v=${cacheBustVersion}`;
      imageEl.onload = () => {
        localLoadedImages++;
        if (mounted) {
          setLoadedImages(localLoadedImages);
        }
      };
      imageEl.onerror = () => {
        loadingErrors.current.push(imageName);
      };
      return { ...acc, [imageName]: imageEl };
    }, {} as SpriteGeneratorImageMap);

    return () => {
      mounted = false;
    };
  }, []);

  const { tooltip, clearCopyStatus } = useCopyToClipboard({
    copyButtonRef,
    targetRef: attributionTextRef,
  });

  const loading = imageMap.current !== null && loadedImages < SPRITE_GENERATOR_ASSETS.length;
  const loadingFailed = loadingErrors.current.length > 0;

  const handleSubmit: FormEventHandler = useCallback((e) => {
    e.preventDefault();
  }, []);
  const handleLicenseChange: ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
    setLicenseAccepted(e.target.checked);
  }, []);
  const handleDownload: MouseEventHandler = useCallback(() => {
    if (!canvasRef.current) return;

    canvasRef.current.toBlob((blob) => {
      if (!blob) return;
      saveAs(blob, 'sprite.png');
    });
  }, []);

  return (
    <>
      <h2>About this tool</h2>
      <p>
        Using the generator below you can create a base sprite image for a pony character with the colors and features of your choosing.
      </p>
      <p>
        Once you download the base, you can use any drawing software which supports pixel-prefect editing, such as MS Paint,{' '}
        <ExternalLink href="https://www.getpaint.net/">Paint.NET</ExternalLink>, or{' '}
        <ExternalLink href="https://www.gimp.org/">Gimp</ExternalLink> to customize the mane and tail to match your character's design. The
        coat-colored space on the top right is reserved for the cutie mark, if any.
      </p>
      <h2>Options & preview</h2>
      <Form onSubmit={handleSubmit}>
        <Row className="flex-row-reverse flex-lg-row">
          <Col lg={12} xl={6} className="col-xxl-auto">
            <SpriteGeneratorPreview
              canvasRef={canvasRef}
              loading={loading}
              options={options}
              colorMap={colorMap}
              imageMap={imageMap.current}
            />
            {loading && (
              <div className="mt-2 text-center">
                <p className={classNames('mb-2', loadingFailed ? 'text-danger' : 'text-ui')}>
                  <InlineIcon icon={loadingErrors ? 'exclamation-triangle' : 'info'} first />
                  {loadingErrors.current.length > 0 ? (
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
                    <>
                      Failed to load assets:
                      <ul>
                        {loadingErrors.current.map((name, k) => (
                          <li key={k}>{name}</li>
                        ))}
                      </ul>
                    </>
                  ) : (
                    'Loading assets…'
                  )}
                </p>
                <Progress
                  value={(loadedImages / SPRITE_GENERATOR_ASSETS.length) * 100}
                  animated={!loadingFailed}
                  color={loadingFailed ? 'danger' : 'ui'}
                />
              </div>
            )}
          </Col>
          <SpriteGeneratorCustomizer options={options} setOptions={setOptions} colorMap={colorMap} setColorMap={setColorMap} />
        </Row>
      </Form>
      <h2 className="mt-3">Download</h2>
      <CustomInput
        type="checkbox"
        id="accept-license"
        label={
          <>
            I accept that generated images are licensed under the{' '}
            <ExternalLink href="https://creativecommons.org/licenses/by-nc-sa/4.0/">
              Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International
            </ExternalLink>{' '}
            license
          </>
        }
        checked={licenseAccepted}
        onChange={handleLicenseChange}
        className="mb-3"
      />
      <p className="text-info">
        <InlineIcon icon="info" first fixedWidth />
        Attribution example:
        <span className="user-select-all p-1 ml-2 border rounded" ref={attributionTextRef}>
          Base generated on the MLP-VectorClub's website at {assembleSeoUrl(PATHS.GUIDE_SPRITE)}
        </span>
        <Button type="button" size="sm" color="link" innerRef={copyButtonRef} onMouseLeave={clearCopyStatus}>
          <InlineIcon icon="clipboard" first />
          Copy
        </Button>
        {tooltip}
      </p>
      <Button type="button" size="lg" color="primary" disabled={!licenseAccepted} onClick={handleDownload}>
        <InlineIcon icon="download" first />
        Download
      </Button>
    </>
  );
};
