const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const sizes = [640, 750, 828, 1080, 1200, 1920];
const formats = ['webp', 'avif'];

async function optimizeImage(inputPath, outputDir) {
  const filename = path.basename(inputPath, path.extname(inputPath));

  // Ensure output folder exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  for (const size of sizes) {
    for (const format of formats) {
      const outputPath = path.join(outputDir, `${filename}-${size}.${format}`);

      await sharp(inputPath)
        .resize(size, null, {
          fit: 'cover',
          withoutEnlargement: true
        })
        .toFormat(format, {
          quality: format === 'avif' ? 50 : 80
        })
        .toFile(outputPath);

      console.log(`Created: ${outputPath}`);
    }
  }
}

const publicDir = path.join(process.cwd(), 'public'); // FIXED PATH

// List of images you want to optimize
const heroImages = ['her1.png', 'hero2.png', 'hero3.png'];

heroImages.forEach(img => {
  const input = path.join(publicDir, img);

  if (!fs.existsSync(input)) {
    console.error(`❌ File not found: ${input}`);
    return;
  }

  optimizeImage(
    input,
    path.join(publicDir, 'optimized')
  );
});
