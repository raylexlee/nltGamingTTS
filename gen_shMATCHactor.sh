#!/bin/bash

# 1. Check if an argument was provided
if [ -z "$1" ]; then
    echo "Error: Please provide a game name."
    echo "Usage: $0 <game_name> (e.g., $0 order, $0 nadia, $0 epidemic)"
    exit 1
fi

# 2. Dynamically set file names based on the 1st argument
GAME_NAME="$1"
SHORT_FILE="${GAME_NAME}ShortName.txt"
GENDER_FILE="${GAME_NAME}Gender.txt"
OUTPUT_FILE="${GAME_NAME}_shMATCHactor.txt"

# 3. Verify that the input files actually exist before running
if [ ! -f "$SHORT_FILE" ] || [ ! -f "$GENDER_FILE" ]; then
    echo "Error: Missing input files for '$GAME_NAME'."
    echo "Make sure $SHORT_FILE and $GENDER_FILE exist in this directory."
    exit 1
fi

# Clear output file if it exists
> "$OUTPUT_FILE"

# 4. Process the matching logic
while read -r sh || [[ -n "$sh" ]]; do
    [[ -z "$sh" ]] && continue
    
    char1="${sh:0:1}"
    char2="${sh:1:1}"
    
    # Filter actors starting with the 1st character
    first_batch=$(grep -i "^${char1}[a-zA-Z]" "$GENDER_FILE")
    
    if [ -n "$first_batch" ]; then
        # Search for 2nd character in the second position
        actor_line=$(echo "$first_batch" | grep -i "^${char1}${char2}" | head -n 1)
        
        # If no exact match, pick a random actor from the first batch
        if [ -z "$actor_line" ]; then
            actor_line=$(echo "$first_batch" | shuf -n 1)
        fi
        
        actor=$(echo "$actor_line" | awk '{print $1}')
        echo "$sh $actor" >> "$OUTPUT_FILE"
    else
        # Global fallback if no actor starts with Char1
        actor_line=$(grep -E "^[a-zA-Z]{2,}" "$GENDER_FILE" | shuf -n 1)
        actor=$(echo "$actor_line" | awk '{print $1}')
        echo "$sh $actor" >> "$OUTPUT_FILE"
    fi
done < "$SHORT_FILE"

echo "Matching complete for '$GAME_NAME'. Output saved to $OUTPUT_FILE"

