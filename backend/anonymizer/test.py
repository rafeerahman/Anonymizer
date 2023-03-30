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

    # Add a new test for autoReplaceTerms option
    def test_anonymize_text_with_auto_replace_terms_success(self):
        inputText = "John Doe works at University of Based."
        autoReplaceTerms = {"names": "Person A", "org": "Company A"}

        data = json.dumps(
            {
                "inputText": inputText,
                "autoReplace": True,
                "autoReplaceTerms": autoReplaceTerms,
            }
        )

        response = self.app.post(
            "/api/anonymize/text", content_type="application/json", data=data
        )
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json, {"message": "Person A works at Company A."})

    def test_anonymize_text_with_auto_replace_terms_missing_terms_failure(self):
        inputText = "John Doe works at XYZ company."
        autoReplaceTerms = {}

        data = json.dumps(
            {
                "inputText": inputText,
                "autoReplace": True,
                "autoReplaceTerms": autoReplaceTerms,
            }
        )

        response = self.app.post(
            "/api/anonymize/text", content_type="application/json", data=data
        )
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.json, {"message": "Missing auto replacement terms"})

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
        response = self.app.post(
            "/api/anonymize/text", content_type="application/json", data=data
        )
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.json, {"message": "Invalid input"})


class TestCSVFileReplace(unittest.TestCase):
    def setUp(self):
        self.app = app.test_client()

    def test_anonymize_csv_success(self):
        csv_content = "John Doe,XYZ company\nJane Doe,ABC company"
        replaceTerms = {
            "John Doe": "Person A",
            "Jane Doe": "Person B",
            "XYZ company": "Company A",
            "ABC company": "Company B",
        }

        data = {
            "inputFile": (io.BytesIO(csv_content.encode("utf-8")), "test.csv"),
            "replaceTerms": json.dumps(replaceTerms),
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

    def test_anonymize_csv_auto_replace_success(self):
        csv_content = (
            "John Doe,University of Based\nJane Doe,Toronto Transit Commission"
        )
        autoReplaceTerms = {
            "names": "Person",
            "org": "Company",
        }

        data = {
            "inputFile": (io.BytesIO(csv_content.encode("utf-8")), "test.csv"),
            "autoReplace": "true",
            "autoReplaceTerms": json.dumps(autoReplaceTerms),
        }
        response = self.app.post(
            "/api/anonymize/file/csv", content_type="multipart/form-data", data=data
        )

        self.assertEqual(response.status_code, 200)
        # Assuming the ML model successfully detects the entities and replaces them
        self.assertEqual(
            response.data.decode("utf-8"), "Person,Company\nPerson,Company\n"
        )

    def test_anonymize_csv_auto_replace_missing_terms(self):
        csv_content = "John Doe,XYZ company\nJane Doe,ABC company"

        data = {
            "inputFile": (io.BytesIO(csv_content.encode("utf-8")), "test.csv"),
            "autoReplace": "true",
        }
        response = self.app.post(
            "/api/anonymize/file/csv", content_type="multipart/form-data", data=data
        )

        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.json, {"message": "Missing auto replacement terms"})

    def test_anonymize_csv_auto_replace_phone_credit_postal_success(self):
        csv_content = (
            "John Doe,University of Useless,555-123-4567,1234 5678 9012 3456,M1A1A1"
        )
        autoReplaceTerms = {
            "names": "Person",
            "org": "Company",
            "phone_number": "Phone",
            "credit_card": "CreditCard",
            "postal_code": "PostalCode",
        }

        data = {
            "inputFile": (io.BytesIO(csv_content.encode("utf-8")), "test.csv"),
            "autoReplace": "true",
            "autoReplaceTerms": json.dumps(autoReplaceTerms),
        }
        response = self.app.post(
            "/api/anonymize/file/csv", content_type="multipart/form-data", data=data
        )

        self.assertEqual(response.status_code, 200)
        # Assuming the ML model successfully detects the entities and replaces them
        self.assertEqual(
            response.data.decode("utf-8"),
            "Person,Company,Phone,CreditCard,PostalCode\n",
        )


class TestTXTFileReplace(unittest.TestCase):
    def setUp(self):
        self.app = app.test_client()

    def test_anonymize_txt_success(self):
        txt_content = "John Doe works at XYZ company."
        replaceTerms = {"John Doe": "Person A", "XYZ company": "Company A"}

        data = {
            "inputTextFile": (io.BytesIO(txt_content.encode("utf-8")), "test.txt"),
            "replaceTerms": json.dumps(replaceTerms),
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

    def test_anonymize_txt_auto_replace_success(self):
        txt_content = (
            "John Doe,University of Useless,555-123-4567,1234 5678 9012 3456,M1A1A1"
        )
        autoReplaceTerms = {
            "names": "Person",
            "org": "Company",
            "phone_number": "Phone",
            "credit_card": "CreditCard",
            "postal_code": "PostalCode",
        }

        data = {
            "inputTextFile": (io.BytesIO(txt_content.encode("utf-8")), "test.txt"),
            "autoReplace": "true",
            "autoReplaceTerms": json.dumps(autoReplaceTerms),
        }
        response = self.app.post(
            "/api/anonymize/file/txt", content_type="multipart/form-data", data=data
        )

        print(response.data.decode("utf-8") + '*********************************')
        self.assertEqual(response.status_code, 200)
        # Assuming the ML model successfully detects the entities and replaces them
        self.assertEqual(
            response.data.decode("utf-8"),
            "Person,Company,Phone,CreditCard,PostalCode\n",
    )

    def test_anonymize_txt_auto_replace_missing_terms(self):
        txt_content = "John Doe,XYZ company\nJane Doe,ABC company"

        data = {
            "inputTextFile": (io.BytesIO(txt_content.encode("utf-8")), "test.txt"),
            "autoReplace": "true",
        }
        response = self.app.post(
            "/api/anonymize/file/txt", content_type="multipart/form-data", data=data
        )

        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.json, {"message": "Missing auto replacement terms"})


if __name__ == "__main__":
    unittest.main()
