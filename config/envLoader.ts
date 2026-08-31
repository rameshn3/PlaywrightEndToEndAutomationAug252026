import * as dotenv from 'dotenv';
import * as path from 'path';
import * as fs from 'fs';

export function loadEnv(envName: string) {
  const candidates = [
    path.resolve(process.cwd(), 'env', `.env.${envName}`),
    path.resolve(process.cwd(), `.env.${envName}`),
  ];

  const found = candidates.find(file => fs.existsSync(file));

  if (!found) {
    throw new Error(`❌ No .env file found for environment: ${envName}`);
  }

  dotenv.config({ path: found });

  console.log(`✅ Loaded ENV: ${envName} → ${found}`);
}