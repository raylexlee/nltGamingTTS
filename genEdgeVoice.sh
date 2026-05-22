edge-tts -l | grep -E '^en-(US|GB|AU|CA|IE)' | awk '{print $1,$2}' | sed 's#^..-..-\([A-Z][a-z]*\)[^ ]* \(.*\)#\1 \2#' | sort -u > edgeVoice.txt
