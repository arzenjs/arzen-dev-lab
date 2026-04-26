import fs from "fs/promises"
import fsn from "fs"
import path from "path"
const clutterDir = "./Clutter"

let files = await fs.readdir(clutterDir)

files.forEach(file => {
    let extension = file.split(".")[file.split(".").length - 1]
    if (file.includes(".")) {
        if (fsn.existsSync(path.join(clutterDir, extension))) {
            fsn.renameSync(path.join(clutterDir, file), path.join(clutterDir, extension, file))
            
        } else {
            fsn.mkdirSync(path.join(clutterDir, extension))
            fsn.renameSync(path.join(clutterDir, file), path.join(clutterDir, extension, file))
        }
        console.log("File organized");
    } else{
        console.log("No clutter found.");
    }
});