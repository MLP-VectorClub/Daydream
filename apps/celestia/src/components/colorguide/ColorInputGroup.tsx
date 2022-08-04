import { Input, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';
import { hexToRgb, validHexColorPattern, yiq } from 'src/utils';
import { ChangeEventHandler, FC, PropsWithChildren, useCallback, useMemo, useState } from 'react';
import InlineIcon from 'src/components/shared/InlineIcon';

interface PropTypes extends PropsWithChildren {
  baseColor: number;
  value?: string;
  name?: string;
  onChange: (value: string, baseColor: number) => void;
}

export const ColorInputGroup: FC<PropTypes> = ({ baseColor, value, name, children, onChange }) => {
  const [, setInputFocused] = useState(false);
  const inputId = name && `${name}_input`;

  const handleChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      onChange(e.target.value, baseColor);
    },
    [baseColor, onChange]
  );

  const valueAsRgb = useMemo(() => value && hexToRgb(value), [value]);
  const darkColor = useMemo(() => {
    if (!valueAsRgb) return false;
    return yiq(valueAsRgb) < 128;
  }, [valueAsRgb]);

  return (
    <>
      <InputGroup>
        <InputGroupAddon tag="label" addonType="prepend" htmlFor={inputId} className="mb-0">
          <InputGroupText style={{ backgroundColor: value, userSelect: 'none' }}>
            <InlineIcon icon="eye-dropper" fixedWidth className={darkColor ? 'text-light' : 'text-dark'} />
          </InputGroupText>
        </InputGroupAddon>
        <Input
          id={inputId}
          name={name}
          value={value}
          pattern={validHexColorPattern}
          className="text-center"
          onFocus={() => setInputFocused(true)}
          onBlur={() => setInputFocused(false)}
          type="color"
          onChange={handleChange}
        />
        {children}
      </InputGroup>
    </>
  );
};
