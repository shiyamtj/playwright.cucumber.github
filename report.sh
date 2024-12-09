#!/bin/bash
# find . -type d -print

# Create timestamp for unique folder name
TIMESTAMP=$(date +"%Y-%m-%d_%H-%M-%S")
REPORT_HISTORY_DIR="report-history"

# Create reports history directory if it doesn't exist
mkdir -p "./$REPORT_HISTORY_DIR/report_${TIMESTAMP}"

# Copy files to report history directory
for file in index.html app.js; do
    cp -r ./$file "./$REPORT_HISTORY_DIR/."
    echo "Copied $file to $REPORT_HISTORY_DIR"
done

cp -r ./report/. "./$REPORT_HISTORY_DIR/report_${TIMESTAMP}/."
echo "Latest report moved to $REPORT_HISTORY_DIR/report_${TIMESTAMP}"

# Create JSON array opening
echo "[" > data.json

# Read directories and add to JSON
first=true
for dir in ./$REPORT_HISTORY_DIR/report_*/; do
    if [ -d "$dir" ]; then
        dirname=$(basename "$dir")
        if [ "$first" = true ]; then
            echo "  {" >> data.json
            echo "    \"folderName\": \"$dirname\"," >> data.json
            echo "    \"linkText\": \"$dirname\"" >> data.json
            echo "  }" >> data.json
            first=false
        else
            echo "  ,{" >> data.json
            echo "    \"folderName\": \"$dirname\"," >> data.json
            echo "    \"linkText\": \"$dirname\"" >> data.json
            echo "  }" >> data.json
        fi
    fi
done

# Close JSON array
echo "]" >> data.json

cp -r ./data.json ./$REPORT_HISTORY_DIR/.
echo "Copied data.json to $REPORT_HISTORY_DIR"