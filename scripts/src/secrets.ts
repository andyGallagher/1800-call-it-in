import fs from "fs/promises";
import * as path from "path";

// Path to the .env file
const envFilePath = path.join(__dirname, "..", ".env");

// Path to the packages directory
const packagesDir = path.join(__dirname, "..", "..", "packages");

// Function to copy .env file to each package directory
void (async () => {
    await fs.access(envFilePath);
    await fs.access(packagesDir);

    const allDirs = await fs.readdir(packagesDir);
    const packageDirs = (
        await Promise.all(
            allDirs.map(async (dir) => {
                const fullPath = path.join(packagesDir, dir);
                return (await fs.stat(fullPath)).isDirectory() ? dir : null;
            }),
        )
    ).filter(Boolean);

    packageDirs.forEach(async (dir) => {
        if (dir === null) {
            throw new Error("Unexpected null value in packageDirs");
        }

        const destinationPath = path.join(packagesDir, dir, ".env");
        await fs.copyFile(envFilePath, destinationPath);
        console.info(`Copied .env to ${destinationPath}`);
    });
})();
