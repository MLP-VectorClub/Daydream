import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Tooltip,
} from 'reactstrap';
import React, { useCallback, useState } from 'react';
import toPairs from 'lodash/toPairs';
import { useTranslation } from '../../i18n';
import { LANGUAGES } from '../../config';
import { AvailableLanguage } from '../../types';
import InlineIcon from './InlineIcon';

const LanguageDropdown: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [tooltipOpen, setTooltipOpen] = useState(false);

  const currentLanguage = i18n.language as AvailableLanguage;
  const toggleDropdownOpen = () => {
    const value = !dropdownOpen;
    if (value) setTooltipOpen(false);
    setDropdownOpen(value);
  };
  const toggleTooltipOpen = () => {
    setTooltipOpen(!tooltipOpen);
  };
  const changeLanguage = (langCode: string) => () => i18n.changeLanguage(langCode);
  const getCurrentProps = useCallback((langCode: string) => (
    { active: currentLanguage === langCode }
  ), [currentLanguage]);

  return (
    <Dropdown isOpen={dropdownOpen} toggle={toggleDropdownOpen} tag="span" id="language-selector">
      <DropdownToggle tag="a" className="font-weight-bold">
        <InlineIcon icon="globe" />
        <span className="ml-2">{t(LANGUAGES[currentLanguage].nativeName)}</span>
      </DropdownToggle>
      {!dropdownOpen && (
        <Tooltip isOpen={tooltipOpen} toggle={toggleTooltipOpen} target="language-selector">
          {t('footer.changeLanguage')}
        </Tooltip>
      )}
      <DropdownMenu>
        <DropdownItem header>
          {t('footer.changeLanguage')}
        </DropdownItem>
        {toPairs(LANGUAGES).map(([key, value]) => (
          <DropdownItem key={key} onClick={changeLanguage(key)} {...getCurrentProps(key)}>
            <img className="language-flag" src={`/static/flags/${key}.svg`} alt="" />
            <span>{value.nativeName}</span>
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};

export default LanguageDropdown;
