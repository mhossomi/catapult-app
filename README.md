# Catapult: Application Template

This is a template for Catapult applications:

- Default `catapult(name, port, configurer)` builder powered by Express
- BXML utilities
- Access logging out of the box

### Settings

Use `PUT /settings` to change log settings. The following properties exists:

| Setting       | Type    | Description                             |
| ------------- | ------- | --------------------------------------- |
| `showParams`  | Boolean | If `true`, query parameters are listed. |
| `showHeaders` | Boolean | If `true`, headers are listed.          |
| `pretty`      | Boolean | If `true`, output is pretty             |
