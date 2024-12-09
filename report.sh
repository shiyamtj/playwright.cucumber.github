#!/bin/bash
# find . -type d -print

# Create timestamp for unique folder name
TIMESTAMP=$(date +"%Y-%m-%d_%H-%M-%S")

# Create reports history directory if it doesn't exist
mkdir -p ./report-history/report_${TIMESTAMP}

cp -r ./report/. ./report-history/report_${TIMESTAMP}/.
echo "Latest report moved to report-history/report_${TIMESTAMP}"

# Create JSON array opening
echo "[" > data.json

# Read directories and add to JSON
first=true
for dir in ./report-history/report_*/; do
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