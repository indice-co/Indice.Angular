const pathLib = require('path');
const  scssBundler = require('scss-bundle');
const fs = require('fs-extra');


/** Bundles all SCSS files into a single file */
async function bundleScss(): Promise<void> {
  console.log('running bundleScss');
  const bundler = new scssBundler.Bundler();
  const sourcePath = './projects/ng-components/src/_styles.css';
  const { found, bundledContent, imports } = await bundler.bundle(sourcePath, ['./src/**/*.css', './src/**/*.scss']);

  if (imports) {
    const cwd = process.cwd();

    const filesNotFound = imports
      .filter((x: any) => !x.found)
      .map((x: any) => pathLib.relative(cwd, x.filePath));

    if (filesNotFound.length) {
      console.error(`SCSS imports failed \n\n${filesNotFound.join('\n - ')}\n`);
      throw new Error('One or more SCSS imports failed');
    }
  }

  if (found) {
    await fs.writeFile('./dist/ng-components/_styles.css', bundledContent);
  }
}

bundleScss();
