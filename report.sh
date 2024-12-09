
#!/bin/bash

# Create timestamp for unique folder name
TIMESTAMP=$(date +"%Y-%m-%d_%H-%M-%S")

# Create reports history directory if it doesn't exist
mkdir -p ./report-history/report_${TIMESTAMP}

cp -r ./report/. ./report-history/report_${TIMESTAMP}/.
echo "Report moved to report-history/report_${TIMESTAMP}"