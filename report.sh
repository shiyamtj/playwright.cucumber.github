
#!/bin/bash
# find . -type d -print

# Create timestamp for unique folder name
TIMESTAMP=$(date +"%Y-%m-%d_%H-%M-%S")

# Create reports history directory if it doesn't exist
mkdir -p ./report-history/report_${TIMESTAMP}

cp -r ./report/. ./report-history/report_${TIMESTAMP}/.
echo "Latest report moved to report-history/report_${TIMESTAMP}"

# # Copying existing reports to history folder
# for dir in ./report-history/report_*/; do
#     if [ -d "$dir" ]; then
#         dirname=$(basename "$dir")
#         mv ./$dirname ./report-history/$dirname
#         echo "Report $dirname moved to report-history/$dirname"
#     fi
# done

# Create index.html with all report links
echo "<!DOCTYPE html>
<html>
<head>
    <title>Test Report History</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 40px; }
        h1 { color: #333; }
        .reports { margin-top: 20px; }
        a { color: #0366d6; text-decoration: none; display: block; margin: 10px 0; }
        a:hover { text-decoration: underline; }
    </style>
</head>
<body>
    <h1>Test Report History</h1>
    <div class='reports'>" > ./report-history/index.html

# Add links for each report folder
for dir in ./report-history/report_*/; do
    if [ -d "$dir" ]; then
        dirname=$(basename "$dir")
        echo "<a href='./$dirname/cucumber-report.html'>$dirname</a>" >> ./report-history/index.html
    fi
done

# Close HTML tags
echo "    </div>
</body>
</html>" >> ./report-history/index.html