const fs = require("fs");
const filePath = "example.txt"; // File to be used for CRUD operations

// CREATE: Write data to a file (Creates if it doesn't exist)
fs.writeFile(filePath, "Hello, this is a sample file.", (err) => {
    if (err) {
        console.error("Error creating file:", err);
    } else {
        console.log("✅ File created successfully!");
        
        // READ: Read the file content
        fs.readFile(filePath, "utf8", (err, data) => {
            if (err) {
                console.error("Error reading file:", err);
            } else {
                console.log("📖 File content:", data);

                // UPDATE: Append new data to the file
                fs.appendFile(filePath, "\nThis is new content added!", (err) => {
                    if (err) {
                        console.error("Error updating file:", err);
                    } else {
                        console.log("✏️ File updated successfully!");

                        // DELETE: Remove the file
                        fs.unlink(filePath, (err) => {
                            if (err) {
                                console.error("Error deleting file:", err);
                            } else {
                                console.log("🗑️ File deleted successfully!");
                            }
                        });
                    }
                });
            }
        });
    }
});
