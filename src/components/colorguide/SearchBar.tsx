import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import { useState, VFC } from 'react';
import { GuideName, Nullable, Status } from 'src/types';
import { useGuideAutocomplete } from 'src/hooks';
import SpriteImage from 'src/components/colorguide/SpriteImage';

const unfiltered = () => true;

interface PropTypes {
  initialQuery: string;
  guide: Nullable<GuideName>;
}

// TODO Integrate + migrate to react-bootstrap

const SearchBar: VFC<PropTypes> = ({ initialQuery, guide }) => {
  const [query, setQuery] = useState(initialQuery);
  const { results, status } = useGuideAutocomplete({ guide, q: query });

  return (
    <AsyncTypeahead
      filterBy={unfiltered}
      id="guide-search-autocomplete"
      isLoading={status === Status.LOAD}
      labelKey="label"
      minLength={3}
      onSearch={setQuery}
      options={results || []}
      renderMenuItemChildren={option => (
        <>
          <SpriteImage sprite={option.sprite} height={25} />
          <span>{option.label}</span>
        </>
      )}
    />
  );
};

export default SearchBar;
