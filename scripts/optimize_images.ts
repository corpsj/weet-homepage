import sharp from "sharp";
import fs from "fs/promises";
import path from "path";
import { glob } from "glob";

const PUBLIC_DIR = path.join(process.cwd(), "public");

async function optimizeImages() {
  console.log("🔍 Scanning for images in public/...");
  
  // 모든 이미지 파일 찾기 (png, jpg, jpeg)
  const files = await glob("**/*.{png,jpg,jpeg}", { cwd: PUBLIC_DIR });
  console.log(`Found ${files.length} images.`);

  let savedBytes = 0;

  for (const file of files) {
    const inputPath = path.join(PUBLIC_DIR, file);
    const outputPath = inputPath.replace(/\.(png|jpg|jpeg)$/i, ".webp");

    try {
      const inputStats = await fs.stat(inputPath);
      
      // 이미 WebP가 존재하면 건너뜀 (중복 변환 방지)
      try {
        await fs.access(outputPath);
        console.log(`⏩ Skpping ${file} (WebP exists)`);
        continue;
      } catch {}

      console.log(`Processing ${file}...`);
      
      await sharp(inputPath)
        .webp({ quality: 80 }) // 품질 80% (충분히 좋음)
        .toFile(outputPath);

      const outputStats = await fs.stat(outputPath);
      const diff = inputStats.size - outputStats.size;
      savedBytes += diff;
      
      console.log(`✅ Converted: ${file} -> .webp (-${(diff / 1024).toFixed(2)} KB)`);

      // 원본 백업
      const backupDir = path.join(process.cwd(), "public_backup", path.dirname(file));
      await fs.mkdir(backupDir, { recursive: true });
      await fs.rename(inputPath, path.join(backupDir, path.basename(file)));

    } catch (error) {
      console.error(`❌ Failed to convert ${file}:`, error);
    }
  }

  console.log(`\n🎉 Optimization Complete!`);
  console.log(`Total Space Saved: ${(savedBytes / 1024 / 1024).toFixed(2)} MB`);
}

optimizeImages();
