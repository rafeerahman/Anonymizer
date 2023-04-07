# this is where all the common infrastructure will go
import re
import requests


def regex_match(match_str: str, regex_library: dict):
    # match string to its equivalent regex statement
    for key in regex_library.keys():
        pattern = re.compile(regex_library[key])

        if pattern.match(match_str):
            return regex_library[key]


def regexReplace(inputText: str, swapTerms: dict):
    inputReplaceTerms = {
        "phone_number": "1111111111",
        "credit_card": "4556415187865084",
        "postal_code": "A2C 3E6",
    }

    # dictionary of supported regex replacement
    regex_library = {
        "phone_number": r"\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})",
        "credit_card": r"(([0-9][ \-,]?){15})[0-9]",
        "postal_code": r"[ABCEGHJKLMNPRSTVXY]\d[ABCEGHJ-NPRSTV-Z][ ]?\d[ABCEGHJ-NPRSTV-Z]\d",
    }

    # compile library and join into pattern
    replaceTerms = {
        regex_library[key]: value
        for key, value in inputReplaceTerms.items()
        if key in regex_library
    }
    replacePattern = re.compile("|".join(replaceTerms.keys()))

    # error checking
    if not replaceTerms:
        return inputText, {}, False

    # perform replacement
    outputText = replacePattern.sub(
        lambda m: replaceTerms[regex_match(m.group(0), regex_library)], inputText
    )

    swapDict = {
        inputReplaceTerms[key]: swapTerms[key]
        for key, value in inputReplaceTerms.items()
        if key in swapTerms
    }

    return outputText, swapDict, True


def textReplace(inputText: str, replaceTerms: dict) -> str:
    if not replaceTerms:
        return inputText

    # clean the keys so they are all lowercase
    replaceTerms = {key.lower(): value for key, value in replaceTerms.items()}

    # ensure that regex is not picked up from any replacement terms
    refined = (
        ("\\b" + re.escape(key) + "\\b", value) for key, value in replaceTerms.items()
    )
    replaceTerms = dict(refined)

    # create regex replacement pattern
    replacePattern = re.compile("|".join(replaceTerms.keys()), re.IGNORECASE)

    # apply the pattern, swapping from replacement dictionary
    outputText = replacePattern.sub(
        lambda m: replaceTerms["\\b" + re.escape(m.group(0)).lower() + "\\b"], inputText
    )

    return outputText


def huggingface_model(inputTxt: str):
    """
    this would be the code if we were to use the model locally
    tokenizer = AutoTokenizer.from_pretrained(
        "Davlan/bert-base-multilingual-cased-ner-hrl"
    )
    model = AutoModelForTokenClassification.from_pretrained(
        "Davlan/bert-base-multilingual-cased-ner-hrl"
    )
    nlp = pipeline("ner", model=model, tokenizer=tokenizer)
    """

    import requests
    import os

    API_URL = "https://api-inference.huggingface.co/models/Davlan/bert-base-multilingual-cased-ner-hrl"
    headers = {"Authorization": f"Bearer {os.environ['HF_BEARER_TOKEN']}"}
    payload = {"inputs": inputTxt}
    response = requests.post(API_URL, headers=headers, json=payload)

    ner_results = response.json()
    # make a for loop to add all tokens of orginization and persons together
    replace = []
    count_r = -1
    for r in ner_results:
        if r["word"][0] == "#" and count_r > -1:
            word = r["word"][2:]
            replace[count_r] += word
        else:
            count_r += 1
            replace.append(r["word"])
    # building the dictionary
    d = {}
    i = 0
    while i < len(ner_results):
        key = ner_results[i]["word"]
        j = i + 1
        while j < len(ner_results) and ner_results[j]["word"][0] == "#":
            key += ner_results[j]["word"][2:]
            j += 1
        e = ner_results[i]["entity_group"]
        if e == "PER":
            d[key] = "PER"
        if e == "ORG":
            d[key] = "ORG"
        if e == "LOC":
            d[key] = "LOC"
        i = j
    return d


def dict_converter(huggingfacedict: dict, autoreplaceTerms: dict):
    d = {}
    keys = huggingfacedict.keys()
    if "names" in autoreplaceTerms:
        for k in keys:
            if huggingfacedict[k] == "PER":
                d[k] = autoreplaceTerms["names"]
    if "org" in autoreplaceTerms:
        for k in keys:
            if huggingfacedict[k] == "ORG":
                d[k] = autoreplaceTerms["org"]
    if "location" in autoreplaceTerms:
        for k in keys:
            if huggingfacedict[k] == "LOC":
                d[k] = autoreplaceTerms["location"]

    return d


# huggingface_model( "Nader Jokhadar had given Syria the lead with a well-struck header in the seventh minute.")
# the example above will return {'Nader': 'PER', 'Jokhadar': 'PER', 'Syria': 'LOC'}
