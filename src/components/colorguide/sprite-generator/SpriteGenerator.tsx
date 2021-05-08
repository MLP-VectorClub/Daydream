import { useEffect, useRef, useState, VFC } from 'react';
import { Alert, Col, Progress, Row } from 'reactstrap';
import ExternalLink from 'src/components/shared/ExternalLink';
import { SpriteGeneratorPreview } from 'src/components/colorguide/sprite-generator/SpriteGeneratorPreview';
import InlineIcon from 'src/components/shared/InlineIcon';

const STATIC_ASSETS = [
  'cm_square',
  'eyes_male12',
  'eyes_male3',
  'eyes_male12_grad2',
  'eyes_male12_grad3',
  'eyes_male3_grad2',
  'eyes_male3_grad3',
  'eyes_female1',
  'eyes_female2',
  'eyes_female3',
  'eyes_female12_grad2',
  'eyes_female12_grad3',
  'eyes_female3_grad2',
  'eyes_female3_grad3',
  'horn_female',
  'horn_male',
  'wing_female',
  'wing_male',
  'body_female',
  'body_male',
  'eye_grad2',
  'eye_grad3',
] as const;

export const SpriteGenerator: VFC = () => {
  const imagePromises = useRef<Promise<void>[]>([]);
  const [loadedImages, setLoadedImages] = useState(0);

  useEffect(() => {
    let localLoadedImages = 0;
    let mounted = true;
    STATIC_ASSETS.forEach(imageName => {
      imagePromises.current.push(new Promise((resolve, reject) => {
        const imageEl = new Image();
        imageEl.src = `/img/sprite_template/${imageName}.png`;
        imageEl.onload = () => void resolve();
        imageEl.onerror = e => void reject(e);
      }));
    });

    imagePromises.current.forEach(promise => void promise.then(() => {
      localLoadedImages++;
      if (mounted) {
        setLoadedImages(localLoadedImages);
      }
    }));

    return () => {
      mounted = false;
    };
  }, []);

  const loading = imagePromises.current.length > 0 && loadedImages < STATIC_ASSETS.length;

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
      <Row className="flex-row-reverse flex-lg-row">
        <Col lg={6} xl="auto">
          <SpriteGeneratorPreview loading={loading} />
          {loading && (
            <div className="mt-2 text-center">
              <p className="text-ui mb-2">
                <InlineIcon icon="info" first />
                Loading assets…
              </p>
              <Progress value={(loadedImages / STATIC_ASSETS.length) * 100} animated color="ui" />
            </div>
          )}
        </Col>
        <Col lg={6} xl>
          {/* <SpriteGeneratorOptions options={} /> */}
        </Col>
      </Row>
      <h2>Download</h2>
      <Alert color="info" fade={false}>
        <InlineIcon icon="hard-hat" first />
        This feature is not available yet
      </Alert>
    </>
  );
};
