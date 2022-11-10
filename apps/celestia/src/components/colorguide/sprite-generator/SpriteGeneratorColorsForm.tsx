import { Dispatch, FC, SetStateAction, useCallback, useMemo } from 'react';
import { Col, Form, FormGroup, Label, Row } from 'reactstrap';
import { SpriteGeneratorBaseColor, SpriteGeneratorColorMap } from 'src/types/sprite-generator';
import { hexToRgb, stringifyRgbKey, stringifyRgbNumber } from 'src/utils';
import { ColorInputGroup } from 'src/components/colorguide/ColorInputGroup';

const INPUT_NAMES: { [k in SpriteGeneratorBaseColor]: `color_${k}` } = {
  [SpriteGeneratorBaseColor.COAT_OUTLINE]: `color_${SpriteGeneratorBaseColor.COAT_OUTLINE}` as const,
  [SpriteGeneratorBaseColor.COAT_SHADOW_OUTLINE]: `color_${SpriteGeneratorBaseColor.COAT_SHADOW_OUTLINE}` as const,
  [SpriteGeneratorBaseColor.COAT_FILL]: `color_${SpriteGeneratorBaseColor.COAT_FILL}` as const,
  [SpriteGeneratorBaseColor.COAT_SHADOW_FILL]: `color_${SpriteGeneratorBaseColor.COAT_SHADOW_FILL}` as const,
  [SpriteGeneratorBaseColor.IRIS_GRADIENT_TOP]: `color_${SpriteGeneratorBaseColor.IRIS_GRADIENT_TOP}` as const,
  [SpriteGeneratorBaseColor.IRIS_GRADIENT_MIDDLE]: `color_${SpriteGeneratorBaseColor.IRIS_GRADIENT_MIDDLE}` as const,
  [SpriteGeneratorBaseColor.IRIS_GRADIENT_BOTTOM]: `color_${SpriteGeneratorBaseColor.IRIS_GRADIENT_BOTTOM}` as const,
  [SpriteGeneratorBaseColor.IRIS_HIGHLIGHT_TOP]: `color_${SpriteGeneratorBaseColor.IRIS_HIGHLIGHT_TOP}` as const,
  [SpriteGeneratorBaseColor.IRIS_HIGHLIGHT_BOTTOM]: `color_${SpriteGeneratorBaseColor.IRIS_HIGHLIGHT_BOTTOM}` as const,
  [SpriteGeneratorBaseColor.MAGIC_AURA]: `color_${SpriteGeneratorBaseColor.MAGIC_AURA}` as const,
};

const INPUT_LABELS: Record<SpriteGeneratorBaseColor, string> = {
  [SpriteGeneratorBaseColor.COAT_OUTLINE]: 'Coat Outline',
  [SpriteGeneratorBaseColor.COAT_SHADOW_OUTLINE]: 'Coat Shadow Outline',
  [SpriteGeneratorBaseColor.COAT_FILL]: 'Coat Fill',
  [SpriteGeneratorBaseColor.COAT_SHADOW_FILL]: 'Coat Shadow Fill',
  [SpriteGeneratorBaseColor.IRIS_GRADIENT_TOP]: 'Iris Gradient Top',
  [SpriteGeneratorBaseColor.IRIS_GRADIENT_MIDDLE]: 'Iris Gradient Middle',
  [SpriteGeneratorBaseColor.IRIS_GRADIENT_BOTTOM]: 'Iris Gradient Bottom',
  [SpriteGeneratorBaseColor.IRIS_HIGHLIGHT_TOP]: 'Iris Highlight Top',
  [SpriteGeneratorBaseColor.IRIS_HIGHLIGHT_BOTTOM]: 'Iris Highlight Bottom',
  [SpriteGeneratorBaseColor.MAGIC_AURA]: 'Magic Aura',
};

export interface SpriteGeneratorColorsFormProps {
  middleIrisGradient: boolean;
  magicAura: boolean;
  colorMap: SpriteGeneratorColorMap;
  setColorMap: Dispatch<SetStateAction<SpriteGeneratorColorMap>>;
}

export const SpriteGeneratorColorsForm: FC<SpriteGeneratorColorsFormProps> = ({ colorMap, middleIrisGradient, magicAura, setColorMap }) => {
  const handleChange = useCallback(
    (value: string, key: keyof SpriteGeneratorColorMap) => {
      const newColor = hexToRgb(value);
      if (newColor === null) return;
      setColorMap({ ...colorMap, [key]: newColor });
    },
    [colorMap, setColorMap]
  );

  const inputValues = useMemo(
    () =>
      Object.keys(INPUT_NAMES).reduce((acc, c) => {
        const key = c as unknown as keyof SpriteGeneratorColorMap;
        return {
          ...acc,
          [key]: (key in colorMap && stringifyRgbKey(colorMap, key)) || stringifyRgbNumber(parseInt(c, 10)),
        };
      }, {} as Record<SpriteGeneratorBaseColor, string>),
    [colorMap]
  );
  const baseColors = useMemo<SpriteGeneratorBaseColor[]>(
    () => [
      SpriteGeneratorBaseColor.COAT_OUTLINE,
      SpriteGeneratorBaseColor.COAT_SHADOW_OUTLINE,
      SpriteGeneratorBaseColor.COAT_FILL,
      SpriteGeneratorBaseColor.COAT_SHADOW_FILL,
      SpriteGeneratorBaseColor.IRIS_GRADIENT_TOP,
      ...(middleIrisGradient ? [SpriteGeneratorBaseColor.IRIS_GRADIENT_MIDDLE] : []),
      SpriteGeneratorBaseColor.IRIS_GRADIENT_BOTTOM,
      SpriteGeneratorBaseColor.IRIS_HIGHLIGHT_TOP,
      SpriteGeneratorBaseColor.IRIS_HIGHLIGHT_BOTTOM,
      ...(magicAura ? [SpriteGeneratorBaseColor.MAGIC_AURA] : []),
    ],
    [magicAura, middleIrisGradient]
  );
  return (
    <Form>
      <h3>Colors</h3>
      <Row>
        {baseColors.map((baseColor) => (
          <Col key={baseColor} xs={12} md={6}>
            <FormGroup row>
              <Label for={INPUT_NAMES[baseColor]} lg={5} xl={6} className="col-xxl-7">
                {INPUT_LABELS[baseColor]}
              </Label>
              <Col lg={7} xl={6} className="col-xxl-5">
                <ColorInputGroup
                  baseColor={baseColor}
                  name={INPUT_NAMES[baseColor]}
                  value={inputValues[baseColor]}
                  onChange={handleChange}
                />
              </Col>
            </FormGroup>
          </Col>
        ))}
      </Row>
    </Form>
  );
};
