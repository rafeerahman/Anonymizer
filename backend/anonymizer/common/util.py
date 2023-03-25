# this is where all the common infrastructure will go
import re
from transformers import AutoTokenizer, AutoModelForTokenClassification
from transformers import pipeline

def filter(match_str: str, regex_library: dict):
    
    for key in regex_library.keys():
        pattern = re.compile(regex_library[key])
        
        if pattern.match(match_str):
            return regex_library[key]
    

def regexReplace(inputText: str, replaceTerms: dict):
    
    regex_library = {
        "phone_number": r"\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})",
        "credit_card": r"^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$",
        "postal_code": r"[ABCEGHJKLMNPRSTVXY]\d[ABCEGHJ-NPRSTV-Z][ ]?\d[ABCEGHJ-NPRSTV-Z]\d"
    }
    
    replaceTerms = {regex_library[key]: value for key, value in replaceTerms.items() if key in regex_library}
    replacePattern = re.compile("|".join(replaceTerms.keys()))
    
    if not replaceTerms:
        return inputText
    
    outputText = replacePattern.sub(
        lambda m: replaceTerms[filter(m.group(0), regex_library)], inputText
    )
    
    return outputText

def textReplace(inputText: str, replaceTerms: dict) -> str:
    
    if not replaceTerms:
        return inputText
    
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

def huggingface_model(inputTxt: str):
    tokenizer = AutoTokenizer.from_pretrained("Davlan/bert-base-multilingual-cased-ner-hrl")
    model = AutoModelForTokenClassification.from_pretrained("Davlan/bert-base-multilingual-cased-ner-hrl")
    nlp = pipeline("ner", model=model, tokenizer=tokenizer)
    ner_results = nlp(inputTxt)
    print("this is the result:\n")
    print(ner_results)
    #make a for loop to add all tokens of orginization and persons together
    replace = []
    count_r = -1
    for r in ner_results:
        if r['word'][0] == '#' and count_r > -1:
            word = r['word'][2:]
            replace[count_r] += word
        else:
            count_r += 1
            replace.append(r['word'])
    # building the dictionary
    d = {}
    i = 0
    while i < len(ner_results):
        key = ner_results[i]['word']
        j = i + 1
        while j < len(ner_results) and ner_results[j]['word'][0] == '#':
            key += ner_results[j]['word'][2:]
            j += 1
        e = ner_results[i]['entity']
        if e == 'B-PER' or e == 'I-PER':
            d[key] = 'PER'
        if e == 'B-ORG' or e == 'I-ORG':
            d[key] = 'ORG'
        if e == 'B-LOC' or e == 'I-LOC':
            d[key] = 'LOC'
        i = j
    return d

def dict_converter(huggingfacedict: dict, autoreplaceTerms: dict):
    d = {}
    keys = huggingfacedict.keys()
    if 'names' in autoreplaceTerms:
        for k in keys:
            if huggingfacedict[k] == 'PER':
                d[k] = autoreplaceTerms['names']
    if 'org' in autoreplaceTerms:
        for k in keys:
            if huggingfacedict[k] == 'ORG':
                d[k] = autoreplaceTerms['org']
    if 'location' in autoreplaceTerms:
        for k in keys:
            if huggingfacedict[k] == 'LOC':
                d[k] = autoreplaceTerms['location']

    return d

#huggingface_model( "Nader Jokhadar had given Syria the lead with a well-struck header in the seventh minute.")
# the example above will return {'Nader': 'PER', 'Jokhadar': 'PER', 'Syria': 'LOC'}
