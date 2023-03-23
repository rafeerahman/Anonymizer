# this is where all the common infrastructure will go
import re


def textReplace(inputText: str, replaceTerms: dict) -> str:
    # clean the keys so they are all lowercase
    replaceTerms = {key.lower(): value for key, value in replaceTerms.items()}

    # ensure that regex is not picked up from any replacement terms
    refined = ((re.escape(key), value) for key, value in replaceTerms.items())
    replaceTerms = dict(refined)

    # create regex replacement pattern
    replacePattern = re.compile("|".join(replaceTerms.keys()), re.IGNORECASE)

    # apply the pattern, swapping from replacement dictionary
    outputText = replacePattern.sub(
        lambda m: replaceTerms[re.escape(m.group(0)).lower()], inputText
    )

    return outputText
