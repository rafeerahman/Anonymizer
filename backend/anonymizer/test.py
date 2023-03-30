import unittest
import json
from app import app
import io
import pandas as pd


class TestTXTReplace(unittest.TestCase):
    def setUp(self):
        self.app = app.test_client()

    def test_anonymize_text_success(self):
        inputText = "John Doe works at XYZ company."
        replaceTerms = {"John Doe": "Person A", "XYZ company": "Company A"}

        data = json.dumps({"inputText": inputText, "replaceTerms": replaceTerms})

        response = self.app.post(
            "/api/anonymize/text", content_type="application/json", data=data
        )
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json, {"message": "Person A works at Company A."})

    def test_anonymize_text_missing_parameters(self):
        data = json.dumps({"inputText": ""})
        response = self.app.post(
            "/api/anonymize/text", content_type="application/json", data=data
        )
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.json, {"message": "Invalid input"})

        data = json.dumps({"replaceTerms": {}})
        response = self.app.post(
            "/api/anonymize/text", content_type="application/json", data=data
        )
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.json, {"message": "Invalid input"})

    def test_anonymize_text_no_parameters(self):
        data = json.dumps({})
        response = self.app.post('/api/anonymize/text', content_type='application/json', data=data)
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.json, {'message': 'Invalid input'})


class TestCSVFileReplace(unittest.TestCase):
    def setUp(self):
        self.app = app.test_client()

    def test_anonymize_csv_success(self):
        csv_content = "John Doe,XYZ company\nJane Doe,ABC company"
        replaceTerms = {
            "John Doe": "Person A", 
            "Jane Doe": "Person B", 
            "XYZ company": "Company A", 
            "ABC company": "Company B"
        }

        data = {
            "inputFile": (io.BytesIO(csv_content.encode("utf-8")), "test.csv"), 
            "replaceTerms": json.dumps(replaceTerms)
        }
        response = self.app.post(
            "/api/anonymize/file/csv", content_type="multipart/form-data", data=data
        )
        
        self.assertEqual(response.status_code, 200)
        self.assertEqual(
            response.data.decode("utf-8"), "Person A,Company A\nPerson B,Company B\n"
        )

    def test_anonymize_csv_invalid_format(self):
        csv_content = ""

        data = {"inputFile": (io.StringIO(csv_content), "test.csv")}
        response = self.app.post(
            "/api/anonymize/file/csv", content_type="multipart/form-data", data=data
        )

        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.json, {"message": "Invalid csv formatting"})


class TestTXTFileReplace(unittest.TestCase):
    def setUp(self):
        self.app = app.test_client()

    def test_anonymize_txt_success(self):
        txt_content = "John Doe works at XYZ company."
        replaceTerms = {"John Doe": "Person A", "XYZ company": "Company A"}

        data = {
            "inputTextFile": (io.BytesIO(txt_content.encode("utf-8")), "test.txt"), 
            "replaceTerms": json.dumps(replaceTerms)
        }
        response = self.app.post(
            "/api/anonymize/file/txt", content_type="multipart/form-data", data=data
        )

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data.decode("utf-8"), "Person A works at Company A.")

    def test_anonymize_txt_missing_parameters(self):
        txt_content = "John Doe works at XYZ company."

        data = {"inputTextFile": (io.BytesIO(txt_content.encode("utf-8")), "test.txt")}
        response = self.app.post(
            "/api/anonymize/file/txt", content_type="multipart/form-data", data=data
        )

        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.json, {"message": "Missing replaceTerms"})


if __name__ == "__main__":
    unittest.main()
