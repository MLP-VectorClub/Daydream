# MLP VectorClub API type definitions

These type definitions are generated based on the MLP Vector Club's public OpenAPI specifications.

They can be utilized in any TypeScript-based applications to refer to the latest types provided by the application.

## Usage

Make sure TypeScript is configured in your project, then simply install the type definitions package with your favourite package manager:

```shell
# Via NPM
$ npm install @mlp-vectorclub/api-types
# Via YARN
$ yarn add @mlp-vectorclub/api-types
```

In your TypeScript code, simply import the necessary types from the package:

```ts
import { Appearance } from '@mlp-vectorclub/api-types';

const value: Appearance = {
  /* … */
};
```

## Building

1. Make a copy of `.env.example` named `.env`
2. Add the full path to the API schema definition (either a URL or a file path) as the `API_JSON_PATH` (wrap it in `"` if it contains spaces)
3. Run `yarn build`

Check the build output for the location of the generated files. The process also creates an optimized copy of the schema JSON alongside the type definition file.
