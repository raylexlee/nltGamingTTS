# makeNLTpair.sh nadia win
# FROM : winVoice.txt, nadiaGender.txt
# OUTPUT : nadiaPAIRwin.txt
# characterName voiceName pitch rate
#
# makeNLTpair.sh nadia edge
# FROM : edgeVoice.txt nadiaGender.txt
#!/bin/bash

# Check for correct arguments
if [ "$#" -ne 2 ]; then
    echo "Usage: $0 [nadia|order] [win|edge]"
    echo "Example: $0 nadia win"
    exit 1
fi

GAME=$1
ENGINE=$2

# Determine input files based on arguments
GENDER_FILE="${GAME}Gender.txt"
VOICE_FILE="${ENGINE}Voice.txt"
OUTPUT_FILE="${GAME}PAIR${ENGINE}.txt"

# Validate that input files exist
if [ ! -f "$GENDER_FILE" ]; then
    echo "Error: Reference file '$GENDER_FILE' not found."
    exit 1
fi

if [ ! -f "$VOICE_FILE" ]; then
    echo "Error: Reference file '$VOICE_FILE' not found."
    exit 1
fi

# Create empty arrays to pool voices by gender
male_voices=()
female_voices=()

# Parse the voice file and group them by gender
while read -r vname vgender _; do
    # Skip comments or empty lines
    [[ -z "$vname" || "$vname" =~ ^// ]] && continue
    
    if [ "$vgender" == "Male" ]; then
        male_voices+=("$vname")
    elif [ "$vgender" == "Female" ]; then
        female_voices+=("$vname")
    fi
done < "$VOICE_FILE"

# Track counts to calculate unique pitch/rate offsets dynamically
male_count=${#male_voices[@]}
female_count=${#female_voices[@]}

if [ "$male_count" -eq 0 ] || [ "$female_count" -eq 0 ]; then
    echo "Error: Voice arrays are empty. Check your ${VOICE_FILE} formatting."
    exit 1
fi

# Write header to output file
echo "// CharacterName voiceName pitch rate" > "$OUTPUT_FILE"

# Counters to keep track of structural cycles per gender
m_idx=0
f_idx=0

# Parse the game character gender reference file
while read -r cname cgender _; do
    # Skip comments or empty lines
    [[ -z "$cname" || "$cname" =~ ^// ]] && continue

    final_voice=""
    final_pitch="1.00"
    final_rate="1.00"

    # Priority 1: Check if the character name matches an available voice name exactly
    if [ "$cgender" == "Male" ]; then
        for v in "${male_voices[@]}"; do
            if [ "${v,,}" == "${cname,,}" ]; then
                final_voice="$v"
                break
            fi
        done
    else
        for v in "${female_voices[@]}"; do
            if [ "${v,,}" == "${cname,,}" ]; then
                final_voice="$v"
                break
            fi
        done
    fi

    # Priority 2: If no exact match, cycle through the gender voice pool with structural modifiers
    if [ -z "$final_voice" ]; then
        if [ "$cgender" == "Male" ]; then
            # Pick a voice using modulo arithmetic
            pool_index=$((m_idx % male_count))
            final_voice="${male_voices[$pool_index]}"
            
            # Calculate a unique modifier index for shifting acoustic traits
            cycle_factor=$((m_idx / male_count))
            
            # Vary pitch downward slightly for distinct male expressions
            # e.g., Base 1.00, then 0.95, 0.90, etc.
            final_pitch=$(printf "%.2f" "$(echo "1.00 - ($cycle_factor * 0.05)" | bc)")
            final_rate=$(printf "%.2f" "$(echo "1.00 + (($pool_index % 3) * 0.05) - 0.05" | bc)")
            
            ((m_idx++))
        else
            pool_index=$((f_idx % female_count))
            final_voice="${female_voices[$pool_index]}"
            
            cycle_factor=$((f_idx / female_count))
            
            # Vary pitch upward slightly for distinct female expressions
            # e.g., Base 1.00, then 1.05, 1.10, etc.
            final_pitch=$(printf "%.2f" "$(echo "1.00 + ($cycle_factor * 0.05)" | bc)")
            final_rate=$(printf "%.2f" "$(echo "1.00 + (($pool_index % 3) * 0.05) - 0.05" | bc)")
            
            ((f_idx++))
        fi
    fi

    # Custom Override for Monster/Special Characters
    if [ "${cname,,}" == "demon" ] || [ "${cname,,}" == "daemalius" ]; then
        final_pitch="0.60"
        final_rate="0.85"
    fi

    # Append the calculated structural properties into the text matrix mapping file
    printf "%-15s %-15s %-7s %-7s\n" "$cname" "$final_voice" "$final_pitch" "$final_rate" >> "$OUTPUT_FILE"

done < "$GENDER_FILE"

echo "✅ Generation complete: Generated $OUTPUT_FILE successfully!"
 
