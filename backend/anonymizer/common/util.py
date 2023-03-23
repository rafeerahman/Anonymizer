# this is where all the common infrastructure will go
import re
from transformers import AutoTokenizer, AutoModelForTokenClassification
from transformers import pipeline



def textReplace(inputText: str, replaceTerms: dict) -> str:
    # ensure that regex is not picked up from any replacement terms
    refined = ((re.escape(key), value) for key, value in replaceTerms.items())
    replaceTerms = dict(refined)

    # create regex replacement pattern
    replacePattern = re.compile("|".join(replaceTerms.keys()))

    # apply the pattern, swapping from replacement dictionary
    outputText = replacePattern.sub(
        lambda m: replaceTerms[re.escape(m.group(0))], inputText
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
    print(replace)


huggingface_model( "Nader Jokhadar had given Syria the lead with a well-struck header in the seventh minute.")
