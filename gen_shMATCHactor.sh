#!/bin/bash

# Check if the correct argument is provided
if [ "$1" != "order" ]; then
    echo "Usage: $0 order"
    exit 1
fi

# Define input and output files
SHORT_FILE="orderShortName.txt"
GENDER_FILE="orderGender.txt"
OUTPUT_FILE="order_shMATCHactor.txt"

# Clear output file if it exists
> "$OUTPUT_FILE"

# Process each short name
while read -r sh || [[ -n "$sh" ]]; do
    # Skip empty lines
    [[ -z "$sh" ]] && continue
    
    # Find matching actor names that start with the short name (case-insensitive)
    # Exclude single letter actors like 'H' and 'M' by matching at least 2 letters
    actor_line=$(grep -i "^${sh}[a-z]" "$GENDER_FILE" | head -n 1)
    
    if [ -n "$actor_line" ]; then
        # Extract just the actor name (first column)
        actor=$(echo "$actor_line" | awk '{print $1}')
        # Write to output file
        echo "$sh $actor" >> "$OUTPUT_FILE"
    else
        echo "No match found for: $sh"
    fi
done < "$SHORT_FILE"

echo "Matching complete. Output saved to $OUTPUT_FILE"

