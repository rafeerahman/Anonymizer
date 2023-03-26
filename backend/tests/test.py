import pytest
from backend.anonymizer.common.util import textReplace

# def test_textReplace():
#     inputTxt = 'Hello my name is Bob Bobinson, and I work for Gogle'
#     terms = {'Bob':'Name1', 'Bobinson': 'Name2', 'Gogle': 'Organization1'}
#     assert textReplace(inputTxt, terms) == 'Hello my name is Name1 Name2, and I work for Organization1'


def test_textReplace():
    inputTxt = 'Hello my name is Bob Sam, and I work for Gogle'
    terms = {'Bob':'Name1', 'Sam': 'Name2', 'Gogle': 'Organization1'}
    assert textReplace(inputTxt, terms) == 'Hello my name is Name1 Name2, and I work for Organization1'
