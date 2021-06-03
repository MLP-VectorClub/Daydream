import { NextPage } from 'next';
import Content from 'src/components/shared/Content';
import StandardHeading from 'src/components/shared/StandardHeading';
import { SpriteGenerator } from 'src/components/colorguide/sprite-generator/SpriteGenerator';
import { TitleFactoryVoid } from 'src/types/title';
import { useMemo } from 'react';
import { PATHS } from 'src/paths';
import { colorGuide } from 'src/strings';
import { NextSeo } from 'next-seo';
import { assembleSeoUrl } from 'src/utils';
import { useTitleSetter } from 'src/hooks';
import { useDispatch } from 'react-redux';
import { wrapper } from 'src/store';
import { titleSetter } from 'src/utils/core';

const titleFactory: TitleFactoryVoid = () => {
  const title = 'Sprite Template Generator';
  return ({
    title,
    breadcrumbs: [
      { linkProps: { href: PATHS.GUIDE_INDEX }, label: colorGuide.index.breadcrumb },
      { label: title, active: true },
    ],
  });
};

const SpriteGeneratorPage: NextPage = () => {
  const dispatch = useDispatch();
  const titleData = useMemo(titleFactory, []);
  useTitleSetter(dispatch, titleData);
  return (
    <Content>
      <StandardHeading heading={titleData.title} lead="Create your own pony sprite images based on our template" />
      <SpriteGenerator />
      <NextSeo
        description="Create your own pixelated pony reference images using the MLP Vector Club's template generator"
        openGraph={{
          images: [{
            url: assembleSeoUrl('/img/default-sprite.png'),
            width: 300,
            height: 300,
            alt: 'Pixelated template artwork of a My Little Pony character with no mane, tail, horn, or wings. In the top right corner '
              + 'a larger view of the iris and a body-colored rectangle is present, the latter for showcasing the cutie mark.',
          }],
        }}
      />
    </Content>
  );
};

export default SpriteGeneratorPage;

export const getStaticProps = wrapper.getStaticProps(({ store }) => {
  titleSetter(store, titleFactory());
  return {
    props: {},
  };
});
