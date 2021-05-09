import {
  FormEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
  VFC,
} from 'react';
import {
  Alert,
  Col,
  Form,
  Progress,
  Row,
} from 'reactstrap';
import ExternalLink from 'src/components/shared/ExternalLink';
import { SpriteGeneratorPreview } from 'src/components/colorguide/sprite-generator/SpriteGeneratorPreview';
import InlineIcon from 'src/components/shared/InlineIcon';
import {
  SPRITE_GENERATOR_ASSETS,
  SpriteGeneratorBodyOptions,
  SpriteGeneratorColorMap,
  SpriteGeneratorEyeOptions,
  SpriteGeneratorImageMap,
  SpriteGeneratorOptions,
} from 'src/types/sprite-generator';
import classNames from 'classnames';
import { SpriteGeneratorCustomizer } from 'src/components/colorguide/sprite-generator/SpriteGeneratorCustomizer';

const DEFAULT_OPTIONS: SpriteGeneratorOptions = {
  body: SpriteGeneratorBodyOptions.FEMALE,
  cm: true,
  wing: false,
  horn: false,
  eye: SpriteGeneratorEyeOptions.EYES_FEMALE_1,
  gradientStops: 2,
};

export const SpriteGenerator: VFC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageMap = useRef<SpriteGeneratorImageMap | undefined>();
  const [colorMap, setColorMap] = useState<SpriteGeneratorColorMap>();
  const loadingErrors = useRef<Array<keyof SpriteGeneratorImageMap>>([]);
  const [loadedImages, setLoadedImages] = useState(0);
  const [options, setOptions] = useState<SpriteGeneratorOptions>(DEFAULT_OPTIONS);

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

  const loading = imageMap.current !== null && loadedImages < SPRITE_GENERATOR_ASSETS.length;
  const loadingFailed = loadingErrors.current.length > 0;

  const handleSubmit: FormEventHandler = useCallback(e => {
    e.preventDefault();
  }, []);
  return (
    <>
      <h2>About this tool</h2>
      <p>Using the generator below you can create a base sprite image for a pony character with the colors and features of your
        choosing.
      </p>
      <p>
        Once you download the base, you can use any drawing software which supports pixel-prefect editing, such as MS Paint,
        {' '}<ExternalLink href="https://www.getpaint.net/">Paint.NET</ExternalLink>, or
        {' '}<ExternalLink href="https://www.gimp.org/">Gimp</ExternalLink> to customize the mane and tail to match your character's design.
        The coat-colored space on the top right is reserved for the cutie mark, if any.
      </p>
      <h2>Options & preview</h2>
      <Form onSubmit={handleSubmit}>
        <Row className="flex-row-reverse flex-lg-row">
          <Col lg={12} xl={6} className="col-xxl-auto">
            <SpriteGeneratorPreview canvasRef={canvasRef} loading={loading} options={options} imageMap={imageMap.current} />
            {loading && (
              <div className="mt-2 text-center">
                <p className={classNames('mb-2', loadingFailed ? 'text-danger' : 'text-ui')}>
                  <InlineIcon icon={loadingErrors ? 'exclamation-triangle' : 'info'} first />
                  {loadingErrors.current.length > 0
                  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
                    ? (
                      <>Failed to load assets:
                        <ul>{loadingErrors.current.map((name, k) => <li key={k}>{name}</li>)}</ul>
                      </>
                    )
                    : 'Loading assets…'}
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
      <Alert color="info" fade={false}>
        <InlineIcon icon="hard-hat" first />
        This feature is not available yet
      </Alert>
    </>
  );
};
