import { useMemo, VFC } from 'react';
import {
  Alert,
  Col,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Label,
  Row,
} from 'reactstrap';
import { SpriteGeneratorBaseColor, SpriteGeneratorColorMap } from 'src/types/sprite-generator';
import { stringifyRgbKey, stringifyRgbNumber, validHexColorPattern } from 'src/utils';
import InlineIcon from 'src/components/shared/InlineIcon';

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
  colorMap?: SpriteGeneratorColorMap;
  setColorMap: (newColorMap: SpriteGeneratorColorMap) => void;
}

export const SpriteGeneratorColorsForm: VFC<SpriteGeneratorColorsFormProps> = ({
  colorMap,
  middleIrisGradient,
  magicAura,
}) => {
  const inputValues = useMemo(() => (Object.keys(INPUT_NAMES).reduce((acc, c) => {
    const key = c as unknown as keyof SpriteGeneratorColorMap;
    return {
      ...acc,
      [key]: (
        (colorMap && key in colorMap && stringifyRgbKey(colorMap, key))
        || stringifyRgbNumber(parseInt(c, 10))
      ),
    };
  }, {} as Record<SpriteGeneratorBaseColor, string>)), [colorMap]);
  const inputNames = useMemo<SpriteGeneratorBaseColor[]>(() => [
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
  ], [magicAura, middleIrisGradient]);
  return (
    <>
      <h3>Colors</h3>
      <Row>
        {inputNames.map(name => (
          <Col key={name} xs={12} lg={6}>
            <FormGroup row>
              <Label for={INPUT_NAMES[name]} lg={7}>{INPUT_LABELS[name]}</Label>
              <Col lg={5}>
                <InputGroup>
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText style={{ backgroundColor: inputValues[name] }}>&nbsp;&nbsp;</InputGroupText>
                  </InputGroupAddon>
                  <Input
                    name={INPUT_NAMES[name]}
                    value={inputValues[name]}
                    pattern={validHexColorPattern}
                    readOnly
                  />
                </InputGroup>
              </Col>
            </FormGroup>
          </Col>
        ))}
      </Row>
      <Alert color="info" fade={false}>
        <InlineIcon icon="hard-hat" first />
        These fields will be editable once the form is fully developed
      </Alert>
    </>
  );
};
