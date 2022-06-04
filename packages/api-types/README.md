# MLP VectorClub API type definitions

These type definitions are generated based on the MLP Vector Club's public OpenAPI specifications.

They can be utilized in any TypeScript-based applications to refer to the latest types provided by the application.

## Building

1. Make a copy of `.env.example` named `.env`
2. Add the full path to the API schema definition (either a URL or a file path) as the `API_JSON_PATH` (wrap it in `"` if it contains spaces)
3. Run `yarn build`

Check the build output for the location of the generated files. The process also creates an optimized copy of the schema JSON alongside the type definition file.
