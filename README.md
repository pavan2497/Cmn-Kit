# HTML Starter Kit

Html starter kit will help developer to build html/css with bootstrap@4 freamwork with help with node and gulp.

`nunjucks` will help to generate html by template based. So it will help a lot for repeated code like html navigation or any data which require to repeated task.

## CSS Framework

- [bootstrap v4.x](https://getbootstrap.com/)

## Build tools

- [gulp](http://gulpjs.com/)
- [sass](http://sass-lang.com/)
- [nunjucks](https://mozilla.github.io/nunjucks/)
- [browser-sync](http://www.browsersync.io/)
- etc, see [package.json]

## Requirements

- [Node](https://nodejs.org/en/)

## Use

To get up and running locally, perform the following steps:

1. Clone git repo to your folder.
2. Run `npm install`
3. Start local server and development Run `npm start`

> Make sure if any error occur then it will stop server then you have manually restart local server by same command `npm start`

## Clean Local Generated Files

Run `npm run clean`

That will clean locally generated files.

## Build Html For Deliver

Run `npm run build`

This command will build `dist` folder and that will have all distributed files and folder.

## Browser Sync Test on Mobile Devices

With browser sync plugin you can test preview multiple browser devices even mobile/iPad devices with live reload(When you change something page will refresh).

For find your external ip you can install global package to your local pc by following command.

- Run `npm install -g dev-ip`
- Then run `dev-ip` and you can see list of available ip addresses and one of that ip you can access to your local environment from your external devices like mobile or iPad.

## W3C Markup Validation

Now you can directly validate all html pages by simple below command locally.

- RUN `npm run w3cjs`

----

## Folder Structure

```bash
├── app
│   ├── data
│   │   ├── *.json
│   ├── pages
│   ├── ├── *.html
│   ├── templates
│   ├── ├── macros
│   │   ├── partials
│   └── layout.html
├── assets
│   ├── fotns
│   ├── img
│   ├── js
│   ├── sass
│   │   ├── pages
│   │   ├── sections
│   │   ├── _custom.scss
│   │   ├── _layout.scss
│   │   ├── _overrides.scss
│   │   ├── main.scss
├── .gitignore
├── .editorconfig
├── gulpfile.js
├── package-lock.json
├── package.json
├── README.md
└── .gitignore
```
