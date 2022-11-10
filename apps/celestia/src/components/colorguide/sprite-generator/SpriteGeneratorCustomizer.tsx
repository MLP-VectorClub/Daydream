import { FC, useCallback } from 'react';
import { SpriteGeneratorBodyOptions, SpriteGeneratorEyeOptions, SpriteGeneratorOptions } from 'src/types/sprite-generator';
import { Button, ButtonGroup, Col, FormGroup, Label } from 'reactstrap';
import {
  SpriteGeneratorColorsForm,
  SpriteGeneratorColorsFormProps,
} from 'src/components/colorguide/sprite-generator/SpriteGeneratorColorsForm';

interface PropTypes extends Pick<SpriteGeneratorColorsFormProps, 'colorMap' | 'setColorMap'> {
  options: SpriteGeneratorOptions;
  setOptions: (newOptions: SpriteGeneratorOptions) => void;
}

export const SpriteGeneratorCustomizer: FC<PropTypes> = ({ options, setOptions, colorMap, setColorMap }) => {
  const setSpecies = useCallback(
    (wing: boolean, horn: boolean) =>
      setOptions({
        ...options,
        wing,
        horn,
      }),
    [options, setOptions]
  );
  const setBodyType = useCallback(
    (body: SpriteGeneratorBodyOptions) => {
      const eye =
        body === SpriteGeneratorBodyOptions.MALE ? SpriteGeneratorEyeOptions.EYES_MALE_12 : SpriteGeneratorEyeOptions.EYES_FEMALE_1;
      setOptions({ ...options, body, eye });
    },
    [options, setOptions]
  );
  const setEye = useCallback(
    (eyeNumber: 1 | 2 | 3) => {
      let eye: SpriteGeneratorEyeOptions;
      if (options.body === SpriteGeneratorBodyOptions.MALE) {
        eye = eyeNumber < 3 ? SpriteGeneratorEyeOptions.EYES_MALE_12 : SpriteGeneratorEyeOptions.EYES_MALE_3;
      } else {
        const femaleOptions = [
          SpriteGeneratorEyeOptions.EYES_FEMALE_1,
          SpriteGeneratorEyeOptions.EYES_FEMALE_2,
          SpriteGeneratorEyeOptions.EYES_FEMALE_3,
        ];
        eye = femaleOptions[eyeNumber - 1];
      }
      setOptions({ ...options, eye });
    },
    [options, setOptions]
  );
  const setGradientStops = useCallback(
    (gradientStops: SpriteGeneratorOptions['gradientStops']) =>
      setOptions({
        ...options,
        gradientStops,
      }),
    [options, setOptions]
  );
  return (
    <>
      <Col xl={6} className="col-xxl-3">
        <h3>Body Shape</h3>
        <FormGroup>
          <Label className="d-block">Species</Label>
          <ButtonGroup>
            <Button color="ui" active={!options.wing && !options.horn} onClick={() => setSpecies(false, false)}>
              Earth pony
            </Button>
            <Button color="ui" active={!options.wing && options.horn} onClick={() => setSpecies(false, true)}>
              Unicorn
            </Button>
            <Button color="ui" active={options.wing && !options.horn} onClick={() => setSpecies(true, false)}>
              Pegasus
            </Button>
            <Button color="ui" active={options.wing && options.horn} onClick={() => setSpecies(true, true)}>
              Alicorn
            </Button>
          </ButtonGroup>
        </FormGroup>
        <FormGroup>
          <Label className="d-block">Body type</Label>
          <ButtonGroup>
            <Button
              color="ui"
              active={options.body === SpriteGeneratorBodyOptions.FEMALE}
              onClick={() => setBodyType(SpriteGeneratorBodyOptions.FEMALE)}
            >
              Mare
            </Button>
            <Button
              color="ui"
              active={options.body === SpriteGeneratorBodyOptions.MALE}
              onClick={() => setBodyType(SpriteGeneratorBodyOptions.MALE)}
            >
              Stallion
            </Button>
          </ButtonGroup>
        </FormGroup>
        <FormGroup>
          <Label className="d-block">Eye shape</Label>
          <ButtonGroup>
            <Button
              color="ui"
              active={options.eye === SpriteGeneratorEyeOptions.EYES_MALE_12 || options.eye === SpriteGeneratorEyeOptions.EYES_FEMALE_1}
              onClick={() => setEye(1)}
            >
              #1
            </Button>
            <Button
              color="ui"
              disabled={options.body === SpriteGeneratorBodyOptions.MALE}
              active={options.eye === SpriteGeneratorEyeOptions.EYES_FEMALE_2}
              onClick={() => setEye(2)}
            >
              #2
            </Button>
            <Button
              color="ui"
              active={options.eye === SpriteGeneratorEyeOptions.EYES_MALE_3 || options.eye === SpriteGeneratorEyeOptions.EYES_FEMALE_3}
              onClick={() => setEye(3)}
            >
              #3
            </Button>
          </ButtonGroup>
        </FormGroup>
        <FormGroup>
          <Label className="d-block">Eye gradient</Label>
          <ButtonGroup>
            <Button color="ui" active={options.gradientStops === 2} onClick={() => setGradientStops(2)}>
              2 colors
            </Button>
            <Button color="ui" active={options.gradientStops === 3} onClick={() => setGradientStops(3)}>
              3 colors
            </Button>
          </ButtonGroup>
        </FormGroup>
      </Col>
      <Col lg={12} xl={12} className="col-xxl-5">
        <SpriteGeneratorColorsForm
          colorMap={colorMap}
          setColorMap={setColorMap}
          magicAura={options.horn}
          middleIrisGradient={options.gradientStops === 3}
        />
      </Col>
    </>
  );
};
