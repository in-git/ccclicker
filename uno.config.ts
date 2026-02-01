import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetWind3,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss';

export default defineConfig({
  shortcuts: [
    {
      'center-center': 'flex justify-center items-center',
      'between-center': 'flex justify-between items-center',
      'bg-center': 'bg-cover bg-center bg-no-repeat',
    },
  ],
  theme: {
    colors: {
      // ...
    },
  },
  presets: [
    presetWind3(),
    presetAttributify(),
    presetIcons(),
    presetTypography(),
    // presetWebFonts({
    //   fonts: {
    //     // ...
    //   },
    // }),
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()],
});
