# Includes

This directory contains the folders of each company and their respective MJML partials. The MJML partials contain specific styles, logos, and content that are used across all of the respective company's email templates.

Current companies:
| Company Name  | Folder Name |
| ------------- | ----------- |
| Advisar       | advisar     |
| USA Wood Door | usawd       |
| Masonite      | masonite    |

Both `common` and `specific` templates utilize these partials.

### Adding a new company

To add a new company, create a new directory in this folder and add the folder name to the `companies` array in the `gulpfile.js`. Be sure to include all of the same partials that are used in the other company folders:

```
header.mjml
logo-section.mjml
footer.mjml
```