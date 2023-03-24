# this is where all the common infrastructure will go
import re
from transformers import AutoTokenizer, AutoModelForTokenClassification
from transformers import pipeline



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


#huggingface_model( "Nader Jokhadar had given Syria the lead with a well-struck header in the seventh minute.")
# the example above will return {'Nader': 'PER', 'Jokhadar': 'PER', 'Syria': 'LOC'}
